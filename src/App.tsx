import { useState } from 'react'
import './App.css'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { useAuth } from './context/useAuth'
import { DashboardPage } from './pages/Dashboard'

function App() {
  //UTILIZAR NUESTRO CONTEXTO
  const{
    isAuthenticated,
    isHydrated
  }=useAuth()
  const [screen, setScreen] = useState<"login" | "register">("login")
  if(!isHydrated) return <div>Cargando...</div>
  if(isAuthenticated) return <DashboardPage/>
  if(screen === "register"){
    return <RegisterPage onNavigateToLogin={()=>setScreen("login")}/>
  }
  return <LoginPage onNavigateToRegister={()=>setScreen("register")}/>
}

export default App