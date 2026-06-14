import type { SxProps, Theme } from '@mui/material/styles';

const TILE_IMAGE = 'https://picsum.photos/seed/product42/600/600';

export const notFoundStyles: Record<string, SxProps<Theme>> = {
  container: {
    position: 'fixed',
    inset: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${TILE_IMAGE})`,
    backgroundRepeat: 'repeat',
    backgroundSize: '120px 120px',
  },
  message: {
    color: 'error.main',
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: 2,
    px: 3,
    py: 2,
    borderRadius: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
};
