import { useState } from 'react'

import {
  Container,
  Form,
  Button,
  Alert,
  Spinner,
  Table,
  Modal,
  Row,
  Col,
  Badge
} from 'react-bootstrap'

import useProducts from '../hooks/useProducts.js'

import {
  api,
  money
} from '../services/api.js'

const empty = {
  nombre: '',
  descripcion: '',
  categoria: 'computadoras',
  precio: '',
  precioAnterior: 0,
  stock: 0,
  detalles: '',
  procesador: '',
  ram: '',
  almacenamiento: '',
  camara: '',
  red: '',
  etiqueta: 'Disponible',
  destacado: false,
  oferta: false
}

const texts = {
  nombre: 'Nombre',
  descripcion: 'Descripción',
  detalles: 'Características',
  procesador: 'Procesador',
  ram: 'Memoria RAM',
  almacenamiento: 'Almacenamiento',
  camara: 'Cámara',
  red: 'Conectividad',
  etiqueta: 'Etiqueta'
}

export default function Administracion() {
  const [revision, setRevision] = useState(0)
  const [input, setInput] = useState('')
  const [search, setSearch] = useState('')

  const {
    products,
    loading,
    error
  } = useProducts(
    new URLSearchParams({
      q: search
    }).toString(),
    revision
  )

  const [form, setForm] = useState(null)
  const [id, setId] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [busy, setBusy] = useState(false)
  const [failure, setFailure] = useState('')
  const [message, setMessage] = useState('')

  function edit(product) {
    setId(product?._id || null)

    setForm(
      product
        ? Object.fromEntries(
            Object.keys(empty).map(key => [
              key,
              product[key] ?? empty[key]
            ])
          )
        : { ...empty }
    )

    setFailure('')
    setMessage('')
  }

  function change(event) {
    const {
      name,
      value,
      type,
      checked
    } = event.target

    setForm({
      ...form,

      [name]:
        type === 'checkbox'
          ? checked
          : value
    })
  }

  async function save(event) {
    event.preventDefault()

    setBusy(true)
    setFailure('')

    try {
      const body = {
        ...form,
        precio: Number(form.precio),
        precioAnterior:
          Number(form.precioAnterior),
        stock: Number(form.stock)
      }

      await api(
        id
          ? `/recursos/${id}`
          : '/recursos',
        {
          method: id ? 'PUT' : 'POST',
          body
        }
      )

      setMessage(
        id
          ? 'Producto actualizado.'
          : 'Producto creado.'
      )

      setForm(null)
      setRevision(revision + 1)
    } catch (err) {
      setFailure(err.message)
    } finally {
      setBusy(false)
    }
  }

  async function remove() {
    setBusy(true)
    setFailure('')

    try {
      await api(
        `/recursos/${deleting._id}`,
        {
          method: 'DELETE'
        }
      )

      setMessage('Producto eliminado.')
      setDeleting(null)
      setRevision(revision + 1)
    } catch (err) {
      setFailure(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <Container className="py-5">
      <div className="d-flex flex-wrap justify-content-between gap-3 mb-4">
        <div>
          <h1>Administrar productos</h1>

          <p>
            Actualiza el catálogo de NovaTech Store.
          </p>
        </div>

        <div>
          <Button
            onClick={() => edit(null)}
          >
            Nuevo producto
          </Button>
        </div>
      </div>

      {message && (
        <Alert
          variant="success"
          dismissible
          onClose={() => setMessage('')}
        >
          {message}
        </Alert>
      )}

      <Form
        className="d-flex gap-2 mb-4"
        onSubmit={event => {
          event.preventDefault()
          setSearch(input.trim())
          setRevision(revision + 1)
        }}
      >
        <Form.Control
          aria-label="Buscar productos"
          placeholder="Buscar productos"
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
          {' '}Cargando...
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

      {!loading && !error && (
        products.length ? (
          <Table
            responsive
            striped
            bordered
            hover
          >
            <thead className="table-dark">
              <tr>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {products.map(p => (
                <tr key={p._id}>
                  <td>
                    {p.nombre}{' '}

                    {p.oferta && (
                      <Badge bg="danger">
                        Oferta
                      </Badge>
                    )}
                  </td>

                  <td>{p.categoria}</td>
                  <td>{money(p.precio)}</td>
                  <td>{p.stock}</td>

                  <td>
                    <div className="d-flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => edit(p)}
                      >
                        Editar
                      </Button>

                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => {
                          setDeleting(p)
                          setFailure('')
                          setMessage('')
                        }}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Alert variant="info">
            No hay productos para mostrar.
          </Alert>
        )
      )}

      <Modal
        show={form !== null}
        onHide={() =>
          !busy && setForm(null)
        }
        size="lg"
        backdrop="static"
      >
        <Modal.Header closeButton={!busy}>
          <Modal.Title>
            {id
              ? 'Editar producto'
              : 'Nuevo producto'}
          </Modal.Title>
        </Modal.Header>

        {form && (
          <Form onSubmit={save}>
            <Modal.Body>
              {failure && (
                <Alert variant="danger">
                  {failure}
                </Alert>
              )}

              <Row className="g-3">
                {Object.entries(texts).map(
                  ([name, label]) => (
                    <Col
                      key={name}
                      md={
                        [
                          'descripcion',
                          'detalles'
                        ].includes(name)
                          ? 12
                          : 6
                      }
                    >
                      <Form.Group
                        controlId={`product-${name}`}
                      >
                        <Form.Label>
                          {label}
                        </Form.Label>

                        <Form.Control
                          name={name}
                          value={form[name]}
                          onChange={change}
                          required={
                            [
                              'nombre',
                              'descripcion'
                            ].includes(name)
                          }
                          as={
                            [
                              'descripcion',
                              'detalles'
                            ].includes(name)
                              ? 'textarea'
                              : 'input'
                          }
                          maxLength={
                            name === 'descripcion'
                              ? 1000
                              : name === 'detalles'
                                ? 2000
                                : name === 'nombre'
                                  ? 120
                                  : name === 'etiqueta'
                                    ? 60
                                    : 100
                          }
                        />
                      </Form.Group>
                    </Col>
                  )
                )}

                <Col md={6}>
                  <Form.Group
                    controlId="product-category"
                  >
                    <Form.Label>
                      Categoría
                    </Form.Label>

                    <Form.Select
                      name="categoria"
                      value={form.categoria}
                      onChange={change}
                    >
                      {[
                        'computadoras',
                        'telefonos',
                        'accesorios',
                        'combos'
                      ].map(category => (
                        <option
                          key={category}
                          value={category}
                        >
                          {category}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                {Object.entries({
                  precio: 'Precio (Q)',
                  precioAnterior:
                    'Precio anterior (Q)',
                  stock:
                    'Unidades disponibles'
                }).map(([name, label]) => (
                  <Col md={4} key={name}>
                    <Form.Group
                      controlId={`product-${name}`}
                    >
                      <Form.Label>
                        {label}
                      </Form.Label>

                      <Form.Control
                        type="number"
                        name={name}
                        required
                        min="0"
                        max="1000000"
                        step={
                          name === 'stock'
                            ? '1'
                            : '0.01'
                        }
                        value={form[name]}
                        onChange={change}
                      />
                    </Form.Group>
                  </Col>
                ))}

                <Col md={6}>
                  <Form.Check
                    id="product-featured"
                    type="checkbox"
                    name="destacado"
                    label="Mostrar en productos destacados"
                    checked={form.destacado}
                    onChange={change}
                  />
                </Col>

                <Col md={6}>
                  <Form.Check
                    id="product-sale"
                    type="checkbox"
                    name="oferta"
                    label="Mostrar en ofertas"
                    checked={form.oferta}
                    onChange={change}
                  />
                </Col>
              </Row>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary"
                disabled={busy}
                onClick={() => setForm(null)}
              >
                Cancelar
              </Button>

              <Button
                type="submit"
                disabled={busy}
              >
                {busy
                  ? 'Guardando...'
                  : 'Guardar producto'}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Modal>

      <Modal
        show={!!deleting}
        onHide={() =>
          !busy && setDeleting(null)
        }
        backdrop="static"
      >
        <Modal.Header closeButton={!busy}>
          <Modal.Title>
            Eliminar producto
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {failure && (
            <Alert variant="danger">
              {failure}
            </Alert>
          )}

          ¿Deseas eliminar{' '}
          <strong>
            {deleting?.nombre}
          </strong>
          ? Esta acción elimina el registro
          del catálogo.
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            disabled={busy}
            onClick={() => setDeleting(null)}
          >
            Cancelar
          </Button>

          <Button
            variant="danger"
            disabled={busy}
            onClick={remove}
          >
            {busy
              ? 'Eliminando...'
              : 'Confirmar eliminación'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}