import type { ReactNode } from 'react';
import type { Cart } from '@shared/types';

export interface CartContextValue {
  cart: Cart | null;
  setItemQuantity: (productId: string, quantity: number) => Promise<void>;
  refreshCart: () => Promise<void>;
}

export interface CartProviderProps {
  children: ReactNode;
}
