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
    error: sessionError
  } = useAuth()

  const navigate = useNavigate()

  const change = event => {
    setFields({
      ...fields,
      [event.target.name]:
        event.target.value
    })
  }

  async function submit(event) {
    event.preventDefault()
    setError('')

    try {
      if (registro) {
        await register(fields)
      } else {
        await login({
          email: fields.email,
          password: fields.password
        })
      }

      navigate('/perfil')
    } catch (err) {
      setError(err.message)
    }
  }

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

              {(error || sessionError) && (
                <Alert variant="danger">
                  {error || sessionError}
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
                      autoComplete="name"
                      required
                      minLength={3}
                      maxLength={100}
                      value={fields.name}
                      onChange={change}
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
                    required
                    maxLength={254}
                    value={fields.email}
                    onChange={change}
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
                    required
                    minLength={8}
                    maxLength={128}
                    value={fields.password}
                    onChange={change}
                  />

                  <Form.Text>
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
                        size="sm"
                        animation="border"
                      />
                      {' '}Procesando...
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