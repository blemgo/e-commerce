import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import { Modal } from '@components/Modal';
import { StyledInput } from '@/components/StyledInput';
import { useChangePassword } from '@api/hooks/users/useChangePassword';
import { passwordDialogStyles } from './PasswordDialog.styles';

interface PasswordDialogProps {
  open: boolean;
  onClose: () => void;
}

const emptyForm = { current: '', next: '', confirm: '' };

const PasswordDialog: React.FC<PasswordDialogProps> = ({ open, onClose }: PasswordDialogProps) => {
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
    <Modal
      open={open}
      onClose={onClose}
      title="Update password"
      onSubmit={handleSubmit}
      submitLabel="Update"
      submitDisabled={!isValid}
      isLoading={isLoading}
      fullWidth
      maxWidth="xs"
    >
      <Box sx={passwordDialogStyles.content}>
        <StyledInput
          type="password"
          label="Current password"
          value={form.current}
          onChange={setField('current')}
        />
        <StyledInput
          type="password"
          label="New password"
          value={form.next}
          onChange={setField('next')}
        />
        <StyledInput
          type="password"
          label="Confirm new password"
          value={form.confirm}
          onChange={setField('confirm')}
          error={mismatch}
          helperText={mismatch ? 'Passwords do not match' : undefined}
        />
      </Box>
    </Modal>
  );
};

export { PasswordDialog };
