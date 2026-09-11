import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  ListGroup,
  Button
} from 'react-bootstrap'

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function Perfil() {

  const {
    user,
    logout
  } = useAuth()

  const navigate = useNavigate()

  const handleLogout = () => {

    logout()

    navigate('/')
  }

  return (
    <Container className="py-5">

      <Row className="justify-content-center">

        <Col
          xs={12}
          md={9}
          lg={7}
        >

          <Card className="shadow border-0">

            <Card.Header
              className="bg-dark text-white py-3"
            >

              <h3 className="mb-0">
                Mi Perfil
              </h3>

            </Card.Header>

            <Card.Body className="p-4">

              <div className="text-center mb-4">

                <div
                  className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{
                    width: '90px',
                    height: '90px',
                    fontSize: '2rem'
                  }}
                >

                  {user?.name
                    ?.charAt(0)
                    ?.toUpperCase()}

                </div>

                <h2>
                  {user?.name}
                </h2>

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

                  <strong>
                    Nombre:
                  </strong>

                  {' '}
                  {user?.name}

                </ListGroup.Item>

                <ListGroup.Item>

                  <strong>
                    Correo electrónico:
                  </strong>

                  {' '}
                  {user?.email}

                </ListGroup.Item>

                <ListGroup.Item>

                  <strong>
                    Tipo de cliente:
                  </strong>

                  {' '}
                  {user?.role}

                </ListGroup.Item>

                <ListGroup.Item>

                  <strong>
                    Membresía:
                  </strong>

                  {' '}
                  {user?.membership}

                </ListGroup.Item>

                <ListGroup.Item>

                  <strong>
                    Fecha de acceso:
                  </strong>

                  {' '}
                  {user?.loginDate}

                </ListGroup.Item>

              </ListGroup>

              <h4 className="mb-3">
                Historial de pedidos
              </h4>

              <ListGroup className="mb-4">

                {user?.orders?.map(
                  (order) => (

                    <ListGroup.Item
                      key={order.id}
                      className="d-flex justify-content-between align-items-center"
                    >

                      <div>

                        <strong>
                          {order.id}
                        </strong>

                        <br />

                        {order.product}

                      </div>

                      <Badge
                        bg={
                          order.status === 'Entregado'
                            ? 'success'
                            : 'warning'
                        }
                      >

                        {order.status}

                      </Badge>

                    </ListGroup.Item>

                  )
                )}

              </ListGroup>

              <Button
                variant="danger"
                className="w-100"
                onClick={handleLogout}
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

export default Perfil