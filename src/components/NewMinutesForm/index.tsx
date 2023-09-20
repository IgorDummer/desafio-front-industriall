import classes from './newMinutesForm.module.css';
import CustomTextField from '../common/TextField';
import CustomizedSelect from '../common/Select';

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
          <CustomTextField
            label="Data e Horário de Início"
            required
          />
          <CustomTextField
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

