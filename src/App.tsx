import { useState } from 'react'
import './App.css'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { useAuth } from './context/useAuth'
import { DashboardPage } from './pages/Dashboard'
import { ProfilePage } from './pages/ProfilePage'

type PublicScreen = "login" | "register"
type PrivateScreen = "dashboard" | "profile"

function App() {
  //UTILIZAR NUESTRO CONTEXTO
  const {
    isAuthenticated
  } = useAuth()

  const [publicScreen, setPublicScreen] = useState<PublicScreen>("login")
  const [privateScreen, setPrivateScreen] = useState<PrivateScreen>("dashboard")


  if (!isAuthenticated) {
    if (publicScreen === "register") {
      return (
        <RegisterPage onNavigateToLogin={() => setPublicScreen("login")} />
      )
    }
    return (
      <LoginPage onNavigateToRegister={() => setPublicScreen("register")} />
    )
  }
  if (privateScreen === "profile") {
    return (
      <ProfilePage onBackToDashboard={() => setPrivateScreen("dashboard")} />
    )
  }
  return (
    <DashboardPage onNavigateToProfile={() => setPrivateScreen("profile")} />
  )

}

export default App