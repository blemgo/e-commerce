import type { SxProps, Theme } from '@mui/material/styles';

export const categoryDropdownStyles: Record<string, SxProps<Theme>> = {
  overlay: {
    position: 'fixed',
    top: '64px',
    left: 0,
    right: 0,
    zIndex: 1200,
    bgcolor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid',
    borderColor: 'divider',
    px: { xs: 2, md: 4 },
    py: 1,
  },
  list: {
    maxWidth: 360,
  },
  itemRow: {
    display: 'flex',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    pl: 1.5,
    pr: 1,
    py: 1.25,
    '&:hover': { background: 'transparent', textDecoration: 'underline' },
  },
  itemText: {
    fontSize: '0.75rem',
    fontWeight: 500,
    letterSpacing: '0.08em',
  },
  allItemText: {
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.1em',
  },
  chevronButton: {
    color: 'text.secondary',
    '&:hover': { background: 'transparent', color: 'text.primary' },
  },
  chevronIcon: {
    fontSize: '0.9rem',
    transition: 'transform 0.2s ease',
  },
};
