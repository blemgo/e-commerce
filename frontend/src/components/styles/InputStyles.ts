import type { SxProps, Theme } from '@mui/material/styles';

export const inputStyles: Record<string, SxProps<Theme>> = {
  input: {
    '& .MuiInputBase-root': {
      bgcolor: 'background.paper',
    },
  },
};
