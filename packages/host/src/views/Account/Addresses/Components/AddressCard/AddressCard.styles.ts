import type { SxProps, Theme } from '@mui/material/styles';

export const addressCardStyles: Record<string, SxProps<Theme>> = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1.5,
    p: 2.5,
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 2,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    color: 'text.secondary',
  },
  defaultChip: {
    bgcolor: 'common.black',
    color: 'common.white',
    fontWeight: 600,
  },
  lines: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0.25,
  },
  line: {
    fontSize: '0.875rem',
    color: 'text.secondary',
  },
  actions: {
    display: 'flex',
    gap: 2,
    mt: 0.5,
  },
  action: {
    textTransform: 'none',
    minWidth: 0,
    p: 0,
    color: 'text.primary',
  },
  removeAction: {
    textTransform: 'none',
    minWidth: 0,
    p: 0,
    color: 'error.main',
  },
};
