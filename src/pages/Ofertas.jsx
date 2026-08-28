import {
  Container,
  Alert,
  Row,
  Col,
  Card,
  Badge,
  ProgressBar
} from 'react-bootstrap'

function Ofertas() {

  return (
    <Container className="py-5">

      <h1 className="mb-3">
        Ofertas
      </h1>

      <Alert variant="warning">
        Aprovecha nuestras promociones disponibles por tiempo limitado.
      </Alert>

      <Row className="g-4 mt-2">

        <Col md={6}>

          <Card className="h-100">

            <Card.Body>

              <Badge
                bg="danger"
                className="mb-3"
              >
                20% DESCUENTO
              </Badge>

              <Card.Title>
                Combo Universitario
              </Card.Title>

              <Card.Text>
                Laptop NovaBook Air + Mouse inalámbrico + Mochila para laptop.
              </Card.Text>

              <p>
                <del>Q5,397</del>
              </p>

              <h3 className="text-success">
                Q4,317
              </h3>

              <p className="mt-3">
                Disponibilidad de promoción
              </p>

              <ProgressBar
                now={65}
                label="65%"
              />

            </Card.Body>

          </Card>

        </Col>


        <Col md={6}>

          <Card className="h-100">

            <Card.Body>

              <Badge
                bg="danger"
                className="mb-3"
              >
                15% DESCUENTO
              </Badge>

              <Card.Title>
                Combo Móvil
              </Card.Title>

              <Card.Text>
                Smartphone Nova X + Audífonos Bluetooth.
              </Card.Text>

              <p>
                <del>Q3,798</del>
              </p>

              <h3 className="text-success">
                Q3,228
              </h3>

              <p className="mt-3">
                Disponibilidad de promoción
              </p>

              <ProgressBar
                now={40}
                label="40%"
              />

            </Card.Body>

          </Card>

        </Col>

      </Row>

    </Container>
  )
}

export default Ofertas