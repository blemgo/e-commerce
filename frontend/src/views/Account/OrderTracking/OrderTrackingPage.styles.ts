import type { SxProps, Theme } from '@mui/material/styles';

export const orderTrackingStyles: Record<string, SxProps<Theme>> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0.5,
  },
  title: {
    fontWeight: 600,
  },
  subtitle: {
    color: 'text.secondary',
  },
  empty: {
    color: 'text.secondary',
  },
  layout: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    gap: 3,
    alignItems: 'flex-start',
  },
  main: {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  side: {
    width: { xs: '100%', md: 320 },
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    p: 3,
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 2,
  },
  cardTitle: {
    fontWeight: 600,
  },
  stepper: {
    mt: 1,
  },
  cancelled: {
    color: 'error.main',
  },
  items: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  addressLine: {
    fontSize: '0.875rem',
    color: 'text.secondary',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: '0.875rem',
    color: 'text.secondary',
  },
  summaryValue: {
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
