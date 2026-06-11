import type { SxProps, Theme } from '@mui/material/styles';

export const ordersPageStyles: Record<string, SxProps<Theme>> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  title: {
    fontWeight: 600,
  },
  empty: {
    color: 'text.secondary',
  },
  tableWrapper: {
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 2,
    overflow: 'hidden',
  },
  row: {
    cursor: 'pointer',
    '&:last-of-type td': {
      borderBottom: 0,
    },
  },
  orderCell: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
  },
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: 1,
    objectFit: 'cover',
    bgcolor: 'action.hover',
  },
  trackingId: {
    fontWeight: 600,
  },
};
