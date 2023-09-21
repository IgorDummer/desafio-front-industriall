import Header from '../components/Header';
import MinuteViewer from '../components/MinuteViewer';
import '../index.css'
import { useParams } from 'react-router-dom';


const Ata = () => {
  const { id } = useParams();

  return (
    <div className="pageContent">
      <Header
        title="Ata de Reunião"
        subtitle="Veja o detalhamento da ata de reunião"
      />
      <MinuteViewer id={id ?? ''} />
    </div>
  )
}

export default Ata;