import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { Product } from 'src/products/entities/product.entity';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async getCart(userId: string): Promise<Cart> {
    return this.getOrCreateCart(userId, true);
  }

  async addItem(
    userId: string,
    productId: string,
    dto: UpdateCartItemDto,
  ): Promise<Cart> {
    const cart = await this.getOrCreateCart(userId);
    const quantity = dto.quantity ?? 1;

    const existingItem = await this.cartItemRepository.findOne({
      where: { cart: { id: cart.id }, product: { id: productId } },
    });

    const newQuantity = (existingItem?.quantity ?? 0) + quantity;

    await this.assertSufficientStock(productId, newQuantity);

    if (existingItem) {
      existingItem.quantity = newQuantity;
      await this.cartItemRepository.save(existingItem);
    } else {
      await this.cartItemRepository.save(
        this.cartItemRepository.create({
          cart: { id: cart.id },
          product: { id: productId },
          quantity: newQuantity,
        }),
      );
    }

    return this.getCart(userId);
  }

  async removeItem(
    userId: string,
    productId: string,
    dto: UpdateCartItemDto,
  ): Promise<Cart> {
    const cart = await this.getOrCreateCart(userId);

    const item = await this.cartItemRepository.findOne({
      where: { cart: { id: cart.id }, product: { id: productId } },
    });

    if (!item) {
      throw new NotFoundException('Cart item not found');
    }

    if (dto.quantity === undefined || item.quantity - dto.quantity <= 0) {
      await this.cartItemRepository.remove(item);
    } else {
      item.quantity -= dto.quantity;
      await this.cartItemRepository.save(item);
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

  private async assertSufficientStock(
    productId: string,
    requestedQuantity: number,
  ): Promise<void> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      select: { id: true, qtyInStock: true },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (requestedQuantity > product.qtyInStock) {
      throw new BadRequestException('Insufficient stock');
    }
  }
}
