import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';

import { TextField } from '@mui/material';
import { styled } from '@mui/styles';

interface DatePickerProps {
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

export default function BasicDatePicker({ label, required }: DatePickerProps) {
  const [isRequired] = useState(required ? true : false)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ptBR">
      <DateTimePicker label={label}
        slotProps={{ textField: { size: 'small', fullWidth: true, required: isRequired } }}
        slots={{
          textField: textFieldProps => <CssTextField {...textFieldProps} />,
          openPickerIcon: TodayOutlinedIcon
        }}
      />
    </LocalizationProvider>
  );
}