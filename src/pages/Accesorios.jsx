import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button
} from 'react-bootstrap'

function Accesorios() {

  const accesorios = [
    {
      nombre: 'Teclado mecánico RGB',
      precio: 'Q599',
      descripcion: 'Ideal para programación y videojuegos.',
      etiqueta: 'Más vendido'
    },
    {
      nombre: 'Mouse inalámbrico',
      precio: 'Q249',
      descripcion: 'Diseño ergonómico y conexión estable.',
      etiqueta: 'Disponible'
    },
    {
      nombre: 'Audífonos Bluetooth',
      precio: 'Q499',
      descripcion: 'Audio inalámbrico con micrófono integrado.',
      etiqueta: 'Popular'
    },
    {
      nombre: 'Mochila para laptop',
      precio: 'Q349',
      descripcion: 'Protección para laptops de hasta 15.6 pulgadas.',
      etiqueta: 'Nuevo'
    }
  ]

  return (
    <Container className="py-5">

      <h1 className="mb-3">
        Accesorios
      </h1>

      <p>
        Complementa tus dispositivos con accesorios útiles
        para estudio, trabajo y entretenimiento.
      </p>

      <Row
        xs={1}
        sm={2}
        lg={4}
        className="g-4 mt-3"
      >

        {accesorios.map((accesorio) => (

          <Col key={accesorio.nombre}>

            <Card className="h-100 text-center">

              <Card.Body>

                <Badge
                  bg="secondary"
                  className="mb-3"
                >
                  {accesorio.etiqueta}
                </Badge>

                <Card.Title>
                  {accesorio.nombre}
                </Card.Title>

                <Card.Text>
                  {accesorio.descripcion}
                </Card.Text>

                <h4 className="text-primary">
                  {accesorio.precio}
                </h4>

                <Button variant="primary">
                  Ver producto
                </Button>

              </Card.Body>

            </Card>

          </Col>

        ))}

      </Row>

    </Container>
  )
}

export default Accesorios