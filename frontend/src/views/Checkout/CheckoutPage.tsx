import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useCartContext } from '@contexts/cart';
import { AddressDialog } from '@components/AddressDialog';
import { OrderDetails } from './Components/OrderDetails';
import { OrderSummary } from './Components/OrderSummary';
import { useCheckoutAddresses } from './hooks/useCheckoutAddresses';
import { usePlaceOrder } from './hooks/usePlaceOrder';
import { checkoutPageStyles } from './CheckoutPage.styles';

const CheckoutPage: React.FC = () => {
  const { cart } = useCartContext();
  const {
    addresses,
    loading,
    selectedAddressId,
    setSelectedAddressId,
    handleCreateAddress,
    isCreating,
    handleSetDefault,
    dialogOpen,
    openDialog,
    closeDialog,
  } = useCheckoutAddresses();
  const { placeOrder, isLoading: isPlacingOrder } = usePlaceOrder();

  const items = cart?.items ?? [];
  const payDisabled = isPlacingOrder || !selectedAddressId || items.length === 0;

  const handlePayNow = async () => {
    if (!selectedAddressId) {
      return;
    }

    await placeOrder(selectedAddressId);
  };

  return (
    <Box sx={checkoutPageStyles.container}>
      <Box sx={checkoutPageStyles.left}>
        <Box sx={checkoutPageStyles.leftContent}>
          <OrderDetails
            addresses={addresses}
            loading={loading}
            selectedAddressId={selectedAddressId}
            onSelectAddress={setSelectedAddressId}
            onSetDefault={handleSetDefault}
            onAddAddress={openDialog}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handlePayNow}
            disabled={payDisabled}
            sx={checkoutPageStyles.payButton}
            disableElevation
          >
            Pay now
          </Button>
        </Box>
      </Box>

      <Box sx={checkoutPageStyles.right}>
        <Box sx={checkoutPageStyles.rightContent}>
          <OrderSummary items={items} />
        </Box>
      </Box>

      <AddressDialog
        open={dialogOpen}
        onClose={closeDialog}
        onSubmit={handleCreateAddress}
        isLoading={isCreating}
      />
    </Box>
  );
};

export { CheckoutPage };
