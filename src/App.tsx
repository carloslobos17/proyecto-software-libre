import { useState } from 'react'
import './App.css'
import { LoginPage } from './pages/loginpage'
import { RegisterPage } from './pages/RegisterPage'

function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'register'>('register')
  return (
    <>
    {console.log(currentPage)}
    {currentPage === "login"?
    (
      <LoginPage onNavigateToRegister={()=>setCurrentPage('register')}/>
    ):(
      <RegisterPage onNavigateToLogin={()=> setCurrentPage('login')}/>
    )
    
    }
    </>
  )
}

export default App
