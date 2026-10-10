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
    sessionStorage.setItem(
      tokenKey,
      token
    )
  } else {
    sessionStorage.removeItem(tokenKey)
  }
}

export async function api(
  path,
  {
    body,
    ...options
  } = {}
) {
  const token = getToken()

  let response

  try {
    response = await fetch(
      `${base}${path}`,
      {
        ...options,

        signal:
          options.signal ||
          AbortSignal.timeout(15000),

        headers: {
          ...(
            body !== undefined
              ? {
                  'Content-Type':
                    'application/json'
                }
              : {}
          ),

          ...(
            token
              ? {
                  Authorization:
                    `Bearer ${token}`
                }
              : {}
          )
        },

        ...(
          body !== undefined
            ? {
                body: JSON.stringify(body)
              }
            : {}
        )
      }
    )
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error
    }

    throw new Error(
      'No se pudo conectar con el servidor. Comprueba que el backend esté encendido.'
    )
  }

  if (response.status === 204) {
    return null
  }

  const data = await response
    .json()
    .catch(() => ({
      message:
        'Respuesta no válida del servidor.'
    }))

  if (!response.ok) {
    const error = new Error(
      data.message ||
      'No se pudo completar la solicitud.'
    )

    error.status = response.status

    if (
      response.status === 401 &&
      token
    ) {
      window.dispatchEvent(
        new Event(
          'novatech-session-expired'
        )
      )
    }

    throw error
  }

  return data
}

export const money = value => {
  return new Intl.NumberFormat(
    'es-GT',
    {
      style: 'currency',
      currency: 'GTQ'
    }
  ).format(value)
}