import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { StyledInput } from '@/components/StyledInput';
import type { UserAddress } from '@types';
import {
  formatAddressLine1,
  formatAddressLine2,
  formatAddressSummary,
} from '@/utils/formatAddress';
import { orderDetailsStyles } from './OrderDetails.styles';

interface OrderDetailsProps {
  addresses: UserAddress[];
  loading: boolean;
  selectedAddressId: string | null;
  onSelectAddress: (addressId: string) => void;
  onSetDefault: (addressId: string) => void;
  onAddAddress: () => void;
}

const emptyCard = { number: '', name: '', expiry: '', cvc: '' };

const OrderDetails: React.FC<OrderDetailsProps> = ({
  addresses,
  loading,
  selectedAddressId,
  onSelectAddress,
  onSetDefault,
  onAddAddress,
}: OrderDetailsProps) => {
  const [shipToOpen, setShipToOpen] = useState<boolean | null>(null);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [card, setCard] = useState(emptyCard);

  const selectedAddress = addresses.find(address => address.id === selectedAddressId) ?? null;
  const isShipToOpen = shipToOpen ?? !selectedAddress;

  const setCardField = (field: keyof typeof emptyCard) => (value: string) =>
    setCard(prev => ({ ...prev, [field]: value }));

  return (
    <Box sx={orderDetailsStyles.card}>
      <Box sx={orderDetailsStyles.rowHeader} onClick={() => setShipToOpen(!isShipToOpen)}>
        <Typography sx={orderDetailsStyles.rowLabel}>Ship to</Typography>
        <Typography sx={orderDetailsStyles.rowSummary}>
          {!isShipToOpen && selectedAddress ? formatAddressSummary(selectedAddress) : ''}
        </Typography>
        {isShipToOpen ? (
          <ExpandLessIcon sx={orderDetailsStyles.chevron} />
        ) : (
          <ExpandMoreIcon sx={orderDetailsStyles.chevron} />
        )}
      </Box>

      <Collapse in={isShipToOpen}>
        <Box sx={orderDetailsStyles.addressList}>
          {loading ? (
            <Box sx={orderDetailsStyles.loader}>
              <CircularProgress size={20} />
            </Box>
          ) : (
            <RadioGroup
              value={selectedAddressId ?? ''}
              onChange={event => onSelectAddress(event.target.value)}
            >
              {addresses.map(address => (
                <FormControlLabel
                  key={address.id}
                  value={address.id}
                  control={<Radio size="small" />}
                  sx={orderDetailsStyles.addressOption}
                  label={
                    <Box sx={orderDetailsStyles.addressLabel}>
                      <Typography sx={orderDetailsStyles.addressLine}>
                        {formatAddressLine1(address)}
                      </Typography>
                      <Typography sx={orderDetailsStyles.addressLine}>
                        {formatAddressLine2(address)}
                      </Typography>
                      {address.isDefault ? (
                        <Chip
                          label="Default"
                          size="small"
                          sx={orderDetailsStyles.defaultChip}
                        />
                      ) : (
                        <Button
                          onClick={event => {
                            event.preventDefault();
                            event.stopPropagation();
                            onSetDefault(address.id);
                          }}
                          sx={orderDetailsStyles.makeDefaultButton}
                          disableRipple
                        >
                          Make default
                        </Button>
                      )}
                    </Box>
                  }
                />
              ))}
            </RadioGroup>
          )}
          <Button
            startIcon={<AddIcon />}
            onClick={onAddAddress}
            sx={orderDetailsStyles.addAddressButton}
            disableRipple
          >
            Add a new address
          </Button>
        </Box>
      </Collapse>

      <Divider />

      <Box sx={orderDetailsStyles.rowStatic}>
        <Typography sx={orderDetailsStyles.rowLabel}>Shipping</Typography>
        <Box sx={orderDetailsStyles.shippingText}>
          <Typography sx={orderDetailsStyles.rowSummary}>Standard · FREE</Typography>
          <Typography sx={orderDetailsStyles.rowSecondary}>4 to 5 business days</Typography>
        </Box>
      </Box>

      <Divider />

      <Box sx={orderDetailsStyles.rowHeader} onClick={() => setPaymentOpen(prev => !prev)}>
        <Typography sx={orderDetailsStyles.rowLabel}>Payment</Typography>
        <Typography sx={orderDetailsStyles.rowSummary}>Card</Typography>
        {paymentOpen ? (
          <ExpandLessIcon sx={orderDetailsStyles.chevron} />
        ) : (
          <ExpandMoreIcon sx={orderDetailsStyles.chevron} />
        )}
      </Box>

      <Collapse in={paymentOpen}>
        <Box sx={orderDetailsStyles.cardFields}>
          <StyledInput
            type="text"
            placeholder="Card number"
            value={card.number}
            onChange={setCardField('number')}
          />
          <StyledInput
            type="text"
            placeholder="Name on card"
            value={card.name}
            onChange={setCardField('name')}
          />
          <Box sx={orderDetailsStyles.cardFieldRow}>
            <StyledInput
              type="text"
              placeholder="MM/YY"
              value={card.expiry}
              onChange={setCardField('expiry')}
            />
            <StyledInput
              type="text"
              placeholder="CVC"
              value={card.cvc}
              onChange={setCardField('cvc')}
            />
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};

export { OrderDetails };
