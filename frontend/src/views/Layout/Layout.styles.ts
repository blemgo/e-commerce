import type { SxProps, Theme } from '@mui/material/styles';

export const layoutStyles: Record<string, SxProps<Theme>> = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'hidden',
  },
  main: {
    flex: 1,
    overflowY: 'auto',
    bgcolor: 'background.default',
  },
};
