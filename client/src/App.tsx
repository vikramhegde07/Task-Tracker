import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Navbar from './components/Common/Navbar'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import { useAuth } from './context/AuthContext'

function App() {
  const { token, user } = useAuth();
  const navigator = useNavigate();

  useEffect(() => {
    if (!token || !user) {
      navigator('/login')
    } else {
      navigator('/')
    }
  }, [token, user])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

      </Routes>

      <Toaster position='top-center' reverseOrder={false} />
    </>
  )
}

export default App
