import Button from '@mui/material/Button';
import { styledButtonStyles } from './StyledButtonStyles';

interface StyledButtonProps {
  children: React.ReactNode,
  onClick: () => void,
  disabled: boolean,
  loading: boolean,
  variant: 'contained' | 'outlined' | 'text',
  color: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success',
};

const StyledButton : React.FC<StyledButtonProps> = ({ children, onClick, disabled, loading, variant, color }) => {
  return (
    <Button variant={variant} color={color} disabled={disabled} loading={loading} onClick={onClick} sx={styledButtonStyles.button}>
        {children}
    </Button>
  );
};

export { StyledButton };
