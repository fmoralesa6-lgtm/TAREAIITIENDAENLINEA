import { Link } from 'react-router-dom'

import {
  Carousel,
  Container,
  Button
} from 'react-bootstrap'

import Catalogo from '../components/Catalogo.jsx'

export default function Inicio() {
  const irAProductos = () => {
    document
      .getElementById('productos-destacados')
      ?.scrollIntoView({
        behavior: 'smooth'
      })
  }

  return (
    <>
      <Carousel>
        <Carousel.Item>
          <div
            className="bg-dark text-white d-flex align-items-center justify-content-center"
            style={{ height: '400px' }}
          >
            <div className="text-center">
              <h1 className="text-white">
                Bienvenido a NovaTech Store
              </h1>

              <p className="text-white">
                Encuentra tecnología para estudiar,
                trabajar y disfrutar.
              </p>

              <Button
                variant="primary"
                onClick={irAProductos}
              >
                Ver productos
              </Button>
            </div>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div
            className="bg-primary text-white d-flex align-items-center justify-content-center"
            style={{ height: '400px' }}
          >
            <div className="text-center">
              <h1 className="text-white">
                Computadoras
              </h1>

              <p className="text-white">
                Equipos para universidad,
                programación y productividad.
              </p>

              <Button
                as={Link}
                to="/computadoras"
                variant="light"
              >
                Ver computadoras
              </Button>
            </div>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div
            className="bg-secondary text-white d-flex align-items-center justify-content-center"
            style={{ height: '400px' }}
          >
            <div className="text-center">
              <h1 className="text-white">
                Ofertas especiales
              </h1>

              <p className="text-white">
                Descubre nuestras promociones
                y productos destacados.
              </p>

              <Button
                as={Link}
                to="/ofertas"
                variant="warning"
              >
                Ver ofertas
              </Button>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>

      <Container
        id="productos-destacados"
        className="py-5"
      >
        <div className="text-center mb-5">
          <h2>Productos destacados</h2>

          <p>
            Conoce algunos de nuestros
            productos principales.
          </p>
        </div>

        <Catalogo destacado />
      </Container>
    </>
  )
}