import Header from '../components/Header';
import MeetingMinutesList from '../components/MeetingMinutesList';
import '../index.css'

const Home = () => {
  return (
    <div className="pageContent">
      <Header
        title='Atas de Reunião'
        subtitle='Estas são as atas das últimas reuniões'
        hasButton
      />
      < MeetingMinutesList />
    </div>
  )
}

export default Home;