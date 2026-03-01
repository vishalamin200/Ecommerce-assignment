
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import LoginPage from './pages/Login'

function App() {


  return (
    <Routes>
      <Route path='/' element={<Home/>}  />
      <Route path='/login' element={<LoginPage/>}  />
    </Routes>
  )
}

export default App
