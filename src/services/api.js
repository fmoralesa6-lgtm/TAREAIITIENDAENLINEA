
const base = (
  import.meta.env.VITE_API_URL ||
  'http://localhost:4000/api'
).replace(/\/$/, '')

const tokenKey = 'novatech_token'

export const getToken = () => {
  return sessionStorage.getItem(tokenKey)
}

export const setToken = token => {
  if (token) {
    sessionStorage.setItem(tokenKey, token)
  } else {
    sessionStorage.removeItem(tokenKey)
  }
}

export async function api(
  path,
  {
    body,
    headers: customHeaders,
    ...options
  } = {}
) {
  const token = getToken()

  const headers = new Headers(customHeaders || {})

  if (body !== undefined) {
    headers.set('Content-Type', 'application/json')
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  let response

  try {
    response = await fetch(`${base}${path}`, {
      ...options,
      signal: options.signal || AbortSignal.timeout(15000),
      headers,
      ...(body !== undefined
        ? { body: JSON.stringify(body) }
        : {})
    })
  } catch (error) {
    if (
      error.name === 'AbortError' ||
      error.name === 'TimeoutError'
    ) {
      throw error
    }

    throw new Error(
      'No se pudo conectar con el servidor. Comprueba que el backend esté encendido.'
    )
  }

  if (response.status === 204) {
    return null
  }

  const data = await response.json().catch(() => ({
    message: 'Respuesta no válida del servidor.'
  }))

  if (!response.ok) {
    const error = new Error(
      data.message || 'No se pudo completar la solicitud.'
    )

    error.status = response.status
    error.code = data.error

    if (
      response.status === 401 &&
      token &&
      (
        data.error === 'token_expired' ||
        data.error === 'invalid_token'
      )
    ) {
      setToken(null)

      window.dispatchEvent(
        new Event('novatech-session-expired')
      )
    }

    throw error
  }

  return data
}

export const money = value => {
  return new Intl.NumberFormat('es-GT', {
    style: 'currency',
    currency: 'GTQ'
  }).format(value)
}
