import jwt from 'jsonwebtoken'

import User from '../models/User.js'
import { fail } from '../utils/errors.js'

export async function protect(
  req,
  res,
  next
) {
  const authorization =
    req.headers.authorization || ''

  if (!authorization.startsWith('Bearer ')) {
    fail(
      401,
      'Inicia sesión para continuar.'
    )
  }

  let payload

  try {
    payload = jwt.verify(
      authorization.slice(7),
      process.env.JWT_SECRET,
      {
        algorithms: ['HS256']
      }
    )
  } catch {
    fail(
      401,
      'Tu sesión no es válida o ha vencido. Inicia sesión nuevamente.'
    )
  }

  if (
    typeof payload.sub !== 'string' ||
    !/^[a-f0-9]{24}$/i.test(payload.sub)
  ) {
    fail(401, 'Sesión no válida.')
  }

  req.user = await User.findById(
    payload.sub
  )

  if (!req.user) {
    fail(
      401,
      'El usuario ya no existe.'
    )
  }

  next()
}

export function adminOnly(
  req,
  res,
  next
) {
  if (req.user.role !== 'admin') {
    fail(
      403,
      'Esta operación requiere una cuenta administradora.'
    )
  }

  next()
}