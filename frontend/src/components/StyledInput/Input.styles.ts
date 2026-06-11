import type { SxProps, Theme } from '@mui/material/styles';

export const inputStyles: Record<string, SxProps<Theme>> = {
  input: {
    borderRadius: '30px',
    '& .MuiInputBase-root': {
      bgcolor: 'background.default',
    },
  },
};
