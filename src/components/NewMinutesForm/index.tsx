import CustomTextField from '../common/TextField';
import CustomizedSelect from '../common/Select';
import BasicDatePicker from '../common/DateTimePicker';

import classes from './newMinutesForm.module.css';
import ButtonCustomized from '../common/Button';

export default function NewMinutesForm() {
  function handleButtonClick() {

  }

  return (
    <div className={classes.container}>
      <div>
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
      <div className={classes.buttonContainer}>
        <ButtonCustomized
          title="CANCELAR"
          color="gray"
          onClick={handleButtonClick}
        />
        <ButtonCustomized
          title="SALVAR ATA"
          color="green"
          onClick={handleButtonClick}
        />
      </div>
    </div>
  )
}

