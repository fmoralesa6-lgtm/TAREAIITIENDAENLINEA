
import {
  Routes,
  Route,
  useNavigate,
  useLocation
} from 'react-router-dom'

import {
  useEffect,
  useRef
} from 'react'

import {
  Alert,
  Container
} from 'react-bootstrap'

import { useAuth } from './context/AuthContext.jsx'

import NavigationBar from './components/NavigationBar.jsx'
import Footer from './components/Footer.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

import Inicio from './pages/Inicio.jsx'
import Computadoras from './pages/Computadoras.jsx'
import Telefonos from './pages/Telefonos.jsx'
import Accesorios from './pages/Accesorios.jsx'
import Ofertas from './pages/Ofertas.jsx'
import Nosotros from './pages/Nosotros.jsx'
import Login from './pages/Login.jsx'
import Perfil from './pages/Perfil.jsx'
import Administracion from './pages/Administracion.jsx'

import './App.css'

export default function App() {
  const navigate = useNavigate()
  const location = useLocation()

  const {
    isAuthenticated,
    sessionExpired
  } = useAuth()

  const handledExpiration = useRef(false)

  useEffect(() => {
    if (sessionExpired && !handledExpiration.current) {
      handledExpiration.current = true

      navigate('/login', {
        replace: true
      })
    }

    if (isAuthenticated && !sessionExpired) {
      handledExpiration.current = false
    }
  }, [
    sessionExpired,
    isAuthenticated,
    navigate
  ])

  const showExpirationAlert =
    sessionExpired &&
    location.pathname === '/login'

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavigationBar />

      <main className="flex-grow-1">
        {showExpirationAlert && (
          <Container className="mt-4">
            <Alert variant="warning" role="alert">
              <Alert.Heading>
                Sesión finalizada
              </Alert.Heading>

              Su sesión ya no es válida o ha caducado.
              Por favor, inicie sesión nuevamente.
            </Alert>
          </Container>
        )}

        <Routes>
          <Route
            path="/"
            element={<Inicio />}
          />

          <Route
            path="/computadoras"
            element={<Computadoras />}
          />

          <Route
            path="/telefonos"
            element={<Telefonos />}
          />

          <Route
            path="/accesorios"
            element={<Accesorios />}
          />

          <Route
            path="/ofertas"
            element={<Ofertas />}
          />

          <Route
            path="/nosotros"
            element={<Nosotros />}
          />

          <Route
            path="/login"
            element={
              <Login key="login" />
            }
          />

          <Route
            path="/registro"
            element={
              <Login
                key="registro"
                registro
              />
            }
          />

          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            }
          />

          <Route
            path="/administracion"
            element={
              <ProtectedRoute admin>
                <Administracion />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}
