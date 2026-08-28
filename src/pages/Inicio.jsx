import { useState } from 'react'
import { Link } from 'react-router-dom'

import {
  Carousel,
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Modal
} from 'react-bootstrap'

function Inicio() {

  const [mostrarModal, setMostrarModal] = useState(false)

  const [productoSeleccionado, setProductoSeleccionado] = useState(null)

  const productos = [
    {
      nombre: 'Laptop NovaBook Pro',
      descripcion:
        'Computadora ideal para programación, universidad y productividad.',
      precio: 'Q7,499.00',
      etiqueta: 'Destacado',
      color: 'danger',
      detalles:
        'Procesador Intel Core i7, 16 GB de memoria RAM, SSD de 512 GB y pantalla Full HD.'
    },
    {
      nombre: 'Smartphone Nova X',
      descripcion:
        'Smartphone moderno con excelente cámara y conectividad 5G.',
      precio: 'Q3,299.00',
      etiqueta: 'Nuevo',
      color: 'success',
      detalles:
        'Pantalla AMOLED, 8 GB de memoria RAM, 128 GB de almacenamiento y cámara principal de 50 MP.'
    },
    {
      nombre: 'Audífonos AirSound',
      descripcion:
        'Audífonos inalámbricos con micrófono y batería de larga duración.',
      precio: 'Q499.00',
      etiqueta: 'Popular',
      color: 'warning',
      detalles:
        'Conexión Bluetooth, micrófono integrado y hasta 30 horas de duración de batería.'
    }
  ]

  const abrirModal = (producto) => {
    setProductoSeleccionado(producto)
    setMostrarModal(true)
  }

  const cerrarModal = () => {
    setMostrarModal(false)
    setProductoSeleccionado(null)
  }

  const irAProductos = () => {
    const seccionProductos = document.getElementById('productos-destacados')

    if (seccionProductos) {
      seccionProductos.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }

  return (
    <>

      {/* CARRUSEL */}

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


      {/* PRODUCTOS DESTACADOS */}

      <Container
        id="productos-destacados"
        className="py-5"
      >

        <div className="text-center mb-5">

          <h2>
            Productos destacados
          </h2>

          <p>
            Conoce algunos de nuestros productos principales.
          </p>

        </div>


        <Row
          xs={1}
          md={2}
          lg={3}
          className="g-4"
        >

          {productos.map((producto) => (

            <Col key={producto.nombre}>

              <Card className="h-100 shadow-sm">

                <Card.Body className="d-flex flex-column">

                  <div>

                    <Badge
                      bg={producto.color}
                      text={
                        producto.color === 'warning'
                          ? 'dark'
                          : 'light'
                      }
                      className="mb-3"
                    >
                      {producto.etiqueta}
                    </Badge>

                  </div>

                  <Card.Title>
                    {producto.nombre}
                  </Card.Title>

                  <Card.Text>
                    {producto.descripcion}
                  </Card.Text>

                  <div className="mt-auto">

                    <h4 className="text-primary">
                      {producto.precio}
                    </h4>

                    <Button
                      variant="primary"
                      onClick={() => abrirModal(producto)}
                    >
                      Ver producto
                    </Button>

                  </div>

                </Card.Body>

              </Card>

            </Col>

          ))}

        </Row>

      </Container>


      {/* MODAL DE DETALLE DEL PRODUCTO */}

      <Modal
        show={mostrarModal}
        onHide={cerrarModal}
        centered
      >

        <Modal.Header closeButton>

          <Modal.Title>
            {productoSeleccionado?.nombre}
          </Modal.Title>

        </Modal.Header>

        <Modal.Body>

          <p>
            {productoSeleccionado?.descripcion}
          </p>

          <hr />

          <h5>
            Características
          </h5>

          <p>
            {productoSeleccionado?.detalles}
          </p>

          <h4 className="text-primary">
            {productoSeleccionado?.precio}
          </h4>

        </Modal.Body>

        <Modal.Footer>

          <Button
            variant="secondary"
            onClick={cerrarModal}
          >
            Cerrar
          </Button>

          <Button variant="success">
            Agregar al carrito
          </Button>

        </Modal.Footer>

      </Modal>

    </>
  )
}

export default Inicio