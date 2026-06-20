import type { SxProps, Theme } from "@mui/material/styles";
import type { OrderStatusColor } from "@shared/utils/orderStatus";

export const orderStatusSelectStyles: Record<string, SxProps<Theme>> = {
  select: {
    minWidth: 140,
    borderRadius: 6,
    fontWeight: 600,
    fontSize: 14,
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "divider" },
  },
};

export const statusColorStyles: Record<OrderStatusColor, SxProps<Theme>> = {
  info: { color: "info.main", fontWeight: 600 },
  warning: { color: "warning.main", fontWeight: 600 },
  success: { color: "success.main", fontWeight: 600 },
  error: { color: "error.main", fontWeight: 600 },
};
