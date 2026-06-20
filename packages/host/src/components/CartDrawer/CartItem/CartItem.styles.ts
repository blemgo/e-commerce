import type { SxProps, Theme } from '@mui/material/styles';

export const cartItemStyles: Record<string, SxProps<Theme>> = {
  root: {
    display: 'flex',
    gap: 2,
    py: 2,
  },
  thumbnail: {
    width: 72,
    height: 72,
    objectFit: 'cover',
    flexShrink: 0,
    bgcolor: '#f5f5f5',
  },
  details: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 0.5,
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 1,
  },
  name: {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: 'text.primary',
    lineHeight: 1.3,
  },
  totalPrice: {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: 'text.primary',
    whiteSpace: 'nowrap',
  },
  unitPrice: {
    fontSize: '0.8125rem',
    color: 'text.secondary',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
    mt: 0.5,
  },
  qtyButton: {
    width: 28,
    height: 28,
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: '4px',
    p: 0,
  },
  qtyDisplay: {
    minWidth: 32,
    textAlign: 'center',
    fontSize: '0.875rem',
  },
  deleteButton: {
    ml: 0.5,
    color: 'text.secondary',
    p: 0.5,
    '&:hover': { color: 'error.main' },
  },
};
