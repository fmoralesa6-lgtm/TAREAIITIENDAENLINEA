import {
  Container
} from 'react-bootstrap'

import Catalogo from '../components/Catalogo.jsx'

export default function Accesorios() {
  return (
    <Container className="py-5">
      <h1 className="mb-3">
        Accesorios
      </h1>

      <p>
        Complementa tus dispositivos con
        accesorios útiles para estudio,
        trabajo y entretenimiento.
      </p>

      <Catalogo categoria="accesorios" />
    </Container>
  )
}