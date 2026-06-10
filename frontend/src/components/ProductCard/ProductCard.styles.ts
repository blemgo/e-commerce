import type { SxProps, Theme } from '@mui/material';

export const productCardStyles: Record<string, SxProps<Theme>> = {
  card: {
    cursor: 'pointer',
    width: '100%',
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    paddingTop: '125%',
    overflow: 'hidden',
    flexShrink: 0,
    '&:hover .overlay-add-btn': {
      opacity: 1,
    },
  },
  imagePlaceholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#d9d9d9',
  },
  image: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  overlayButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    opacity: 0,
    transition: 'opacity 0.2s ease',
    '&.overlay-add-btn--active': {
      opacity: 1,
    },
    '& .MuiSvgIcon-root': {
      fontSize: 16,
      color: '#fff',
    },
  },
  productName: {
    mt: 1,
    fontSize: '0.7rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    lineHeight: 1.3,
    fontWeight: 500,
  },
  productPrice: {
    fontSize: '0.7rem',
    letterSpacing: '0.04em',
    mt: 0.25,
  },
};
