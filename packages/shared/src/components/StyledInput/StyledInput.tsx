import TextField from '@mui/material/TextField';
import type { TextFieldProps } from '@mui/material/TextField';
import { inputStyles } from '@shared/components/StyledInput/Input.styles';

interface StyledInputProps {
  type: string;
  placeholder?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  helperText?: string;
  slotProps?: TextFieldProps['slotProps'];
}

const StyledInput: React.FC<StyledInputProps> = ({
  type,
  placeholder,
  label,
  value,
  onChange,
  error = false,
  helperText,
  slotProps,
}) => {
  return (
    <TextField
      fullWidth
      size="small"
      type={type}
      placeholder={placeholder}
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      error={error}
      helperText={helperText}
      slotProps={slotProps}
      sx={inputStyles.input}
    />
  );
};

export { StyledInput };
