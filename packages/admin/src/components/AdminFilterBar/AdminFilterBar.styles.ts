import type { SxProps, Theme } from "@mui/material/styles";

export const adminFilterBarStyles: Record<string, SxProps<Theme>> = {
  container: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    alignItems: { sm: "center" },
    justifyContent: "space-between",
    gap: 2,
    mb: 2,
  },
  search: {
    width: { xs: "100%", sm: 280 },
  },
  searchIcon: {
    cursor: "pointer",
  },
};
