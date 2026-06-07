import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import { StyledButton } from '@components/StyledButton/StyledButton';
import { StyledInput } from '@components/StyledInput/StyledInput';
import { signInStyles } from './SignInStyles';

interface SignInProps {
  onSubmit: (email: string, password: string, rememberMe: boolean) => void;
  onGoogleLogin: () => void;
  onAppleLogin: () => void;
  onForgotPassword: () => void;
  onCreateAccount: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const SignIn: React.FC<SignInProps> = ({
  onSubmit,
  onGoogleLogin,
  onAppleLogin,
  onForgotPassword,
  onCreateAccount,
  loading = false,
  disabled = false,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password, rememberMe);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={signInStyles.card}>
      <Box sx={signInStyles.titleGroup}>
        <Typography sx={signInStyles.title}>Welcome back</Typography>
        <Typography sx={signInStyles.subtitle}>Sign in to pick up where you left off.</Typography>
      </Box>

      <Box sx={signInStyles.socialButtonsGroup}>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<GoogleIcon sx={{ color: '#4285F4' }} />}
          onClick={onGoogleLogin}
          type="button"
          sx={signInStyles.socialButton}
        >
          Continue with Google
        </Button>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<AppleIcon />}
          onClick={onAppleLogin}
          type="button"
          sx={signInStyles.socialButton}
        >
          Continue with Apple
        </Button>
      </Box>

      <Divider>
        <Typography variant="caption" color="text.secondary">or</Typography>
      </Divider>

      <Box sx={signInStyles.fieldsGroup}>
        <Box sx={signInStyles.fieldGroup}>
          <Typography sx={signInStyles.inputLabel}>Email</Typography>
          <StyledInput
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={setEmail}
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

        <Box sx={signInStyles.fieldGroup}>
          <Typography sx={signInStyles.inputLabel}>Password</Typography>
          <StyledInput
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={setPassword}
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

      <Box sx={signInStyles.rememberRow}>
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              color="secondary"
            />
          }
          label={<Typography sx={signInStyles.rememberLabel}>Remember me</Typography>}
        />
        <Typography component="span" sx={signInStyles.forgotLink} onClick={onForgotPassword}>
          Forgot password?
        </Typography>
      </Box>

      <Box sx={signInStyles.signInButtonWrapper}>
        <StyledButton
          onClick={() => onSubmit(email, password, rememberMe)}
          disabled={disabled}
          loading={loading}
          variant="contained"
          color="secondary"
        >
          Sign in
        </StyledButton>
      </Box>

      <Typography sx={signInStyles.createAccountText}>
        New to bally?{' '}
        <Typography component="span" sx={signInStyles.createAccountLink} onClick={onCreateAccount}>
          Create account
        </Typography>
      </Typography>

      <Typography sx={signInStyles.legalText}>
        By continuing you agree to our Terms &amp; Privacy.
      </Typography>
    </Box>
  );
};

export { SignIn };
