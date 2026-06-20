import type { SxProps, Theme } from '@mui/material';

export const paginatedViewStyles: Record<string, SxProps<Theme>> = {
  emptyState: {
    textAlign: 'center',
    py: 8,
    color: 'text.secondary',
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    mt: 4,
  },
};
