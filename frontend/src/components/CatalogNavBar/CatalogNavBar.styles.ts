import type { SxProps, Theme } from '@mui/material/styles';

export const catalogNavBarStyles: Record<string, SxProps<Theme>> = {
  categoryButton: {
    color: 'text.primary',
    fontWeight: 500,
    fontSize: '0.7rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    px: 1.5,
    '&:hover': {
      background: 'transparent',
      textDecoration: 'underline',
    },
  },
  categoryButtonActive: {
    textDecoration: 'underline',
  },
  iconButton: {
    color: 'text.primary',
    p: 1,
    '&:hover': {
      background: 'transparent',
    },
  },
  icon: {
    fontSize: '1.25rem',
  },
  cartBadge: {
    '& .MuiBadge-badge': {
      fontSize: '0.6rem',
      minWidth: '16px',
      height: '16px',
      padding: '0 3px',
    },
  },
  backdrop: {
    zIndex: 999,
  },
};
