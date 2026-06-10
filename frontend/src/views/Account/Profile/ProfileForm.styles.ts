import type { SxProps, Theme } from '@mui/material/styles';

export const profileFormStyles: Record<string, SxProps<Theme>> = {
  container: {
    maxWidth: 520,
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  title: {
    fontWeight: 600,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2.5,
    p: 3,
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 2,
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0.5,
  },
  label: {
    fontSize: 13,
    color: 'text.secondary',
  },
  readonly: {
    fontSize: 15,
    color: 'text.primary',
    py: 1,
  },
  passwordButton: {
    alignSelf: 'flex-start',
    textTransform: 'none',
    borderRadius: 2,
    borderColor: 'divider',
    color: 'text.primary',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    mt: 1,
  },
};
