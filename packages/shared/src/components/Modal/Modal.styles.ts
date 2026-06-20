import type { SxProps, Theme } from '@mui/material/styles';

export const modalStyles: Record<string, SxProps<Theme>> = {
  paper: {
    backgroundColor: 'common.white',
    borderRadius: 2,
  },
  content: {
    pt: 1,
  },
  actions: {
    px: 3,
    pb: 2.5,
  },
};
