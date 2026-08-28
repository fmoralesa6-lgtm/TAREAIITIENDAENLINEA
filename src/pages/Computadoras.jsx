import {
  Container,
  Table,
  Badge,
  Accordion
} from 'react-bootstrap'

function Computadoras() {

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


      <div className="table-responsive mt-4">

        <Table
          striped
          bordered
          hover
        >

          <thead className="table-dark">

            <tr>

              <th>
                Modelo
              </th>

              <th>
                Procesador
              </th>

              <th>
                RAM
              </th>

              <th>
                Almacenamiento
              </th>

              <th>
                Precio
              </th>

              <th>
                Estado
              </th>

            </tr>

          </thead>


          <tbody>

            <tr>

              <td>
                NovaBook Air
              </td>

              <td>
                Intel Core i5
              </td>

              <td>
                8 GB
              </td>

              <td>
                SSD 256 GB
              </td>

              <td>
                Q4,799
              </td>

              <td>

                <Badge bg="success">
                  Disponible
                </Badge>

              </td>

            </tr>


            <tr>

              <td>
                NovaBook Pro
              </td>

              <td>
                Intel Core i7
              </td>

              <td>
                16 GB
              </td>

              <td>
                SSD 512 GB
              </td>

              <td>
                Q7,499
              </td>

              <td>

                <Badge bg="success">
                  Disponible
                </Badge>

              </td>

            </tr>


            <tr>

              <td>
                Nova Gaming G5
              </td>

              <td>
                AMD Ryzen 7
              </td>

              <td>
                16 GB
              </td>

              <td>
                SSD 1 TB
              </td>

              <td>
                Q9,999
              </td>

              <td>

                <Badge
                  bg="warning"
                  text="dark"
                >
                  Últimas unidades
                </Badge>

              </td>

            </tr>

          </tbody>

        </Table>

      </div>


      <h3 className="mt-5 mb-3">
        Información adicional
      </h3>


      <Accordion>

        <Accordion.Item eventKey="0">

          <Accordion.Header>
            ¿Qué computadora recomendamos para programación?
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
            ¿Qué computadora recomendamos para gaming?
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

export default Computadoras