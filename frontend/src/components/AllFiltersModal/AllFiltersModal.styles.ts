import type { SxProps, Theme } from '@mui/material';

export const allFiltersModalStyles: Record<string, SxProps<Theme>> = {
  section: {
    mb: 2.5,
  },
  label: {
    fontWeight: 600,
    mb: 1,
    display: 'block',
  },
  sliderWrapper: {
    px: 1,
    mb: 1,
  },
  priceInputRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  priceInput: {
    width: '48%',
  },
  sortSelect: {
    flex: 1,
  },
  row: {
    display: 'flex',
    gap: 1.5,
  },
};
