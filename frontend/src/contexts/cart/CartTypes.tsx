import type { ReactNode } from 'react';
import type { Cart } from '@types';

export interface CartContextValue {
  cart: Cart | null;
  setItemQuantity: (productId: string, quantity: number) => Promise<void>;
}

export interface CartProviderProps {
  children: ReactNode;
}
