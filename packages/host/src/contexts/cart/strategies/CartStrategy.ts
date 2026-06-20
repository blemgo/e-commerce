import type { Cart } from '@types';

export interface CartStrategy {
  getCart: () => Promise<Cart>;
  setItemQuantity: (productId: string, quantity: number) => Promise<Cart>;
}
