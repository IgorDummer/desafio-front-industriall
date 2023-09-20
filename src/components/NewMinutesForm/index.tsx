import classes from './newMinutesForm.module.css';
import CustomTextField from '../common/TextField';
import CustomizedSelect from '../common/Select';
import BasicDatePicker from '../common/DatePicker';

export default function NewMinutesForm() {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Identificação</h1>
      <div className={classes.textFieldContainer}>
        <CustomTextField
          label="Titulo"
          required
        />
        <CustomizedSelect
          label="Titulo"
          required
        />
        <div className={classes.dateInput}>
          <BasicDatePicker
            label="Data e Horário de Início"
            required
          />
          <BasicDatePicker
            label="Data e Horário de Fim"
          />
        </div>
        <CustomizedSelect
          label="Tipo de Reunião"
          required
        />
      </div>
    </div>
  )
}

