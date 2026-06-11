import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { StyledInput } from '@/components/StyledInput';
import { useChangePassword } from '@api/hooks/users/useChangePassword';
import { passwordDialogStyles } from './PasswordDialog.styles';

interface PasswordDialogProps {
  open: boolean;
  onClose: () => void;
}

const emptyForm = { current: '', next: '', confirm: '' };

const PasswordDialog = ({ open, onClose }: PasswordDialogProps) => {
  const { changePassword, isLoading } = useChangePassword();
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!open) {
      setForm(emptyForm);
    }
  }, [open]);

  const setField = (field: keyof typeof emptyForm) => (value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const mismatch = form.confirm.length > 0 && form.next !== form.confirm;
  const isValid =
    form.current.length >= 8 && form.next.length >= 8 && form.next === form.confirm;

  const handleSubmit = async () => {
    try {
      await changePassword({
        currentPassword: form.current,
        newPassword: form.next,
      });
    } catch {
      return;
    }

    toast.success('Password updated.');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Update password</DialogTitle>
      <DialogContent sx={passwordDialogStyles.content}>
        <StyledInput
          type="password"
          placeholder="Current password"
          value={form.current}
          onChange={setField('current')}
        />
        <StyledInput
          type="password"
          placeholder="New password"
          value={form.next}
          onChange={setField('next')}
        />
        <StyledInput
          type="password"
          placeholder="Confirm new password"
          value={form.confirm}
          onChange={setField('confirm')}
          error={mismatch}
          helperText={mismatch ? 'Passwords do not match' : undefined}
        />
      </DialogContent>
      <DialogActions sx={passwordDialogStyles.actions}>
        <Button onClick={onClose} disableRipple>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!isValid || isLoading}
          disableElevation
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { PasswordDialog };
