const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email: string): string | undefined => {
  const trimmed = email.trim();

  if (!trimmed) {
    return 'Email is required';
  }

  if (!EMAIL_PATTERN.test(trimmed)) {
    return 'Enter a valid email address';
  }

  return undefined;
};

export const validatePassword = (password: string): string | undefined => {
  if (!password) {
    return 'Password is required';
  }

  if (password.length < 8) {
    return 'Password must be at least 8 characters';
  }

  return undefined;
};

export const validateFullName = (fullName: string): string | undefined => {
  const trimmed = fullName.trim();

  if (!trimmed) {
    return 'Full name is required';
  }

  if (trimmed.length < 2) {
    return 'Full name must be at least 2 characters';
  }

  if (trimmed.length > 100) {
    return 'Full name must be at most 100 characters';
  }

  return undefined;
};
