import {
  randomBytes,
  scrypt,
  timingSafeEqual
} from 'node:crypto'

import { promisify } from 'node:util'

const derive = promisify(scrypt)

export async function hashPassword(password) {
  const salt = randomBytes(16).toString('hex')

  const hash = await derive(
    password,
    salt,
    64
  )

  return `${salt}:${hash.toString('hex')}`
}

export async function verifyPassword(
  password,
  stored
) {
  const [salt, hash] = stored.split(':')

  const actual = await derive(
    password,
    salt,
    64
  )

  const expected = Buffer.from(hash, 'hex')

  return (
    expected.length === actual.length &&
    timingSafeEqual(actual, expected)
  )
}