import Recurso from '../models/Recurso.js'
import { fail } from '../utils/errors.js'

const strings = [
  'nombre',
  'descripcion',
  'categoria',
  'detalles',
  'procesador',
  'ram',
  'almacenamiento',
  'camara',
  'red',
  'etiqueta'
]

const numbers = [
  'precio',
  'precioAnterior',
  'stock'
]

const booleans = [
  'destacado',
  'oferta'
]

function bodyData(body) {
  if (
    !body ||
    typeof body !== 'object' ||
    Array.isArray(body)
  ) {
    fail(
      400,
      'Envía los datos del producto.'
    )
  }

  const data = {}

  for (
    const key of [
      ...strings,
      ...numbers,
      ...booleans
    ]
  ) {
    if (body[key] === undefined) {
      continue
    }

    const value = body[key]

    if (
      strings.includes(key) &&
      typeof value !== 'string'
    ) {
      fail(
        400,
        `${key} debe ser texto.`
      )
    }

    if (
      numbers.includes(key) &&
      (
        typeof value !== 'number' ||
        !Number.isFinite(value)
      )
    ) {
      fail(
        400,
        `${key} debe ser numérico.`
      )
    }

    if (
      booleans.includes(key) &&
      typeof value !== 'boolean'
    ) {
      fail(
        400,
        `${key} debe ser verdadero o falso.`
      )
    }

    data[key] = value
  }

  if (!Object.keys(data).length) {
    fail(
      400,
      'No hay campos válidos para guardar.'
    )
  }

  return data
}

function checkPrices(data) {
  if (
    data.oferta &&
    !(data.precioAnterior > data.precio)
  ) {
    fail(
      400,
      'En una oferta el precio anterior debe ser mayor que el actual.'
    )
  }
}

export function validId(
  req,
  res,
  next
) {
  if (!/^[a-f0-9]{24}$/i.test(req.params.id)) {
    fail(
      400,
      'El identificador del producto no es válido.'
    )
  }

  next()
}

export async function list(
  req,
  res
) {
  const filter = {}

  const allowed = [
    'categoria',
    'oferta',
    'destacado',
    'q'
  ]

  if (
    Object.keys(req.query).some(
      key => !allowed.includes(key)
    )
  ) {
    fail(
      400,
      'Parámetro de búsqueda no válido.'
    )
  }

  if (req.query.categoria !== undefined) {
    const categories = [
      'computadoras',
      'telefonos',
      'accesorios',
      'combos'
    ]

    if (
      !categories.includes(
        req.query.categoria
      )
    ) {
      fail(
        400,
        'Categoría no válida.'
      )
    }

    filter.categoria =
      req.query.categoria
  }

  for (
    const key of [
      'oferta',
      'destacado'
    ]
  ) {
    if (req.query[key] !== undefined) {
      if (
        !['true', 'false'].includes(
          req.query[key]
        )
      ) {
        fail(
          400,
          `Filtro ${key} no válido.`
        )
      }

      filter[key] =
        req.query[key] === 'true'
    }
  }

  if (req.query.q !== undefined) {
    if (
      typeof req.query.q !== 'string' ||
      req.query.q.length > 100
    ) {
      fail(
        400,
        'La búsqueda admite hasta 100 caracteres.'
      )
    }

    const text = req.query.q
      .trim()
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

    filter.$or = [
      {
        nombre: {
          $regex: text,
          $options: 'i'
        }
      },
      {
        descripcion: {
          $regex: text,
          $options: 'i'
        }
      }
    ]
  }

  const products = await Recurso
    .find(filter)
    .sort({
      createdAt: -1,
      _id: -1
    })

  res.json(products)
}

export async function detail(
  req,
  res
) {
  const item = await Recurso.findById(
    req.params.id
  )

  if (!item) {
    fail(
      404,
      'Producto no encontrado.'
    )
  }

  res.json(item)
}

export async function create(
  req,
  res
) {
  const data = bodyData(req.body)

  checkPrices(data)

  const item = await Recurso.create(data)

  res.status(201).json(item)
}

export async function update(
  req,
  res
) {
  const item = await Recurso.findById(
    req.params.id
  )

  if (!item) {
    fail(
      404,
      'Producto no encontrado.'
    )
  }

  item.set(bodyData(req.body))

  checkPrices(item)

  await item.save()

  res.json(item)
}

export async function remove(
  req,
  res
) {
  const item =
    await Recurso.findByIdAndDelete(
      req.params.id
    )

  if (!item) {
    fail(
      404,
      'Producto no encontrado.'
    )
  }

  res.status(204).end()
}