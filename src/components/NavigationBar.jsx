import {
  Container,
  Nav,
  Navbar,
  Button,
  Badge
} from 'react-bootstrap'

import {
  NavLink,
  useNavigate
} from 'react-router-dom'

import {
  useAuth
} from '../context/AuthContext.jsx'

export default function NavigationBar() {
  const {
    isAuthenticated,
    user,
    logout
  } = useAuth()

  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      expand="lg"
    >
      <Container>
        <Navbar.Brand
          as={NavLink}
          to="/"
        >
          NovaTech Store
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="menu-principal"
        />

        <Navbar.Collapse
          id="menu-principal"
        >
          <Nav className="ms-auto">
            <Nav.Link
              as={NavLink}
              to="/"
              end
            >
              Inicio
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/computadoras"
            >
              Computadoras
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/telefonos"
            >
              Teléfonos
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/accesorios"
            >
              Accesorios
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/ofertas"
            >
              Ofertas
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/nosotros"
            >
              Nosotros
            </Nav.Link>

            {!isAuthenticated ? (
              <Nav.Link
                as={NavLink}
                to="/login"
                className="ms-lg-3"
              >
                Iniciar Sesión
              </Nav.Link>
            ) : (
              <>
                {user?.role === 'admin' && (
                  <Nav.Link
                    as={NavLink}
                    to="/administracion"
                  >
                    Administrar
                  </Nav.Link>
                )}

                <Navbar.Text className="ms-lg-3 me-lg-3">
                  Hola,{' '}

                  <strong>
                    {user?.name}
                  </strong>
                  {' '}

                  <Badge bg="primary">
                    {user?.membership}
                  </Badge>
                </Navbar.Text>

                <Nav.Link
                  as={NavLink}
                  to="/perfil"
                >
                  Mi Perfil
                </Nav.Link>

                <div className="d-flex align-items-center ms-lg-2">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </Button>
                </div>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}