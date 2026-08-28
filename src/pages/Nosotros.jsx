import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Badge
} from 'react-bootstrap'

function Nosotros() {

  return (
    <Container className="py-5">

      <div className="text-center mb-5">

        <h1>Sobre NovaTech Store</h1>

        <p className="lead">
          Una tienda en línea dedicada a ofrecer productos
          tecnológicos para estudiantes, profesionales y usuarios
          que buscan innovación y calidad.
        </p>

      </div>

      <Row className="g-4">

        <Col md={6}>

          <Card className="h-100">

            <Card.Body>

              <Badge bg="primary" className="mb-3">
                Nuestra empresa
              </Badge>

              <Card.Title>
                ¿Quiénes somos?
              </Card.Title>

              <Card.Text>
                NovaTech Store es una tienda especializada en
                computadoras, teléfonos y accesorios tecnológicos.
                Nuestro objetivo es brindar productos modernos,
                confiables y accesibles.
              </Card.Text>

            </Card.Body>

          </Card>

        </Col>

        <Col md={6}>

          <Card className="h-100">

            <Card.Body>

              <Badge bg="success" className="mb-3">
                Nuestro compromiso
              </Badge>

              <Card.Title>
                Misión
              </Card.Title>

              <Card.Text>
                Proporcionar soluciones tecnológicas de calidad
                mediante una experiencia de compra sencilla,
                moderna y accesible.
              </Card.Text>

            </Card.Body>

          </Card>

        </Col>

      </Row>

      <Card className="mt-4">

        <Card.Header>
          <strong>¿Por qué comprar con nosotros?</strong>
        </Card.Header>

        <ListGroup variant="flush">

          <ListGroup.Item>
            ✓ Productos tecnológicos de calidad
          </ListGroup.Item>

          <ListGroup.Item>
            ✓ Precios competitivos
          </ListGroup.Item>

          <ListGroup.Item>
            ✓ Garantía en nuestros productos
          </ListGroup.Item>

          <ListGroup.Item>
            ✓ Atención personalizada
          </ListGroup.Item>

          <ListGroup.Item>
            ✓ Compra rápida y segura
          </ListGroup.Item>

        </ListGroup>

      </Card>

    </Container>
  )
}

export default Nosotros