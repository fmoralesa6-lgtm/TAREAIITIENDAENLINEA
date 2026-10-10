import '../config/env.js'
import mongoose from 'mongoose'

import {
  validateEnv
} from '../config/env.js'

import {
  connectDB
} from '../config/db.js'

import User from '../models/User.js'
import Recurso from '../models/Recurso.js'

import {
  hashPassword
} from '../utils/password.js'

import products from './productos.js'

try {
  validateEnv()

  const email =
    process.env.ADMIN_EMAIL
      ?.trim()
      .toLowerCase()

  const password =
    process.env.ADMIN_PASSWORD || ''

  if (
    !email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    password.length < 12 ||
    password.length > 128 ||
    password.startsWith('REEMPLAZAR')
  ) {
    throw new Error(
      'Configura ADMIN_EMAIL y una ADMIN_PASSWORD propia de 12 a 128 caracteres.'
    )
  }

  await connectDB()
  await User.init()

  const existing = await User.findOne({
    email
  })

  if (!existing) {
    await User.create({
      name:
        process.env.ADMIN_NAME ||
        'Administrador NovaTech',

      email,

      password:
        await hashPassword(password),

      role: 'admin'
    })

    console.log(
      'Administrador creado.'
    )
  } else if (
    existing.role !== 'admin'
  ) {
    throw new Error(
      'El correo elegido ya pertenece a un cliente. Elige otro ADMIN_EMAIL; no se cambia su rol automáticamente.'
    )
  } else {
    console.log(
      'El administrador ya existe; se conserva su contraseña.'
    )
  }

  if (
    await Recurso.countDocuments() === 0
  ) {
    await Recurso.insertMany(products)

    console.log(
      'Se crearon 12 productos iniciales.'
    )
  } else {
    console.log(
      'El catálogo ya tiene productos; no se modifica.'
    )
  }
} catch (error) {
  console.error(error.stack)
  console.error('Tipo:', error.name, 'Código:', error.code)
  console.error(
    error.name === 'Error'
      ? error.message
      : 'No se pudo cargar la información. Revisa Atlas y backend/.env.'
  )

  process.exitCode = 1
} finally {
  await mongoose.disconnect()
}