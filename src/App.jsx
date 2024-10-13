import './App.css' 
import Navbar from './components/Navbar/Navbar'

import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <div>
        <Navbar/>
        <Outlet/>
      </div>
    </>
  )
}

export default App
