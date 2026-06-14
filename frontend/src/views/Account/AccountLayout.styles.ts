import type { SxProps, Theme } from "@mui/material/styles";

export const accountLayoutStyles: Record<string, SxProps<Theme>> = {
  container: {
    display: "flex",
    height: "100%",
  },
  content: {
    flex: 1,
    minWidth: 0,
    overflowY: "auto",
    p: { xs: 2, md: 4 },
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },
  adminButton: {
    justifyContent: "flex-start",
    textTransform: "none",
    borderRadius: 2,
    bgcolor: "common.black",
    color: "common.white",
    "&:hover": {
      bgcolor: "common.black",
    },
  },
  logoutButton: {
    justifyContent: "flex-start",
    textTransform: "none",
    borderRadius: 2,
    color: "red",
  },
};
