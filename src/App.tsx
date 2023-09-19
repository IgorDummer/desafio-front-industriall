import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'

function App() {
  console.log(import.meta.env.VITE_API_KEY)
  return (
    <div className="App">
      <Navbar />
      <Outlet />
    </div >
  )
}

export default App
