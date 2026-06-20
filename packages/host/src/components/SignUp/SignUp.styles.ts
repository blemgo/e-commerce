import type { SxProps, Theme } from '@mui/material/styles';

export const signUpStyles: Record<string, SxProps<Theme>> = {
  card: {
    width: '100%',
    maxWidth: 500,
    px: 6,
    py: 5,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  titleGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0.5,
  },
  title: {
    fontWeight: 700,
    fontSize: '1.75rem',
    lineHeight: 1.2,
  },
  subtitle: {
    color: 'text.secondary',
    fontSize: '0.9rem',
  },
  fieldsGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1.5,
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0.5,
  },
  inputLabel: {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'text.primary',
  },
  signUpButtonWrapper: {
    height: 48,
  },
  signInText: {
    textAlign: 'center',
    fontSize: '0.875rem',
  },
  signInLink: {
    fontWeight: 700,
    color: 'text.primary',
    cursor: 'pointer',
    '&:hover': { textDecoration: 'underline' },
  },
};
