import TextField from '@mui/material/TextField';
import { styled } from '@mui/styles';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#FF4F2A',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#C0C1C6',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#C0C1C6',
    },
    '&:hover fieldset': {
      borderColor: '#B2BAC2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FF4F2A',
    },

    height: '40px',
    fontSize: '16px',
    fontWeight: '400',
    alignItems: 'center',
  },
});

interface TextFieldProps {
  label: string;
  required?: boolean;
}

export default function CustomTextField({ label, required }: TextFieldProps) {
  return (
    <CssTextField label={label} id="custom-css-outlined-input" required={required ? true : false} fullWidth size="small" />
  )
}