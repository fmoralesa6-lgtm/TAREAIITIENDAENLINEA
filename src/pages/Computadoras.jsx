import {
  Container,
  Accordion
} from 'react-bootstrap'

import Catalogo from '../components/Catalogo.jsx'

export default function Computadoras() {
  return (
    <Container className="py-5">
      <h1 className="mb-4">
        Computadoras
      </h1>

      <p>
        Conoce nuestra variedad de computadoras
        para estudio, trabajo, programación
        y entretenimiento.
      </p>

      <Catalogo
        categoria="computadoras"
        tabla
      />

      <h3 className="mt-5 mb-3">
        Información adicional
      </h3>

      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            ¿Qué computadora recomendamos
            para programación?
          </Accordion.Header>

          <Accordion.Body>
            Para programación y desarrollo web
            recomendamos como mínimo un procesador
            Intel Core i5 o AMD Ryzen 5,
            8 GB de memoria RAM y almacenamiento SSD.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>
            ¿Qué computadora recomendamos
            para gaming?
          </Accordion.Header>

          <Accordion.Body>
            Para videojuegos se recomienda utilizar
            un equipo con al menos 16 GB de RAM,
            procesador Ryzen 7 o Core i7
            y tarjeta gráfica dedicada.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>
            ¿Los equipos incluyen garantía?
          </Accordion.Header>

          <Accordion.Body>
            Sí. Los equipos cuentan con garantía
            según las condiciones establecidas
            por el fabricante.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  )
}