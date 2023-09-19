import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import './index.css'

function App() {

  return (
    <div className="App">
      <Navbar />
      <div className="pageContent">
        <Outlet />
      </div>
    </div >
  )
}

export default App
