import { useCartContext } from '../useCartContext';

const useAppendCartItem = () => {
  const { cart, setItemQuantity } = useCartContext();

  const appendCartItem = (productId: string): Promise<void> => {
    const current = cart?.items.find(i => i.product.id === productId)?.quantity ?? 0;

    return setItemQuantity(productId, current + 1);
  };

  return { appendCartItem };
};

export { useAppendCartItem };
