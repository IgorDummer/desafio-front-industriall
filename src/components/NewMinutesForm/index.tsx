import classes from './newMinutesForm.module.css';
import CustomTextField from '../common/TextField';

export default function NewMinutesForm() {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Identificação</h1>
      <div className={classes.textFieldContainer}>
        <CustomTextField
          label="Titulo"
          required
        />
        <CustomTextField
          label="Titulo"
          required
        />
        <CustomTextField
          label="Titulo"
          required
        />
        <CustomTextField
          label="Titulo"
          required
        />
      </div>
    </div>
  )
}

