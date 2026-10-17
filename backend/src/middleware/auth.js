
import jwt from 'jsonwebtoken'

import User from '../models/User.js'
import { fail } from '../utils/errors.js'

export async function protect(req, res, next) {
  try {
    const authorization = req.headers.authorization || ''

    if (!/^Bearer\s+\S+$/i.test(authorization)) {
      return res.status(401).json({
        error: 'unauthorized',
        message: 'Inicia sesión para continuar.'
      })
    }

    const token = authorization.replace(/^Bearer\s+/i, '')

    let payload

    try {
      payload = jwt.verify(
        token,
        process.env.JWT_SECRET,
        {
          algorithms: ['HS256']
        }
      )
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({
          error: 'token_expired',
          message: 'La sesión ha expirado o ya no es válida. Por favor, inicie sesión nuevamente.'
        })
      }

      return res.status(401).json({
        error: 'invalid_token',
        message: 'La sesión no es válida. Por favor, inicie sesión nuevamente.'
      })
    }

    if (
      typeof payload !== 'object' ||
      typeof payload.sub !== 'string' ||
      !/^[a-f0-9]{24}$/i.test(payload.sub)
    ) {
      return res.status(401).json({
        error: 'invalid_token',
        message: 'La sesión no es válida.'
      })
    }

    const user = await User.findById(payload.sub)

    if (!user) {
      return res.status(401).json({
        error: 'invalid_token',
        message: 'El usuario ya no existe.'
      })
    }

    req.user = user

    return next()
  } catch (error) {
    return next(error)
  }
}

export function adminOnly(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    fail(
      403,
      'Esta operación requiere una cuenta administradora.'
    )
  }

  next()
}
