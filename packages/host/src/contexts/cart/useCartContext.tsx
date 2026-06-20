import { useContext } from 'react';
import { CartContext } from './CartContext';
import type { CartContextValue } from './CartTypes';

const useCartContext = (): CartContextValue => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }

  return context;
};

export { useCartContext };
