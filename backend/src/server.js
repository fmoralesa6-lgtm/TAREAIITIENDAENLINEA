import './config/env.js'

import {
  validateEnv
} from './config/env.js'

import {
  connectDB
} from './config/db.js'

import app from './app.js'
import mongoose from 'mongoose'

try {
  validateEnv()

  await connectDB()

  const port = Number(
    process.env.PORT || 4000
  )

  const server = app.listen(
    port,
    () => {
      console.log(
        `API disponible en http://localhost:${port}/api`
      )
    }
  )

  server.on('error', () => {
    console.error(
      'No se pudo abrir el puerto. Revisa PORT.'
    )

    process.exit(1)
  })

  const close = () => {
    server.close(async () => {
      await mongoose.disconnect()
      process.exit(0)
    })
  }

  process.on('SIGINT', close)
  process.on('SIGTERM', close)
} catch {
  console.error(
    'No se inició la API. Revisa backend/.env, las credenciales, la IP autorizada y la conexión a Atlas.'
  )

  process.exit(1)
}