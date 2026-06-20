import type { SxProps, Theme } from "@mui/material/styles";

export const orderTableStyles: Record<string, SxProps<Theme>> = {
  container: {
    borderRadius: 2,
    border: "1px solid",
    borderColor: "divider",
    bgcolor: "common.white",
  },
  headCell: {
    fontWeight: 700,
    color: "text.secondary",
    textTransform: "uppercase",
    fontSize: 12,
    letterSpacing: 0.5,
  },
  trackingId: {
    fontWeight: 700,
  },
  total: {
    fontWeight: 700,
  },
};
