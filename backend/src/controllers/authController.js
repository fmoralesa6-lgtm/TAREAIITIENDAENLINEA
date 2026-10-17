import jwt from 'jsonwebtoken'

import User from '../models/User.js'

import {
  hashPassword,
  verifyPassword
} from '../utils/password.js'

import { fail } from '../utils/errors.js'

export function publicUser(user) {
  return {
    _id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    membership: user.membership,
    lastLogin: user.lastLogin,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }
}

function result(user) {
  const secret = process.env.JWT_SECRET
  const expiresIn = process.env.JWT_EXPIRES_IN

  if (!secret || !expiresIn) {
    throw new Error(
      'JWT_SECRET o JWT_EXPIRES_IN no está configurado.'
    )
  }

  if (expiresIn !== '300s') {
    throw new Error(
      'JWT_EXPIRES_IN debe configurarse en 300s.'
    )
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    secret,
    {
      subject: user.id,
      expiresIn,
      algorithm: 'HS256'
    }
  )

  return {
    user: publicUser(user),
    token
  }
}

function credentials(body) {
  if (
    !body ||
    typeof body.email !== 'string' ||
    typeof body.password !== 'string'
  ) {
    fail(
      400,
      'Ingresa correo y contraseña.'
    )
  }

  const email = body.email.trim().toLowerCase()

  if (
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    fail(
      400,
      'El correo no es válido.'
    )
  }

  if (
    body.password.length < 8 ||
    body.password.length > 128
  ) {
    fail(
      400,
      'La contraseña debe tener entre 8 y 128 caracteres.'
    )
  }

  return {
    email,
    password: body.password
  }
}

export async function register(req, res) {
  const {
    email,
    password
  } = credentials(req.body)

  const name =
    typeof req.body.name === 'string'
      ? req.body.name.trim()
      : ''

  if (
    name.length < 3 ||
    name.length > 100
  ) {
    fail(
      400,
      'El nombre debe tener entre 3 y 100 caracteres.'
    )
  }

  if (await User.exists({ email })) {
    fail(
      409,
      'Ya existe una cuenta con este correo.'
    )
  }

  const user = await User.create({
    name,
    email,
    password: await hashPassword(password),
    role: 'cliente',
    lastLogin: new Date()
  })

  res.status(201).json(result(user))
}

export async function login(req, res) {
  const {
    email,
    password
  } = credentials(req.body)

  const user = await User.findOne({
    email
  }).select('+password')

  if (
    !user ||
    !(await verifyPassword(
      password,
      user.password
    ))
  ) {
    fail(
      401,
      'Correo o contraseña incorrectos.'
    )
  }

  user.lastLogin = new Date()

  await user.save()

  res.status(200).json(result(user))
}

export async function me(req, res) {
  res.status(200).json({
    user: publicUser(req.user)
  })
}