import type { SxProps, Theme } from "@mui/material/styles";

export const categoryTreeStyles: Record<string, SxProps<Theme>> = {
  tree: {
    borderRadius: 2,
    border: "1px solid",
    borderColor: "divider",
    bgcolor: "common.white",
    p: 1,
  },
  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    pr: 1,
    "&:hover .category-actions": {
      opacity: 1,
    },
  },
  label: {
    fontWeight: 500,
  },
  actions: {
    display: "flex",
    gap: 0.5,
    opacity: 0,
    transition: "opacity 0.15s ease",
  },
};
