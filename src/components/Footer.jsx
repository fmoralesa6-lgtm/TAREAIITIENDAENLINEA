import { Container, Row, Col } from 'react-bootstrap'

function Footer() {

  return (
    <footer className="bg-dark text-white mt-auto py-4">

      <Container>

        <Row>

          <Col
            md={6}
            className="mb-3 mb-md-0"
          >

            <h5 className="text-white">
              NovaTech Store
            </h5>

            <p className="text-white mb-0">
              Tienda en línea desarrollada con React
              y React-Bootstrap.
            </p>

          </Col>

          <Col md={6} className="text-md-end">

            <h5 className="text-white">
              Desarrollado por
            </h5>

            <p className="text-white mb-1">
              <strong>Fredy Leonel Morales Albizures</strong>
            </p>

            <p className="text-white mb-1">
              Carnet: 9490-23-16408
            </p>

            <p className="text-white mb-0">
              Módulos: Inicio, Computadoras, Teléfonos,
              Accesorios, Ofertas, Nosotros,
              Navbar y Footer.
            </p>

          </Col>

        </Row>

        <hr />

        <p className="text-center text-white mb-0">
          © 2026 NovaTech Store - Desarrollo Web
        </p>

      </Container>

    </footer>
  )
}

export default Footer