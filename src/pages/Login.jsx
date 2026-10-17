
import { useState } from 'react'

import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner
} from 'react-bootstrap'

import {
  useNavigate,
  Link
} from 'react-router-dom'

import {
  useAuth
} from '../context/AuthContext.jsx'

export default function Login({
  registro = false
}) {
  const [fields, setFields] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [error, setError] = useState('')

  const {
    login,
    register,
    loading,
    error: sessionError,
    sessionExpired
  } = useAuth()

  const navigate = useNavigate()

  const change = event => {
    const { name, value } = event.target

    setFields(previous => ({
      ...previous,
      [name]: value
    }))

    if (error) {
      setError('')
    }
  }

  async function submit(event) {
    event.preventDefault()

    if (loading) {
      return
    }

    setError('')

    try {
      if (registro) {
        await register({
          name: fields.name.trim(),
          email: fields.email.trim(),
          password: fields.password
        })
      } else {
        await login({
          email: fields.email.trim(),
          password: fields.password
        })
      }

      navigate('/perfil', {
        replace: true
      })
    } catch (err) {
      setError(
        err.message ||
        'Ocurrió un error. Intenta nuevamente.'
      )
    }
  }

  const showError =
    error ||
    (!sessionExpired ? sessionError : '')

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={5}>
          <Card className="shadow border-0">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h2>
                  {registro
                    ? 'Crear cuenta'
                    : 'Iniciar Sesión'}
                </h2>

                <p className="text-muted">
                  Tu cuenta de NovaTech Store
                </p>
              </div>

              {showError && (
                <Alert
                  variant="danger"
                  role="alert"
                  className="mb-4"
                >
                  {showError}
                </Alert>
              )}

              <Form onSubmit={submit}>
                {registro && (
                  <Form.Group
                    className="mb-3"
                    controlId="name"
                  >
                    <Form.Label>
                      Nombre completo
                    </Form.Label>

                    <Form.Control
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Ingrese su nombre completo"
                      required
                      minLength={3}
                      maxLength={100}
                      value={fields.name}
                      onChange={change}
                      disabled={loading}
                    />
                  </Form.Group>
                )}

                <Form.Group
                  className="mb-3"
                  controlId="email"
                >
                  <Form.Label>
                    Correo electrónico
                  </Form.Label>

                  <Form.Control
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Ingrese su correo electrónico"
                    required
                    maxLength={254}
                    value={fields.email}
                    onChange={change}
                    disabled={loading}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-4"
                  controlId="password"
                >
                  <Form.Label>
                    Contraseña
                  </Form.Label>

                  <Form.Control
                    name="password"
                    type="password"
                    autoComplete={
                      registro
                        ? 'new-password'
                        : 'current-password'
                    }
                    placeholder="Ingrese su contraseña"
                    required
                    minLength={8}
                    maxLength={128}
                    value={fields.password}
                    onChange={change}
                    disabled={loading}
                  />

                  <Form.Text className="text-muted">
                    Entre 8 y 128 caracteres.
                  </Form.Text>
                </Form.Group>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-100"
                >
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        size="sm"
                        animation="border"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Procesando...
                    </>
                  ) : (
                    registro
                      ? 'Registrarme'
                      : 'Iniciar Sesión'
                  )}
                </Button>
              </Form>

              <p className="text-center mt-3 mb-0">
                <Link
                  to={
                    registro
                      ? '/login'
                      : '/registro'
                  }
                  onClick={() => setError('')}
                >
                  {registro
                    ? 'Ya tengo una cuenta'
                    : 'Crear una cuenta'}
                </Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
