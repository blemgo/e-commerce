import type { SxProps, Theme } from '@mui/material';

export const searchBarStyles: Record<string, SxProps<Theme>> = {
  input: {
    width: 320,
    '& .MuiOutlinedInput-root': {
      borderRadius: 6,
    },
  },
};
