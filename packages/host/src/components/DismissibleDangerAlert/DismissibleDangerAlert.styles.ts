import type { SxProps, Theme } from '@mui/material/styles';

export const dismissibleDangerAlertStyles: Record<string, SxProps<Theme>> = {
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    px: 1.5,
    py: 1.25,
    borderRadius: 1.5,
    border: '1px solid',
    borderColor: 'error.main',
    backgroundColor: (theme) =>
      theme.palette.mode === 'dark' ? 'rgba(248, 81, 73, 0.12)' : 'rgba(207, 34, 46, 0.1)',
  },
  message: {
    flex: 1,
    fontSize: '0.875rem',
    fontWeight: 500,
    color: 'text.primary',
    textAlign: 'center',
    pr: 3,
  },
  closeButton: {
    position: 'absolute',
    right: 8,
    color: 'error.main',
    opacity: 0.75,
    p: 0.25,
    '&:hover': {
      opacity: 1,
      backgroundColor: 'transparent',
    },
  },
};
