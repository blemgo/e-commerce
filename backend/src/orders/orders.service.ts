import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CartService } from 'src/cart/cart.service';
import { Address } from 'src/address/entities/address.entity';
import { Product } from 'src/products/entities/product.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class OrdersService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly cartService: CartService,
  ) {}

  async checkout(userId: string, addressId: string): Promise<Order> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const address = await queryRunner.manager.findOne(Address, {
        where: { id: addressId },
      });

      if (!address) {
        throw new NotFoundException('Address not found');
      }

      const cart = await this.cartService.getCartForCheckout(userId, queryRunner.manager);
      const snapshots: { product: Product; quantity: number }[] = [];

      for (const item of cart.items) {
        const product = await queryRunner.manager.findOne(Product, {
          where: { id: item.product.id },
          lock: { mode: 'pessimistic_write' },
        });

        if (!product) {
          throw new NotFoundException(`Product not found: ${item.product.id}`);
        }

        if (product.qtyInStock < item.quantity) {
          throw new BadRequestException(`Insufficient stock for "${product.name}"`);
        }

        snapshots.push({ product, quantity: item.quantity });
      }

      const totalAmount = Number(
        snapshots
          .reduce((sum, { product, quantity }) => sum + Number(product.price) * quantity, 0)
          .toFixed(2),
      );

      const order = queryRunner.manager.create(Order, {
        user: { id: userId },
        address: { id: addressId },
        totalAmount,
      });
      await queryRunner.manager.save(order);

      for (const { product, quantity } of snapshots) {
        await queryRunner.manager.save(
          queryRunner.manager.create(OrderItem, {
            order: { id: order.id },
            product: { id: product.id },
            productName: product.name,
            unitPrice: Number(Number(product.price).toFixed(2)),
            quantity,
          }),
        );

        await queryRunner.manager.decrement(Product, { id: product.id }, 'qtyInStock', quantity);
      }

      await this.cartService.deleteCart(userId, queryRunner.manager);
      await queryRunner.commitTransaction();

      const savedOrder = await this.dataSource.manager.findOne(Order, {
        where: { id: order.id },
        relations: { items: { product: true }, address: true },
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
