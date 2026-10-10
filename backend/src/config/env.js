import dotenv from 'dotenv'
import { fileURLToPath } from 'node:url'

dotenv.config({
  path: fileURLToPath(
    new URL('../../.env', import.meta.url)
  ),
  quiet: true
})

export function validateEnv() {
  if (
    !process.env.MONGODB_URI ||
    process.env.MONGODB_URI.includes('TU_CLUSTER')
  ) {
    throw new Error(
      'Configura MONGODB_URI en backend/.env.'
    )
  }

  if (
    !process.env.JWT_SECRET ||
    process.env.JWT_SECRET.length < 32 ||
    process.env.JWT_SECRET.startsWith('REEMPLAZAR')
  ) {
    throw new Error(
      'Configura JWT_SECRET con un valor aleatorio de al menos 32 caracteres.'
    )
  }
}