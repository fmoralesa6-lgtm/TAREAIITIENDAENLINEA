import {
  useEffect,
  useState
} from 'react'

import {
  Modal,
  Spinner,
  Alert,
  ListGroup,
  Badge
} from 'react-bootstrap'

import {
  api,
  money
} from '../services/api.js'

export default function ProductDetail({
  id,
  onHide
}) {
  const [state, setState] = useState({
    product: null,
    loading: true,
    error: ''
  })

  useEffect(() => {
    const controller =
      new AbortController()

    api(
      `/recursos/${id}`,
      {
        signal: controller.signal
      }
    )
      .then(product => {
        setState({
          product,
          loading: false,
          error: ''
        })
      })
      .catch(error => {
        if (
          error.name !== 'AbortError'
        ) {
          setState({
            product: null,
            loading: false,
            error: error.message
          })
        }
      })

    return () => controller.abort()
  }, [id])

  const p = state.product

  return (
    <Modal
      show
      onHide={onHide}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {p?.nombre || 'Detalle del producto'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {state.loading && (
          <Spinner
            animation="border"
            role="status"
          />
        )}

        {state.error && (
          <Alert variant="danger">
            {state.error}
          </Alert>
        )}

        {p && (
          <>
            <Badge bg="primary">
              {p.categoria}
            </Badge>

            <p className="mt-3">
              {p.descripcion}
            </p>

            <h5>Características</h5>

            <p>{p.detalles}</p>

            <ListGroup>
              {[
                'procesador',
                'ram',
                'almacenamiento',
                'camara',
                'red'
              ]
                .filter(key => p[key])
                .map(key => (
                  <ListGroup.Item key={key}>
                    {key.toUpperCase()}: {p[key]}
                  </ListGroup.Item>
                ))}

              <ListGroup.Item>
                Unidades disponibles: {p.stock}
              </ListGroup.Item>
            </ListGroup>

            <h4 className="text-primary mt-3">
              {money(p.precio)}
            </h4>
          </>
        )}
      </Modal.Body>
    </Modal>
  )
}