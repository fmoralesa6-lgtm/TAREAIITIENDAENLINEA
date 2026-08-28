import { Routes, Route } from 'react-router-dom'

import NavigationBar from './components/NavigationBar'
import Footer from './components/Footer'

import Inicio from './pages/Inicio'
import Computadoras from './pages/Computadoras'
import Telefonos from './pages/Telefonos'
import Accesorios from './pages/Accesorios'
import Ofertas from './pages/Ofertas'
import Nosotros from './pages/Nosotros'

function App() {

  return (
    <>

      {/* Barra de navegación global */}
      <NavigationBar />

      {/* Contenido de las páginas */}
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

      </Routes>

      {/* Pie de página global */}
      <Footer />

    </>
  )
}

export default App