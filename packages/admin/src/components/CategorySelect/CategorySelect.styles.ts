import type { SxProps, Theme } from "@mui/material/styles";

export const categorySelectStyles: Record<string, SxProps<Theme>> = {
  option: {
    display: "flex",
    flexDirection: "column",
    gap: 0.25,
  },
  optionName: {
    fontWeight: 600,
    lineHeight: 1.2,
  },
  optionPath: {
    fontSize: "0.75rem",
    color: "text.secondary",
  },
};
