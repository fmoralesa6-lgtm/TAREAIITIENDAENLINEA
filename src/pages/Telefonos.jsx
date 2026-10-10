import {
  Container
} from 'react-bootstrap'

import Catalogo from '../components/Catalogo.jsx'

export default function Telefonos() {
  return (
    <Container className="py-5">
      <h1 className="mb-3">
        Teléfonos
      </h1>

      <p>
        Conoce nuestra selección de teléfonos
        para comunicación, entretenimiento
        y productividad.
      </p>

      <Catalogo categoria="telefonos" />
    </Container>
  )
}