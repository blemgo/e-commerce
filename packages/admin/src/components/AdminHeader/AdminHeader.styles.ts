import type { SxProps, Theme } from "@mui/material/styles";

export const adminHeaderStyles: Record<string, SxProps<Theme>> = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 2,
    mb: 3,
  },
  title: {
    fontWeight: 700,
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
};
