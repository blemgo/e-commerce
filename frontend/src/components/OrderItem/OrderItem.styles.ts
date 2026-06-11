import type { SxProps, Theme } from '@mui/material/styles';

export const orderItemStyles: Record<string, SxProps<Theme>> = {
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },
  qtyBadge: {
    '& .MuiBadge-badge': {
      bgcolor: '#000',
      color: '#fff',
      fontSize: '0.6875rem',
      fontWeight: 600,
      minWidth: 20,
      height: 20,
      borderRadius: '50%',
    },
  },
  thumbnail: {
    width: 64,
    height: 64,
    objectFit: 'cover',
    borderRadius: '8px',
    border: '1px solid',
    borderColor: 'divider',
    bgcolor: 'background.default',
  },
  name: {
    flex: 1,
    fontSize: '0.875rem',
    fontWeight: 500,
  },
  price: {
    fontSize: '0.875rem',
    fontWeight: 500,
  },
};
