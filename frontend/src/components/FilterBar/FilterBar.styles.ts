import type { SxProps, Theme } from '@mui/material';

export const filterBarStyles: Record<string, SxProps<Theme>> = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    flexWrap: 'wrap',
    mb: 3,
  },
  allFiltersBtn: {
    borderRadius: 6,
    borderColor: 'divider',
    color: 'text.primary',
    textTransform: 'none',
    fontWeight: 600,
    px: 2,
  },
  divider: {
    height: 24,
    mx: 0.5,
    alignSelf: 'center',
  },
  sortContainer: {
    ml: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
  },
  sortLabel: {
    color: 'text.secondary',
    whiteSpace: 'nowrap',
  },
};
