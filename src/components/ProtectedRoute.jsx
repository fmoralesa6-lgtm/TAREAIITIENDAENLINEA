import { Navigate } from 'react-router-dom'

import {
  Container,
  Spinner,
  Alert
} from 'react-bootstrap'

import {
  useAuth
} from '../context/AuthContext.jsx'

export default function ProtectedRoute({
  children,
  admin = false
}) {
  const {
    isAuthenticated,
    initializing,
    user
  } = useAuth()

  if (initializing) {
    return (
      <Container className="py-5">
        <Spinner
          animation="border"
          role="status"
        />

        <span className="ms-2">
          Verificando sesión...
        </span>
      </Container>
    )
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    )
  }

  if (
    admin &&
    user.role !== 'admin'
  ) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          Esta sección es para administradores.
        </Alert>
      </Container>
    )
  }

  return children
}