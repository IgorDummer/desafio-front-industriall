import { MenuItem, TextField, styled } from '@mui/material';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

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

interface SelectProps<T extends { id: number; nome: string }> {
  label: string;
  required?: boolean;
  options?: T[];
  value: number | undefined;
  onChange?: (value: number | undefined) => void;
}

export default function CustomizedSelect<T extends { id: number; nome: string }>
  ({ label,
    required,
    options,
    value,
    onChange, }: SelectProps<T>) {

  return (
    <CssTextField
      select
      label={label}
      required={required ? true : false}
      fullWidth
      size="small"
      sx={{ input: { color: '#312F2F' } }}
      SelectProps={{
        IconComponent: KeyboardArrowDownOutlinedIcon,
      }}
    >
      {options.map((option) => (
        <MenuItem key={option.id} value={option.id} onClick={() => onChange(option.id)}>
          {option.nome}
        </MenuItem>
      ))}
    </CssTextField>
  );
}