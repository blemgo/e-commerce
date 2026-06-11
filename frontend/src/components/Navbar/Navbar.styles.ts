import type { SxProps, Theme } from '@mui/material/styles';

export const navbarStyles: Record<string, SxProps<Theme>> = {
  appBar: {
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    color: 'text.primary',
    boxShadow: 'none',
    borderBottom: '1px solid',
    borderColor: 'divider',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    px: { xs: 2, md: 4 },
    minHeight: '64px !important',
  },
  left: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 0.5,
  },
  logo: {
    height: 26,
    display: 'block',
  },
};
