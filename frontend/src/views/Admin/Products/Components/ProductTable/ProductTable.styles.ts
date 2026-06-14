import type { SxProps, Theme } from "@mui/material/styles";

export const productTableStyles: Record<string, SxProps<Theme>> = {
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
  productCell: {
    display: "flex",
    alignItems: "center",
    gap: 1.5,
  },
  thumbnail: {
    width: 44,
    height: 44,
    borderRadius: 1.5,
  },
  name: {
    fontWeight: 600,
  },
  price: {
    fontWeight: 700,
  },
  stockOut: {
    color: "error.main",
    fontWeight: 600,
  },
  stockLow: {
    color: "warning.main",
    fontWeight: 600,
  },
};
