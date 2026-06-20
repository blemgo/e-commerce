import type { SxProps, Theme } from '@mui/material/styles';

export const checkoutPageStyles: Record<string, SxProps<Theme>> = {
  container: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    minHeight: '100%',
  },
  left: {
    flex: 1.4,
    display: 'flex',
    justifyContent: { xs: 'center', md: 'flex-end' },
    px: { xs: 2, md: 6 },
    py: 6,
  },
  leftContent: {
    width: '100%',
    maxWidth: 560,
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  right: {
    flex: 1,
    bgcolor: 'background.paper',
    borderLeft: { xs: 'none', md: '1px solid' },
    borderColor: 'divider',
    px: { xs: 2, md: 6 },
    py: 6,
  },
  rightContent: {
    width: '100%',
    maxWidth: 420,
  },
  payButton: {
    width: '100%',
    py: 1.5,
    borderRadius: '8px',
    fontSize: '0.9375rem',
  },
};
