import type { SxProps, Theme } from "@mui/material/styles";

export const productFormStyles: Record<string, SxProps<Theme>> = {
  layout: {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    gap: 3,
  },
  leftColumn: {
    flex: { md: 5 },
    minWidth: 0,
  },
  rightColumn: {
    flex: { md: 7 },
    minWidth: 0,
  },
  card: {
    p: 3,
    borderRadius: 2,
    border: "1px solid",
    borderColor: "divider",
    bgcolor: "common.white",
  },
  cardTitle: {
    fontWeight: 700,
    mb: 2,
  },
  fields: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  fieldLabel: {
    fontWeight: 600,
    mb: 0.5,
  },
  sectionLabel: {
    fontWeight: 600,
    mb: 1,
  },
  visibilitySection: {
    mt: 3,
  },
  hiddenToggle: {
    "&.Mui-selected": {
      color: "error.contrastText",
      bgcolor: "error.light",
      "&:hover": {
        bgcolor: "error.light",
      },
    },
  },
};
