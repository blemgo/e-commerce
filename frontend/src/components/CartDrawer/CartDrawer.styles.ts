import type { SxProps, Theme } from '@mui/material/styles';

export const cartDrawerStyles: Record<string, SxProps<Theme>> = {
  paper: {
    width: 400,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    px: 3,
    py: 2,
    borderBottom: '1px solid',
    borderColor: 'divider',
    flexShrink: 0,
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
  },
  title: {
    fontSize: '1rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  badge: {
    width: 22,
    height: 22,
    borderRadius: '50%',
    bgcolor: '#c8102e',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
    fontWeight: 600,
  },
  closeButton: {
    color: 'text.primary',
    p: 0.5,
  },
  itemsContainer: {
    flex: 1,
    overflowY: 'auto',
    px: 3,
  },
  divider: {
    my: 0,
  },
  emptyState: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: 'text.secondary',
    fontSize: '0.875rem',
  },
  footer: {
    px: 3,
    py: 2.5,
    borderTop: '1px solid',
    borderColor: 'divider',
    flexShrink: 0,
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 0.5,
  },
  totalLabel: {
    fontSize: '0.875rem',
    fontWeight: 500,
  },
  totalAmount: {
    fontSize: '1rem',
    fontWeight: 600,
  },
  taxNote: {
    fontSize: '0.75rem',
    color: 'text.secondary',
    mb: 2,
  },
  checkoutButton: {
    width: '100%',
    py: 1.5,
    borderRadius: '2px',
    border: '1px solid',
    borderColor: 'text.primary',
    color: 'text.primary',
    bgcolor: 'transparent',
    letterSpacing: '0.08em',
    fontSize: '0.8125rem',
    '&:hover': {
      bgcolor: 'text.primary',
      color: '#fff',
    },
  },
};
