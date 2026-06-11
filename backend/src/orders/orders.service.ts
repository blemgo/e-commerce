import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CartService } from 'src/cart/cart.service';
import { AddressService } from 'src/address/address.service';
import { ProductsService } from 'src/products/products.service';
import { Product } from 'src/products/entities/product.entity';
import { PaginatedResult } from 'src/common/interfaces/paginated-result.interface';
import { userToAuthorizedUser } from 'src/auth/utils/userToAuthorizedUser';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrderStatus } from './entities/order-status.enum';
import { GetAllOrdersQueryDto } from './dto/get-all-orders-query.dto';
import { AdminOrder } from './dto/admin-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly cartService: CartService,
    private readonly addressService: AddressService,
    private readonly productsService: ProductsService,
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  private generateTrackingId(): string {
    return `#${Math.floor(100000 + Math.random() * 900000)}`;
  }

  async getUserOrders(userId: string): Promise<Order[]> {
    return this.ordersRepository.find({
      where: { user: { id: userId } },
      relations: { items: { product: true }, address: { country: true } },
      order: { createdAt: 'DESC' },
    });
  }

  async getAllOrders(
    query: GetAllOrdersQueryDto,
  ): Promise<PaginatedResult<AdminOrder>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;

    const [orders, totalCount] = await this.ordersRepository.findAndCount({
      where: query.status ? { status: query.status } : {},
      relations: {
        user: true,
        items: { product: true },
        address: { country: true },
      },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    const data: AdminOrder[] = orders.map((order) => ({
      ...order,
      user: userToAuthorizedUser(order.user),
    }));

    return { data, totalCount, page, totalPages: Math.ceil(totalCount / limit) };
  }

  async updateStatus(orderId: string, status: OrderStatus): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    order.status = status;

    return this.ordersRepository.save(order);
  }

  async getUserOrder(userId: string, orderId: string): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id: orderId, user: { id: userId } },
      relations: { items: { product: true }, address: { country: true } },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async checkout(userId: string, addressId: string): Promise<Order> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this.addressService.getUserAddress(
        userId,
        addressId,
        queryRunner.manager,
      );

      const cart = await this.cartService.getCartForCheckout(userId, queryRunner.manager);
      const snapshots: { product: Product; quantity: number }[] = [];

      for (const item of cart.items) {
        const product = await this.productsService.getProductWithSufficientStock(
          item.product.id,
          item.quantity,
          queryRunner.manager,
        );

        snapshots.push({ product, quantity: item.quantity });
      }

      const totalAmount = Number(
        snapshots
          .reduce((sum, { product, quantity }) => sum + product.price * quantity, 0)
          .toFixed(2),
      );

      const order = queryRunner.manager.create(Order, {
        user: { id: userId },
        address: { id: addressId },
        trackingId: this.generateTrackingId(),
        totalAmount,
      });
      await queryRunner.manager.save(order);

      for (const { product, quantity } of snapshots) {
        await queryRunner.manager.save(
          queryRunner.manager.create(OrderItem, {
            order: { id: order.id },
            product: { id: product.id },
            productName: product.name,
            unitPrice: Number(product.price.toFixed(2)),
            quantity,
          }),
        );

        await this.productsService.decrementStock(
          product.id,
          quantity,
          queryRunner.manager,
        );
      }

      await this.cartService.deleteCart(userId, queryRunner.manager);
      await queryRunner.commitTransaction();

      const savedOrder = await this.dataSource.manager.findOne(Order, {
        where: { id: order.id },
        relations: { items: { product: true }, address: { country: true } },
      });

      if (!savedOrder) {
        throw new NotFoundException('Order not found after checkout');
      }

      return savedOrder;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
