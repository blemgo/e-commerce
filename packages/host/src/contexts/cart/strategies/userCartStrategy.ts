import { useMemo } from 'react';
import { useSetCartItemQuantity } from '@shared/api/hooks/cart/useSetCartItemQuantity';
import { useGetCart } from '@shared/api/hooks/cart/useGetCart';
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
