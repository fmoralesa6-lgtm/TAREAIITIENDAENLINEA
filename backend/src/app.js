import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import {
  rateLimit
} from 'express-rate-limit'

import authRoutes from './routes/authRoutes.js'
import recursoRoutes from './routes/recursoRoutes.js'

const app = express()

app.disable('x-powered-by')

app.use(
  cors({
    origin:
      process.env.CLIENT_ORIGIN ||
      'http://localhost:5173'
  })
)

app.use(
  express.json({
    limit: '32kb'
  })
)

app.get('/api/health', (req, res) => {
  const connected =
    mongoose.connection.readyState === 1

  res
    .status(connected ? 200 : 503)
    .json({
      database: connected
        ? 'conectada'
        : 'desconectada'
    })
})

app.use('/api', (req, res, next) => {
  if (
    mongoose.connection.readyState !== 1
  ) {
    return res.status(503).json({
      message:
        'Base de datos temporalmente no disponible.'
    })
  }

  next()
})

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 50,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    message:
      'Demasiados intentos. Espera 15 minutos e intenta nuevamente.'
  }
})

app.use('/api/auth/login', limiter)
app.use('/api/auth/register', limiter)

app.use('/api/auth', authRoutes)
app.use('/api/recursos', recursoRoutes)

app.use((req, res) => {
  res.status(404).json({
    message: 'Ruta no encontrada.'
  })
})

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error)
  }

  let status = error.status || 500

  let message = error.status
    ? error.message
    : 'No se pudo completar la operación.'

  if (error.code === 11000) {
    status = 409
    message =
      'Ya existe una cuenta con ese correo.'
  }

  if (
    error.name === 'ValidationError' ||
    error.name === 'CastError'
  ) {
    status = 400
    message =
      'Revisa los campos obligatorios, sus límites y los valores numéricos.'
  }

  if (
    error.type === 'entity.parse.failed'
  ) {
    status = 400
    message =
      'El cuerpo JSON no es válido.'
  }

  if (
    error.name?.startsWith('Mongo') &&
    error.code !== 11000
  ) {
    status = 503
    message =
      'No se pudo acceder a la base de datos. Intenta nuevamente.'
  }

  res.status(status).json({
    message
  })
})

export default app