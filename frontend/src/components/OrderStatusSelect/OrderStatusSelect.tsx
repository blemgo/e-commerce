import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { OrderStatus } from "@types";
import { ORDER_STATUS_CONFIG } from "@/utils/orderStatus";
import { orderStatusSelectStyles, statusColorStyles } from "./OrderStatusSelect.styles";

interface OrderStatusSelectProps {
  status: OrderStatus;
  onChange: (status: OrderStatus) => void;
  disabled?: boolean;
}

const OrderStatusSelect = ({ status, onChange, disabled = false }: OrderStatusSelectProps) => {
  return (
    <Select
      value={status}
      onChange={event => onChange(event.target.value as OrderStatus)}
      disabled={disabled}
      size="small"
      sx={orderStatusSelectStyles.select}
      renderValue={value => (
        <Box component="span" sx={statusColorStyles[ORDER_STATUS_CONFIG[value].color]}>
          {ORDER_STATUS_CONFIG[value].label}
        </Box>
      )}
    >
      {Object.values(OrderStatus).map(value => (
        <MenuItem key={value} value={value} sx={statusColorStyles[ORDER_STATUS_CONFIG[value].color]}>
          {ORDER_STATUS_CONFIG[value].label}
        </MenuItem>
      ))}
    </Select>
  );
};

export { OrderStatusSelect };
