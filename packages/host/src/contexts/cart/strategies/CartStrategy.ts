import type { Cart } from '@shared/types';

export interface CartStrategy {
  getCart: () => Promise<Cart>;
  setItemQuantity: (productId: string, quantity: number) => Promise<Cart>;
}
