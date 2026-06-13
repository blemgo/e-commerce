import type { SxProps, Theme } from "@mui/material/styles";

export const imageUploadStyles: Record<string, SxProps<Theme>> = {
  dropzone: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 1.5,
    minHeight: 220,
    p: 3,
    border: "2px dashed",
    borderColor: "divider",
    borderRadius: 2,
    textAlign: "center",
    cursor: "pointer",
    transition: "border-color 0.2s",
    "&:hover": {
      borderColor: "text.secondary",
    },
  },
  hint: {
    color: "text.secondary",
  },
  preview: {
    width: "100%",
    height: 220,
    objectFit: "cover",
    borderRadius: 2,
  },
};
