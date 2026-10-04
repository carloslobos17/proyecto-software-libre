import './App.css'
import { useAuth } from './context/useAuth'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { MainLayout } from './components/MainLayout'
import { DashboardPage } from './pages/Dashboard'
import { CategoriesPage } from './pages/CategoriesPage'
import { ProductCreatePage } from './pages/ProductCreatePage'

const ProtectedRoute = () => {
  const { isAuthenticated, isHydrated } = useAuth()
  if (!isHydrated) return null
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

const PublicRoute = () => {
  const { isAuthenticated, isHydrated } = useAuth()
  if (!isHydrated) return null
  return !isAuthenticated ? <Outlet /> : <Navigate to="/catalog" replace />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path='/login' element={<LoginPage onNavigateToRegister={() => { }} />} />
          <Route path='/register' element={<RegisterPage onNavigateToLogin={() => { }} />} />
        </Route>
        <Route element={<ProtectedRoute/>}>
          <Route element={<MainLayout/>}>
            <Route path='/' element={<Navigate to="/catalog"/>}/>
            <Route path='/catalog' element={<DashboardPage/>}/>
            <Route path='categories/create' element={<CategoriesPage/>}/>
            <Route path='products/create' element={<ProductCreatePage/>}/>
          </Route>
        </Route>
      </Routes>

    </BrowserRouter>
  )
}

export default App