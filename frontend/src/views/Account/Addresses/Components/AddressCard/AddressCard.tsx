import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { formatAddressLine1, formatAddressLine2 } from '@/utils/formatAddress';
import type { UserAddress } from '@types';
import { addressCardStyles } from './AddressCard.styles';

interface AddressCardProps {
  address: UserAddress;
  onEdit: () => void;
  onSetDefault: () => void;
  onRemove: () => void;
}

const AddressCard = ({ address, onEdit, onSetDefault, onRemove }: AddressCardProps) => {
  return (
    <Box sx={addressCardStyles.card}>
      <Box sx={addressCardStyles.header}>
        <LocationOnOutlinedIcon sx={addressCardStyles.icon} />
        {address.isDefault && (
          <Chip label="Default" size="small" sx={addressCardStyles.defaultChip} />
        )}
      </Box>

      <Box sx={addressCardStyles.lines}>
        <Typography sx={addressCardStyles.line}>
          {formatAddressLine1(address)}
        </Typography>
        <Typography sx={addressCardStyles.line}>
          {formatAddressLine2(address)}
        </Typography>
      </Box>

      <Box sx={addressCardStyles.actions}>
        <Button onClick={onEdit} sx={addressCardStyles.action} disableRipple>
          Edit
        </Button>

        {!address.isDefault && (
          <Button onClick={onSetDefault} sx={addressCardStyles.action} disableRipple>
            Set as default
          </Button>
        )}

        {!address.isDefault && (
          <Button onClick={onRemove} sx={addressCardStyles.removeAction} disableRipple>
            Remove
          </Button>
        )}
      </Box>
    </Box>
  );
};

export { AddressCard };
