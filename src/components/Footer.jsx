import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
  return (
    <footer className="bg-dark text-white mt-auto py-4">
      <Container>
        <h5 className="text-center mb-4">
          Desarrollado por
        </h5>

        <Row className="text-center">
          {/* Desarrollador 1 */}
          <Col xs={12} md={6} className="mb-4 mb-md-0">
            <h5>
              Fredy Leonel Morales Albizures
            </h5>

            <p className="mb-2">
              Carnet: 9490-23-16408
            </p>

            <p className="mb-0">
              <strong>Módulos:</strong>
              <br />
              Inicio, Computadoras, Teléfonos y Accesorios
            </p>
          </Col>

          {/* Desarrollador 2 */}
          <Col xs={12} md={6}>
            <h5>
              Mauricio Isai Pérez Saban
            </h5>

            <p className="mb-2">
              Carnet: 9490-23-25701
            </p>

            <p className="mb-0">
              <strong>Módulos:</strong>
              <br />
              Ofertas, Nosotros, Navbar y Footer
            </p>
          </Col>
        </Row>

        <hr className="my-4" />

        <div className="text-center">
          <h5>NovaTech Store</h5>

          <p className="mb-2">
            Tienda en línea desarrollada con React y React-Bootstrap.
          </p>

          <p className="mb-0">
            © 2026 NovaTech Store - Desarrollo Web
          </p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
