import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { ProductsService } from 'src/products/products.service';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    private readonly productsService: ProductsService,
  ) {}

  async getCart(userId: string): Promise<Cart> {
    return this.getOrCreateCart(userId, true);
  }

  async setItemQuantity(
    userId: string,
    productId: string,
    dto: UpdateCartItemDto,
  ): Promise<Cart> {
    const cart = await this.getOrCreateCart(userId);

    const existingItem = await this.cartItemRepository.findOne({
      where: { cart: { id: cart.id }, product: { id: productId } },
    });

    if (dto.quantity === 0) {
      if (existingItem) {
        await this.cartItemRepository.remove(existingItem);
      }

      return this.getCart(userId);
    }

    await this.productsService.getProductWithSufficientStock(
      productId,
      dto.quantity,
    );

    if (existingItem) {
      existingItem.quantity = dto.quantity;
      await this.cartItemRepository.save(existingItem);
    } else {
      await this.cartItemRepository.save(
        this.cartItemRepository.create({
          cart: { id: cart.id },
          product: { id: productId },
          quantity: dto.quantity,
        }),
      );
    }

    return this.getCart(userId);
  }

  private async getOrCreateCart(
    userId: string,
    loadItems = false,
  ): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { user: { id: userId } },
      ...(loadItems && { relations: { items: { product: true } } }),
    });

    if (cart) {
      return cart;
    }

    const newCart = await this.cartRepository.save(
      this.cartRepository.create({ user: { id: userId } }),
    );

    if (loadItems) {
      newCart.items = [];
    }

    return newCart;
  }

  async getCartForCheckout(userId: string, manager: EntityManager): Promise<Cart> {
    const cart = await manager
      .createQueryBuilder(Cart, 'cart')
      .innerJoin('cart.user', 'user')
      .where('user.id = :userId', { userId })
      .setLock('pessimistic_write')
      .getOne();

    if (!cart) {
      throw new BadRequestException('Cart is empty');
    }

    const cartWithItems = await manager.findOne(Cart, {
      where: { id: cart.id },
      relations: { items: { product: true } },
    });

    if (!cartWithItems?.items.length) {
      throw new BadRequestException('Cart is empty');
    }

    return cartWithItems;
  }

  async deleteCart(userId: string, manager: EntityManager): Promise<void> {
    const cart = await manager.findOne(Cart, { where: { user: { id: userId } } });

    if (cart) {
      await manager.remove(Cart, cart);
    }
  }

}
