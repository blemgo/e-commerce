import type { SxProps, Theme } from '@mui/material/styles';

export const orderDetailsStyles: Record<string, SxProps<Theme>> = {
  card: {
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: '8px',
  },
  rowHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    px: 2.5,
    py: 2,
    cursor: 'pointer',
  },
  rowStatic: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 2,
    px: 2.5,
    py: 2,
  },
  rowLabel: {
    width: 100,
    flexShrink: 0,
    fontSize: '0.875rem',
    color: 'text.secondary',
  },
  rowSummary: {
    flex: 1,
    fontSize: '0.875rem',
    fontWeight: 500,
  },
  rowSecondary: {
    fontSize: '0.8125rem',
    color: 'text.secondary',
  },
  chevron: {
    fontSize: '1.25rem',
    color: 'text.secondary',
  },
  addressList: {
    px: 2.5,
    pb: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 1,
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    py: 2,
  },
  addressOption: {
    alignItems: 'flex-start',
    mx: 0,
    mb: 1.5,
  },
  addressLabel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 0.5,
    pt: 0.75,
  },
  addressLine: {
    fontSize: '0.875rem',
  },
  defaultChip: {
    bgcolor: '#e5e5e5',
    color: 'text.primary',
    fontSize: '0.6875rem',
    height: 20,
  },
  makeDefaultButton: {
    p: 0,
    minWidth: 0,
    fontSize: '0.75rem',
    fontWeight: 500,
    color: 'text.secondary',
    textDecoration: 'underline',
    '&:hover': {
      background: 'transparent',
      textDecoration: 'underline',
    },
  },
  addAddressButton: {
    p: 0,
    color: 'text.primary',
    fontSize: '0.875rem',
    '&:hover': {
      background: 'transparent',
      textDecoration: 'underline',
    },
  },
  shippingText: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 0.25,
  },
  cardFields: {
    px: 2.5,
    pb: 2.5,
    display: 'flex',
    flexDirection: 'column',
    gap: 1.5,
  },
  cardFieldRow: {
    display: 'flex',
    gap: 1.5,
  },
};
