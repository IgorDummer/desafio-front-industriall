import TextField from '@mui/material/TextField';
import { styled } from '@mui/styles';
import { useState } from 'react';

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
    backgroundColor: '#F5F5F5'
  },
});

interface TextFieldProps {
  label: string;
  required?: boolean;
  value?: string | undefined;
  onChange?: (value: string | undefined) => void;
  readOnly?: boolean;
}

export default function CustomTextField({ label, required, value, onChange, readOnly }: TextFieldProps) {
  const [isReadOnly] = useState(Boolean(readOnly ? true : false));

  return (
    <CssTextField label={label}
      id="custom-css-outlined-input"
      required={required ? true : false}
      fullWidth
      size="small"
      sx={{ input: { color: '#312F2F' } }}
      value={value || ''}
      onChange={(event) => onChange?.(event.target.value)}
      InputProps={{
        readOnly: isReadOnly,
      }}
    />
  )
}