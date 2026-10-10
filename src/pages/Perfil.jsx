import {
  useEffect,
  useState
} from 'react'

import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  ListGroup,
  Button,
  Alert,
  Spinner
} from 'react-bootstrap'

import {
  Link,
  useNavigate
} from 'react-router-dom'

import {
  useAuth
} from '../context/AuthContext.jsx'

export default function Perfil() {
  const {
    user,
    logout,
    refreshProfile
  } = useAuth()

  const [status, setStatus] = useState({
    loading: true,
    error: ''
  })

  const [retry, setRetry] = useState(0)

  const navigate = useNavigate()

  useEffect(() => {
    const controller =
      new AbortController()

    setStatus({
      loading: true,
      error: ''
    })

    refreshProfile(
      controller.signal
    )
      .then(() => {
        setStatus({
          loading: false,
          error: ''
        })
      })
      .catch(error => {
        if (
          error.name !== 'AbortError'
        ) {
          setStatus({
            loading: false,
            error: error.message
          })
        }
      })

    return () => controller.abort()
  }, [refreshProfile, retry])

  const date = value => {
    return value
      ? new Date(value).toLocaleString('es-GT')
      : 'Sin registro'
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={9} lg={7}>
          <Card className="shadow border-0">
            <Card.Header className="bg-dark text-white py-3">
              <h3 className="mb-0">
                Mi Perfil
              </h3>
            </Card.Header>

            <Card.Body className="p-4">
              {status.loading ? (
                <p>
                  <Spinner
                    animation="border"
                    size="sm"
                  />
                  {' '}Consultando tu perfil...
                </p>
              ) : status.error ? (
                <Alert variant="danger">
                  {status.error}

                  <Button
                    className="ms-2"
                    size="sm"
                    onClick={() =>
                      setRetry(retry + 1)
                    }
                  >
                    Reintentar
                  </Button>
                </Alert>
              ) : (
                <>
                  <div className="text-center mb-4">
                    <div
                      className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                      style={{
                        width: 90,
                        height: 90,
                        fontSize: '2rem'
                      }}
                    >
                      {user?.name
                        ?.charAt(0)
                        ?.toUpperCase()}
                    </div>

                    <h2>{user?.name}</h2>

                    <Badge
                      bg="primary"
                      className="me-2"
                    >
                      {user?.role}
                    </Badge>

                    <Badge bg="success">
                      Membresía {user?.membership}
                    </Badge>
                  </div>

                  <ListGroup className="mb-4">
                    <ListGroup.Item>
                      <strong>Nombre:</strong>
                      {' '}{user?.name}
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <strong>Correo:</strong>
                      {' '}{user?.email}
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <strong>Registro:</strong>
                      {' '}{date(user?.createdAt)}
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <strong>Último acceso:</strong>
                      {' '}{date(user?.lastLogin)}
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <strong>Actualización:</strong>
                      {' '}{date(user?.updatedAt)}
                    </ListGroup.Item>
                  </ListGroup>

                  {user?.role === 'admin' && (
                    <Button
                      as={Link}
                      to="/administracion"
                      className="w-100 mb-3"
                    >
                      Administrar productos
                    </Button>
                  )}
                </>
              )}

              <Button
                variant="danger"
                className="w-100"
                onClick={() => {
                  logout()
                  navigate('/')
                }}
              >
                Cerrar Sesión
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}