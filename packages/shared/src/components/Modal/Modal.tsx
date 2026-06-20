import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import type { Breakpoint } from '@mui/material/styles';
import { StyledButton } from '@shared/components/StyledButton';
import { modalStyles } from './Modal.styles';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  onSubmit?: () => void;
  onCancel?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  submitColor?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  submitDisabled?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
  maxWidth?: Breakpoint;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
  title,
  onSubmit,
  onCancel,
  submitLabel = 'Save',
  cancelLabel = 'Cancel',
  submitColor = 'secondary',
  submitDisabled = false,
  isLoading = false,
  fullWidth = false,
  maxWidth = 'xs',
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      slotProps={{ paper: { sx: modalStyles.paper } }}
    >
      {title && <DialogTitle>{title}</DialogTitle>}

      <DialogContent sx={modalStyles.content}>{children}</DialogContent>

      {onSubmit && (
        <DialogActions sx={modalStyles.actions}>
          <StyledButton
            variant="text"
            color="secondary"
            disabled={isLoading}
            loading={false}
            onClick={onCancel ?? onClose}
          >
            {cancelLabel}
          </StyledButton>
          <StyledButton
            variant="contained"
            color={submitColor}
            disabled={submitDisabled || isLoading}
            loading={isLoading}
            onClick={onSubmit}
          >
            {submitLabel}
          </StyledButton>
        </DialogActions>
      )}
    </Dialog>
  );
};

export { Modal };
