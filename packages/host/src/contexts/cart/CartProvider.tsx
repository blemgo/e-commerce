import { useEffect, useMemo, useState } from 'react';
import { useUserContext } from '@contexts/user';
import type { Cart } from '@types';
import { CartContext } from './CartContext';
import type { CartProviderProps } from './CartTypes';
import type { CartStrategy } from './strategies/CartStrategy';
import { useUserCartStrategy } from './strategies/userCartStrategy';

const CartProvider: React.FC<CartProviderProps> = ({ children }: CartProviderProps) => {
  const { user } = useUserContext();
  const userStrategy = useUserCartStrategy();
  const [cart, setCart] = useState<Cart | null>(null);
  const [strategy, setStrategy] = useState<CartStrategy | null>(null);

  useEffect(() => {
    if (!user) {
      setStrategy(null);
      setCart(null);
      return;
    }

    setStrategy(userStrategy);
  }, [user?.id]);

  useEffect(() => {
    if (!strategy) {
      return;
    }

    strategy.getCart().then(setCart).catch(() => {});
  }, [strategy]);

  const setItemQuantity = async (productId: string, quantity: number): Promise<void> => {
    if (!strategy) {
      return;
    }

    const prevCart = cart;

    if (cart) {
      setCart(
        quantity <= 0
          ? { ...cart, items: cart.items.filter(i => i.product.id !== productId) }
          : {
              ...cart,
              items: cart.items.map(i =>
                i.product.id === productId ? { ...i, quantity } : i,
              ),
            },
      );
    }

    try {
      const updated = await strategy.setItemQuantity(productId, quantity);
      setCart(updated);
    } catch {
      setCart(prevCart);
    }
  };

  const refreshCart = async (): Promise<void> => {
    if (!strategy) {
      return;
    }

    setCart(await strategy.getCart());
  };

  const value = useMemo(() => ({ cart, setItemQuantity, refreshCart }), [cart, strategy]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartProvider };
