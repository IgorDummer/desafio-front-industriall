import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface DatePickerProps {
  label: string;
  required?: boolean;
}

export default function BasicDatePicker({ label, required }: DatePickerProps) {
  const [isRequired] = useState(required ? true : false)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        slotProps={{ textField: { size: 'small', fullWidth: true, required: isRequired, } }}
      />
    </LocalizationProvider>
  );
}