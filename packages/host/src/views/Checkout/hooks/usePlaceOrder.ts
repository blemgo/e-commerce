import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCheckout } from '@shared/api/hooks/orders/useCheckout';
import { useCartContext } from '@contexts/cart';

export interface UsePlaceOrderReturn {
  placeOrder: (addressId: string) => Promise<void>;
  isLoading: boolean;
}

const usePlaceOrder = (): UsePlaceOrderReturn => {
  const { checkout, isLoading } = useCheckout();
  const { refreshCart } = useCartContext();
  const navigate = useNavigate();

  const placeOrder = async (addressId: string): Promise<void> => {
    try {
      await checkout(addressId);
    } catch {
      return;
    }

    await refreshCart();
    toast.success('Order placed successfully.');
    navigate('/account/orders');
  };

  return { placeOrder, isLoading };
};

export { usePlaceOrder };
