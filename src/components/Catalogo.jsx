import { useState } from 'react'

import {
  Form,
  Button,
  Alert,
  Spinner,
  Row,
  Col,
  Card,
  Badge,
  ListGroup,
  Table
} from 'react-bootstrap'

import useProducts from '../hooks/useProducts.js'
import ProductDetail from './ProductDetail.jsx'

import {
  money
} from '../services/api.js'

export default function Catalogo({
  categoria = '',
  oferta = false,
  destacado = false,
  tabla = false
}) {
  const [input, setInput] = useState('')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [revision, setRevision] = useState(0)

  const params = new URLSearchParams()

  if (categoria) {
    params.set('categoria', categoria)
  }

  if (oferta) {
    params.set('oferta', 'true')
  }

  if (destacado) {
    params.set('destacado', 'true')
  }

  if (search) {
    params.set('q', search)
  }

  const {
    products,
    loading,
    error
  } = useProducts(
    params.toString(),
    revision
  )

  return (
    <>
      <Form
        className="d-flex gap-2 my-4"
        onSubmit={event => {
          event.preventDefault()
          setSearch(input.trim())
          setRevision(revision + 1)
        }}
      >
        <Form.Control
          aria-label="Buscar productos"
          placeholder="Buscar por nombre o descripción"
          maxLength={100}
          value={input}
          onChange={event =>
            setInput(event.target.value)
          }
        />

        <Button type="submit">
          Buscar
        </Button>
      </Form>

      {loading && (
        <p role="status">
          <Spinner
            size="sm"
            animation="border"
          />
          {' '}Cargando productos...
        </p>
      )}

      {error && (
        <Alert variant="danger">
          {error}

          <Button
            size="sm"
            className="ms-2"
            onClick={() =>
              setRevision(revision + 1)
            }
          >
            Reintentar
          </Button>
        </Alert>
      )}

      {!loading &&
        !error &&
        products.length === 0 && (
          <Alert variant="info">
            No hay productos para esta búsqueda.
          </Alert>
        )}

      {!loading &&
        !error &&
        tabla &&
        products.length > 0 && (
          <Table
            responsive
            striped
            bordered
            hover
          >
            <thead className="table-dark">
              <tr>
                <th>Modelo</th>
                <th>Procesador</th>
                <th>RAM</th>
                <th>Almacenamiento</th>
                <th>Precio</th>
                <th>Estado</th>
                <th>Detalle</th>
              </tr>
            </thead>

            <tbody>
              {products.map(p => (
                <tr key={p._id}>
                  <td>{p.nombre}</td>
                  <td>{p.procesador || '—'}</td>
                  <td>{p.ram || '—'}</td>
                  <td>{p.almacenamiento || '—'}</td>
                  <td>{money(p.precio)}</td>

                  <td>
                    <Badge
                      bg={
                        p.stock
                          ? 'success'
                          : 'secondary'
                      }
                    >
                      {p.stock
                        ? `${p.stock} disponibles`
                        : 'Agotado'}
                    </Badge>
                  </td>

                  <td>
                    <Button
                      size="sm"
                      onClick={() =>
                        setSelected(p._id)
                      }
                    >
                      Ver producto
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

      {!loading &&
        !error &&
        !tabla && (
          <Row
            xs={1}
            md={2}
            lg={3}
            className="g-4"
          >
            {products.map(p => (
              <Col key={p._id}>
                <Card className="h-100 shadow-sm">
                  <Card.Body className="d-flex flex-column">
                    <div>
                      <Badge
                        bg={
                          p.oferta
                            ? 'danger'
                            : 'primary'
                        }
                        className="mb-3"
                      >
                        {p.oferta
                          ? 'Oferta'
                          : p.etiqueta}
                      </Badge>
                    </div>

                    <Card.Title>
                      {p.nombre}
                    </Card.Title>

                    <Card.Text>
                      {p.descripcion}
                    </Card.Text>

                    <div className="mt-auto">
                      {p.oferta && (
                        <del>
                          {money(p.precioAnterior)}
                        </del>
                      )}

                      <h4 className="text-primary">
                        {money(p.precio)}
                      </h4>

                      <p className="text-muted">
                        Disponibles: {p.stock}
                      </p>

                      <Button
                        onClick={() =>
                          setSelected(p._id)
                        }
                      >
                        Ver producto
                      </Button>
                    </div>
                  </Card.Body>

                  {p.categoria === 'telefonos' && (
                    <ListGroup variant="flush">
                      {[
                        'almacenamiento',
                        'ram',
                        'camara',
                        'red'
                      ]
                        .filter(key => p[key])
                        .map(key => (
                          <ListGroup.Item key={key}>
                            {key.toUpperCase()}: {p[key]}
                          </ListGroup.Item>
                        ))}
                    </ListGroup>
                  )}
                </Card>
              </Col>
            ))}
          </Row>
        )}

      {selected && (
        <ProductDetail
          key={selected}
          id={selected}
          onHide={() =>
            setSelected(null)
          }
        />
      )}
    </>
  )
}