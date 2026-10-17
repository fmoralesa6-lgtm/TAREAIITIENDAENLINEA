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

  console.log('Verificando variables de entorno...')

  console.log('Intentando conectar con MongoDB Atlas...')

  await connectDB()

  console.log('Conexión a MongoDB establecida correctamente.')

  const port = Number(process.env.PORT || 4000)

  const server = app.listen(port, () => {
    console.log('====================================')
    console.log('NOVATECH STORE - BACKEND')
    console.log('====================================')
    console.log(`API disponible en http://localhost:${port}/api`)
    console.log('MongoDB: Conectado')
    console.log('JWT: Configurado')
    console.log('====================================')
  })

  server.on('error', (error) => {
    console.error('Error al iniciar el servidor:', error.message)
    process.exit(1)
  })

  const close = () => {
    server.close(async () => {
      await mongoose.disconnect()
      console.log('Servidor y MongoDB desconectados.')
      process.exit(0)
    })
  }

  process.on('SIGINT', close)
  process.on('SIGTERM', close)

} catch (error) {
  console.error('====================================')
  console.error('ERROR AL INICIAR NOVATECH STORE')
  console.error('====================================')
  console.error('Nombre del error:', error.name)
  console.error('Descripción:', error.message)
  console.error('====================================')

  process.exit(1)
}