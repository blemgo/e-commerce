import type { SxProps, Theme } from '@mui/material';

export const productCardStyles: Record<string, SxProps<Theme>> = {
  card: {
    cursor: 'pointer',
    width: '100%',
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    paddingTop: '100%',
    borderRadius: 3,
    overflow: 'hidden',
    flexShrink: 0,
  },
  imagePlaceholder: {
    position: 'absolute',
    inset: 0,
    background:
      'repeating-linear-gradient(-45deg, #c5d8f0 0px, #c5d8f0 10px, #aec8e8 10px, #aec8e8 20px)',
  },
  image: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  categoryText: {
    mt: 1,
    minHeight: '1.25em',
  },
  nameRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    flexWrap: 'wrap',
  },
  priceRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mt: 0.25,
  },
};
