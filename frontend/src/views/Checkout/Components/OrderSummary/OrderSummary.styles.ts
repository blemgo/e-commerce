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
