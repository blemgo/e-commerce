import type { SxProps, Theme } from '@mui/material/styles';

export const loadingScreenStyles: Record<string, SxProps<Theme>> = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    bgcolor: 'background.default',
  },
};
