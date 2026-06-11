import type { SxProps, Theme } from "@mui/material/styles";

export const sidePanelStyles: Record<string, SxProps<Theme>> = {
  panel: {
    width: 300,
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    p: 2,
    borderRight: "1px solid",
    borderColor: "divider",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 0.5,
  },
  item: {
    borderRadius: 2,
    color: "text.secondary",
    "& .MuiListItemIcon-root": {
      color: "inherit",
      minWidth: 36,
    },
    "&.Mui-selected": {
      bgcolor: "common.black",
      color: "common.white",
      "&:hover": {
        bgcolor: "common.black",
      },
    },
    "&.Mui-selected .MuiListItemIcon-root": {
      color: "common.white",
    },
  },
  footer: {
    mt: "auto",
  },
};
