import type { SxProps, Theme } from '@mui/material/styles';

export const addressesPageStyles: Record<string, SxProps<Theme>> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 600,
  },
  addButton: {
    textTransform: 'none',
    borderRadius: 2,
    bgcolor: 'common.black',
    color: 'common.white',
    '&:hover': {
      bgcolor: 'common.black',
    },
  },
  empty: {
    color: 'text.secondary',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
    gap: 2,
  },
};
