import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

function NavigationBar() {

  return (
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      expand="lg"
    >

      <Container>

        <Navbar.Brand as={NavLink} to="/">
          NovaTech Store
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="menu-principal" />

        <Navbar.Collapse id="menu-principal">

          <Nav className="ms-auto">

            <Nav.Link as={NavLink} to="/">
              Inicio
            </Nav.Link>

            <Nav.Link as={NavLink} to="/computadoras">
              Computadoras
            </Nav.Link>

            <Nav.Link as={NavLink} to="/telefonos">
              Teléfonos
            </Nav.Link>

            <Nav.Link as={NavLink} to="/accesorios">
              Accesorios
            </Nav.Link>

            <Nav.Link as={NavLink} to="/ofertas">
              Ofertas
            </Nav.Link>

            <Nav.Link as={NavLink} to="/nosotros">
              Nosotros
            </Nav.Link>

          </Nav>

        </Navbar.Collapse>

      </Container>

    </Navbar>
  )
}

export default NavigationBar