import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Badge
} from 'react-bootstrap'

function Telefonos() {

  const telefonos = [
    {
      nombre: 'Nova X',
      precio: 'Q3,299',
      almacenamiento: '128 GB',
      ram: '8 GB',
      camara: '50 MP',
      red: '5G'
    },
    {
      nombre: 'Nova X Pro',
      precio: 'Q4,899',
      almacenamiento: '256 GB',
      ram: '12 GB',
      camara: '108 MP',
      red: '5G'
    },
    {
      nombre: 'Nova Lite',
      precio: 'Q1,899',
      almacenamiento: '128 GB',
      ram: '6 GB',
      camara: '48 MP',
      red: '4G'
    }
  ]

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

      <Row
        xs={1}
        md={2}
        lg={3}
        className="g-4 mt-3"
      >

        {telefonos.map((telefono, index) => (

          <Col key={telefono.nombre}>

            <Card className="h-100">

              <Card.Body>

                <div className="d-flex justify-content-between">

                  <Card.Title>
                    {telefono.nombre}
                  </Card.Title>

                  {index === 1 && (
                    <Badge bg="danger">
                      PRO
                    </Badge>
                  )}

                </div>

                <Card.Subtitle className="text-primary fs-4 mt-2">

                  {telefono.precio}

                </Card.Subtitle>

              </Card.Body>

              <ListGroup variant="flush">

                <ListGroup.Item>
                  Almacenamiento: {telefono.almacenamiento}
                </ListGroup.Item>

                <ListGroup.Item>
                  Memoria RAM: {telefono.ram}
                </ListGroup.Item>

                <ListGroup.Item>
                  Cámara: {telefono.camara}
                </ListGroup.Item>

                <ListGroup.Item>
                  Conectividad: {telefono.red}
                </ListGroup.Item>

              </ListGroup>

            </Card>

          </Col>

        ))}

      </Row>

    </Container>
  )
}

export default Telefonos