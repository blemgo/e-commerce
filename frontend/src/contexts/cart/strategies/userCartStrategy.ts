import { useMemo } from 'react';
import { useSetCartItemQuantity } from '@api/hooks/cart/useSetCartItemQuantity';
import { useGetCart } from '@api/hooks/cart/useGetCart';
import type { CartStrategy } from './CartStrategy';

const useUserCartStrategy = (): CartStrategy => {
  const { getCart } = useGetCart();
  const { setItemQuantity } = useSetCartItemQuantity();

  return useMemo(
    () => ({ getCart, setItemQuantity }),
    [getCart, setItemQuantity],
  );
};

export { useUserCartStrategy };
