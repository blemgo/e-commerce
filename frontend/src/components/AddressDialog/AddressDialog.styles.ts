import type { SxProps, Theme } from '@mui/material/styles';

export const addressDialogStyles: Record<string, SxProps<Theme>> = {
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1.5,
    pt: 1,
  },
  fieldRow: {
    display: 'flex',
    gap: 1.5,
  },
  actions: {
    px: 3,
    pb: 2.5,
  },
};
