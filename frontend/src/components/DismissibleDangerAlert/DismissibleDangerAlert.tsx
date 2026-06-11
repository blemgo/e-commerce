import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { dismissibleDangerAlertStyles } from './DismissibleDangerAlert.styles';

interface DismissibleDangerAlertProps {
  message: string;
  onClose: () => void;
}

const DismissibleDangerAlert: React.FC<DismissibleDangerAlertProps> = ({ message, onClose }) => {
  return (
    <Box role="alert" sx={dismissibleDangerAlertStyles.root}>
      <Typography sx={dismissibleDangerAlertStyles.message}>{message}</Typography>
      <IconButton
        aria-label="Dismiss error"
        onClick={onClose}
        size="small"
        type="button"
        sx={dismissibleDangerAlertStyles.closeButton}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export { DismissibleDangerAlert };
