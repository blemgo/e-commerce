import type { SxProps, Theme } from '@mui/material/styles';

export const bannerStyles: Record<string, SxProps<Theme>> = {
  root: {
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    bgcolor: 'primary.main',
    p: { xs: 3, md: 5 },
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  logo: {
    height: 40,
    width: 'auto',
    objectFit: 'contain',
  },
  body: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 0,
  },
  registerBox: {
    bgcolor: 'primary.main',
    borderRadius: 4,
    p: { xs: 2, md: 4 },
    boxShadow: '0 18px 45px rgba(0, 0, 0, 0.22)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  register: {
    display: 'block',
    width: 'auto',
    height: 'auto',
    maxWidth: '100%',
    maxHeight: '60vh',
    objectFit: 'contain',
  },
};
