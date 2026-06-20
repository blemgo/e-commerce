import type { SxProps, Theme } from "@mui/material/styles";

export const adminLayoutStyles: Record<string, SxProps<Theme>> = {
  container: {
    display: "flex",
    height: "100%",
  },
  content: {
    flex: 1,
    minWidth: 0,
    overflowY: "auto",
    bgcolor: "grey.50",
    p: { xs: 2, md: 4 },
  },
};
