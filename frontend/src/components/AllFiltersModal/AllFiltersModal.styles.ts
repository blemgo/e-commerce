import type { SxProps, Theme } from '@mui/material';

export const allFiltersModalStyles: Record<string, SxProps<Theme>> = {
  paper: {
    borderRadius: 3,
    p: 3,
    minWidth: 360,
    backgroundColor: 'background.default',
  },
  title: {
    fontWeight: 700,
    mb: 3,
  },
  section: {
    mb: 2.5,
  },
  label: {
    fontWeight: 600,
    mb: 1,
    display: 'block',
  },
  dialogContent: {
    p: 3,
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
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 1.5,
    mt: 3,
    pt: 2,
    borderTop: '1px solid',
    borderColor: 'divider',
  },
};
