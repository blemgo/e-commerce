import Button from '@mui/material/Button';
import { styledButtonStyles } from './StyledButtonStyles';

interface StyledButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled: boolean;
  loading: boolean;
  variant: 'contained' | 'outlined' | 'text';
  color: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  type?: 'button' | 'submit';
}

const StyledButton: React.FC<StyledButtonProps> = ({
  children,
  onClick,
  disabled,
  loading,
  variant,
  color,
  type = 'button',
}) => {
  return (
    <Button
      type={type}
      variant={variant}
      color={color}
      disabled={disabled}
      loading={loading}
      onClick={onClick}
      sx={styledButtonStyles.button}
    >
      {children}
    </Button>
  );
};

export { StyledButton };
