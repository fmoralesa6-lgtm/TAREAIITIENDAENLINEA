import {
  Container
} from 'react-bootstrap'

import Catalogo from '../components/Catalogo.jsx'

export default function Ofertas() {
  return (
    <Container className="py-5">
      <h1 className="mb-3">
        Ofertas
      </h1>

      <p>
        Aprovecha nuestras promociones disponibles.
      </p>

      <Catalogo oferta />
    </Container>
  )
}