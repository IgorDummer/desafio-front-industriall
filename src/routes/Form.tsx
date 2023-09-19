import Header from '../components/Header';
import NewMinutesForm from '../components/NewMinutesForm';
import '../index.css'

const Form = () => {
  return (
    <div className="pageContent">
      <Header
        title='Nova Ata de Reunião'
        subtitle='Os campos obrigatórios estão marcados com um asterisco (*)'
      />
      <NewMinutesForm />
    </div>
  )
}

export default Form;