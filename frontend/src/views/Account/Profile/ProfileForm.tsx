import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { StyledInput } from '@/components/StyledInput';
import { StyledButton } from '@/components/StyledButton/StyledButton';
import { useProfileForm } from './hooks/useProfileForm';
import { PasswordDialog } from './Components/PasswordDialog';
import { useUserContext } from '@contexts/user';
import { profileFormStyles } from './ProfileForm.styles';

interface ProfileFormProps {
  canChangePassword: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  canChangePassword,
}: ProfileFormProps) => {
  const { fullName, setFullName, isDirty, isValid, save, isSaving } =
    useProfileForm();
  const { user } = useUserContext();
  const [passwordOpen, setPasswordOpen] = useState(false);

  return (
    <Box sx={profileFormStyles.container}>
      <Typography variant="h4" sx={profileFormStyles.title}>
        Profile
      </Typography>

      <Box sx={profileFormStyles.card}>
        <Box sx={profileFormStyles.field}>
          <Typography sx={profileFormStyles.label}>Full name</Typography>
          <StyledInput
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={setFullName}
            error={!isValid}
            helperText={!isValid ? 'Name must be at least 2 characters' : undefined}
          />
        </Box>

        <Box sx={profileFormStyles.field}>
          <Typography sx={profileFormStyles.label}>Email address</Typography>
          <Typography sx={profileFormStyles.readonly}>{user?.email}</Typography>
        </Box>

        {canChangePassword && (
          <Box sx={profileFormStyles.field}>
            <Typography sx={profileFormStyles.label}>Password</Typography>
            <Button
              variant="outlined"
              onClick={() => setPasswordOpen(true)}
              sx={profileFormStyles.passwordButton}
              disableElevation
            >
              Update password
            </Button>
          </Box>
        )}

        <Box sx={profileFormStyles.actions}>
          <StyledButton
            onClick={save}
            disabled={!isDirty || !isValid || isSaving}
            loading={isSaving}
            variant="contained"
            color="primary"
          >
            Save changes
          </StyledButton>
        </Box>
      </Box>

      <PasswordDialog open={passwordOpen} onClose={() => setPasswordOpen(false)} />
    </Box>
  );
};

export { ProfileForm };
