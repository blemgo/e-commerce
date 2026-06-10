import type { SxProps, Theme } from '@mui/material/styles';

export const orderSummaryStyles: Record<string, SxProps<Theme>> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  items: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  itemRow: {
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
  itemName: {
    flex: 1,
    fontSize: '0.875rem',
    fontWeight: 500,
  },
  itemPrice: {
    fontSize: '0.875rem',
    fontWeight: 500,
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  footerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLabel: {
    fontSize: '0.875rem',
    color: 'text.secondary',
  },
  footerValue: {
    fontSize: '0.875rem',
    fontWeight: 500,
  },
  totalLabel: {
    fontSize: '1.0625rem',
    fontWeight: 700,
  },
  totalValue: {
    fontSize: '1.0625rem',
    fontWeight: 700,
  },
};
