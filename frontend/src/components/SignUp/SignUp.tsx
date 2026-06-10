import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { StyledButton } from '@components/StyledButton/StyledButton';
import { StyledInput } from '@components/StyledInput/StyledInput';
import { validateEmail, validateFullName, validatePassword } from '@/utils/authValidation';
import { signUpStyles } from './SignUp.styles';

interface SignUpProps {
  onSubmit: (fullName: string, email: string, password: string) => void;
  onSignIn: () => void;
  loading?: boolean;
  disabled?: boolean;
}

interface SignUpFieldErrors {
  fullName?: string;
  email?: string;
  password?: string;
}

const SignUp: React.FC<SignUpProps> = ({
  onSubmit,
  onSignIn,
  loading = false,
  disabled = false,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<SignUpFieldErrors>({});

  const clearFieldError = (field: keyof SignUpFieldErrors) => {
    setErrors((prev) => {
      if (!prev[field]) {
        return prev;
      }

      const next = { ...prev };
      delete next[field];

      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fieldErrors: SignUpFieldErrors = {
      fullName: validateFullName(fullName),
      email: validateEmail(email),
      password: validatePassword(password),
    };

    const nextErrors = Object.fromEntries(
      Object.entries(fieldErrors).filter(([, message]) => message !== undefined),
    ) as SignUpFieldErrors;

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSubmit(fullName.trim(), email.trim(), password);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={signUpStyles.card}>
      <Box sx={signUpStyles.titleGroup}>
        <Typography sx={signUpStyles.title}>Create your account</Typography>
        <Typography sx={signUpStyles.subtitle}>
          Join bally to start shopping in minutes.
        </Typography>
      </Box>

      <Box sx={signUpStyles.fieldsGroup}>
        <Box sx={signUpStyles.fieldGroup}>
          <Typography sx={signUpStyles.inputLabel}>Full name</Typography>
          <StyledInput
            type="text"
            placeholder="Jane Doe"
            value={fullName}
            onChange={(value) => {
              setFullName(value);
              clearFieldError('fullName');
            }}
            error={Boolean(errors.fullName)}
            helperText={errors.fullName}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineOutlinedIcon fontSize="small" color="disabled" />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        <Box sx={signUpStyles.fieldGroup}>
          <Typography sx={signUpStyles.inputLabel}>Email</Typography>
          <StyledInput
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={(value) => {
              setEmail(value);
              clearFieldError('email');
            }}
            error={Boolean(errors.email)}
            helperText={errors.email}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineOutlinedIcon fontSize="small" color="disabled" />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        <Box sx={signUpStyles.fieldGroup}>
          <Typography sx={signUpStyles.inputLabel}>Password</Typography>
          <StyledInput
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(value) => {
              setPassword(value);
              clearFieldError('password');
            }}
            error={Boolean(errors.password)}
            helperText={errors.password}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon fontSize="small" color="disabled" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                      size="small"
                      type="button"
                    >
                      {showPassword
                        ? <VisibilityOffOutlinedIcon fontSize="small" />
                        : <VisibilityOutlinedIcon fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
      </Box>

      <Box sx={signUpStyles.signUpButtonWrapper}>
        <StyledButton
          type="submit"
          disabled={disabled}
          loading={loading}
          variant="contained"
          color="secondary"
        >
          Create account
        </StyledButton>
      </Box>

      <Typography sx={signUpStyles.signInText}>
        Already have an account?{' '}
        <Typography component="span" sx={signUpStyles.signInLink} onClick={onSignIn}>
          Sign in
        </Typography>
      </Typography>
    </Box>
  );
};

export { SignUp };
