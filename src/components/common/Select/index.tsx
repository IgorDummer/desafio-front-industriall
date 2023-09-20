import { MenuItem, TextField, styled } from '@mui/material';

interface SelectProps {
  label: string;
  required?: boolean;
}


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

export default function CustomizedSelect({ label, required }: SelectProps) {

  return (
    <CssTextField
      select
      label={label}
      required={required ? true : false}
      fullWidth
      size="small"
      sx={{ input: { color: '#312F2F' } }}
    >
      <MenuItem key={1} value="test">
        Test 1
      </MenuItem>
      <MenuItem key={2} value="test2">
        Test 2
      </MenuItem>
    </CssTextField>
  );
}