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

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const {
    login,
    loading,
    setLoading
  } = useAuth()

  const navigate = useNavigate()

  const handleSubmit = (event) => {

    event.preventDefault()

    setError('')

    // Validar campos vacíos
    if (
      email.trim() === '' ||
      password.trim() === ''
    ) {
      setError(
        'Debe completar el correo electrónico y la contraseña.'
      )

      return
    }

    // Validación sencilla de correo
    if (!email.includes('@')) {

      setError(
        'Ingrese un correo electrónico válido.'
      )

      return
    }

    setLoading(true)

    // Autenticación simulada
    if (
      email === 'cliente@novatech.com' &&
      password === '123456'
    ) {

      const userData = {

        name: 'Fredy Morales',

        email: email,

        role: 'Cliente',

        membership: 'Premium',

        loginDate:
          new Date().toLocaleString(
            'es-GT'
          ),

        orders: [
          {
            id: 'NT-001',
            product:
              'Laptop ASUS Vivobook',
            status: 'Entregado'
          },
          {
            id: 'NT-002',
            product:
              'Mouse Logitech',
            status: 'Entregado'
          },
          {
            id: 'NT-003',
            product:
              'Audífonos Bluetooth',
            status: 'En proceso'
          }
        ]
      }

      login(userData)

      setLoading(false)

      navigate('/perfil')

    } else {

      setLoading(false)

      setError(
        'Correo o contraseña incorrectos.'
      )
    }
  }

  return (

    <Container className="py-5">

      <Row className="justify-content-center">

        <Col
          xs={12}
          md={8}
          lg={5}
        >

          <Card className="shadow border-0">

            <Card.Body className="p-4">

              <div className="text-center mb-4">

                <h2>
                  Iniciar Sesión
                </h2>

                <p className="text-muted">
                  Ingresa a tu cuenta de
                  NovaTech Store
                </p>

              </div>

              <Alert variant="info">

                <strong>
                  Credenciales de prueba
                </strong>

                <br />

                Correo:
                {' '}
                cliente@novatech.com

                <br />

                Contraseña:
                {' '}
                123456

              </Alert>

              {error && (

                <Alert variant="danger">

                  {error}

                </Alert>

              )}

              <Form onSubmit={handleSubmit}>

                <Form.Group
                  className="mb-3"
                  controlId="email"
                >

                  <Form.Label>
                    Correo electrónico
                  </Form.Label>

                  <Form.Control
                    type="email"
                    placeholder="Ingrese su correo"
                    value={email}
                    onChange={(event) =>
                      setEmail(
                        event.target.value
                      )
                    }
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
                    type="password"
                    placeholder="Ingrese su contraseña"
                    value={password}
                    onChange={(event) =>
                      setPassword(
                        event.target.value
                      )
                    }
                  />

                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={loading}
                >

                  {loading ? (

                    <>
                      <Spinner
                        size="sm"
                        className="me-2"
                      />

                      Iniciando sesión...
                    </>

                  ) : (

                    'Iniciar Sesión'

                  )}

                </Button>

              </Form>

            </Card.Body>

          </Card>

        </Col>

      </Row>

    </Container>
  )
}

export default Login