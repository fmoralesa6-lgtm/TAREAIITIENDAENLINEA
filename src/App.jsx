import {
  Routes,
  Route
} from 'react-router-dom'

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
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavigationBar />

      <main className="flex-grow-1">
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