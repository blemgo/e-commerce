import type { SxProps, Theme } from '@mui/material';

export const searchBarStyles: Record<string, SxProps<Theme>> = {
  floatingContainer: {
    position: 'fixed',
    top: '114px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '33vw',
    zIndex: 1300,
    bgcolor: 'background.paper',
    borderRadius: 1,
    boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
    px: 1,
    py: 0.5,
  },
  input: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 1,
    },
  },
};
