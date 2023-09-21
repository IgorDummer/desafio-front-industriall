import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import { ptBR } from '@mui/x-date-pickers/locales';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/pt-br';

import { TextField } from '@mui/material';
import { styled } from '@mui/styles';
import { Dayjs } from 'dayjs';

/* Estilização do material-ui */
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

interface DatePickerProps {
  label: string;
  required?: boolean;
  value?: Dayjs | null;
  onChange?: (newValue: Dayjs | null) => void;
  readOnly?: boolean;
}

export default function BasicDatePicker({ label, required, value, onChange, readOnly }: DatePickerProps) {
  const [isRequired] = useState(required ? true : false)
  const [isReadOnly] = useState(readOnly ? true : false)

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br"
      localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}
    >
      <DateTimePicker
        label={label}
        slotProps={{ textField: { size: 'small', fullWidth: true, required: isRequired } }}
        slots={{
          textField: textFieldProps =>
            <CssTextField
              InputProps={{
                readOnly: isReadOnly,
              }}
              {...textFieldProps}
            />,
          openPickerIcon: TodayOutlinedIcon
        }}
        value={value}
        onChange={onChange}
      />
    </LocalizationProvider>
  );
}