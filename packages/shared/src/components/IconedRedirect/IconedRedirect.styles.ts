import type { SxProps, Theme } from "@mui/material/styles";

export const iconedRedirectStyles: Record<string, SxProps<Theme>> = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    p: 1.5,
    borderRadius: 3,
    border: "1px solid",
    borderColor: "divider",
    cursor: "pointer",
    userSelect: "none",
    "&:hover": {
      bgcolor: "action.hover",
    },
  },
  iconBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 35,
    height: 35,
    borderRadius: 2.5,
    bgcolor: "common.black",
    color: "common.white",
    flexShrink: 0,
  },
  title: {
    flex: 1,
    fontWeight: 600,
    fontSize: "0.9rem",
  },
  chevron: {
    color: "text.secondary",
    flexShrink: 0,
  },
};
