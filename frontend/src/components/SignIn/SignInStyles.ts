import type { SxProps, Theme } from '@mui/material/styles';

export const signInStyles: Record<string, SxProps<Theme>> = {
  card: {
    width: 360,
    bgcolor: 'background.paper',
    borderRadius: 3,
    p: 4,
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
  socialButtonsGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  socialButton: {
    borderRadius: 2,
    borderColor: 'divider',
    color: 'text.primary',
    fontWeight: 600,
    fontSize: '0.9rem',
    py: 1.2,
    textTransform: 'none',
    justifyContent: 'center',
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
  rememberRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rememberLabel: {
    fontSize: '0.875rem',
  },
  forgotLink: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: 'primary.main',
    cursor: 'pointer',
    '&:hover': { textDecoration: 'underline' },
  },
  signInButtonWrapper: {
    height: 48,
  },
  createAccountText: {
    textAlign: 'center',
    fontSize: '0.875rem',
  },
  createAccountLink: {
    fontWeight: 700,
    color: 'text.primary',
    cursor: 'pointer',
    '&:hover': { textDecoration: 'underline' },
  },
  legalText: {
    textAlign: 'center',
    fontSize: '0.75rem',
    color: 'text.disabled',
  },
};
