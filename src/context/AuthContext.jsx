
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback
} from 'react'

import {
  api,
  getToken,
  setToken
} from '../services/api.js'

const AuthContext = createContext(null)

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  initializing: true,
  error: '',
  sessionExpired: false
}

function getTokenExpiration(token) {
  try {
    const encodedPayload = token.split('.')[1]

    const normalizedPayload = encodedPayload
      .replace(/-/g, '+')
      .replace(/_/g, '/')

    const payload = JSON.parse(
      atob(normalizedPayload)
    )

    return typeof payload.exp === 'number'
      ? payload.exp * 1000
      : 0
  } catch {
    return 0
  }
}

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        initializing: false,
        error: '',
        sessionExpired: false
      }

    case 'LOGOUT':
      return {
        ...initialState,
        initializing: false,
        sessionExpired: false
      }

    case 'SESSION_EXPIRED':
      return {
        ...initialState,
        initializing: false,
        sessionExpired: true,
        error: 'Su sesión ya no es válida o ha caducado.'
      }

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      }

    case 'ERROR':
      return {
        ...state,
        initializing: false,
        loading: false,
        error: action.payload
      }

    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(
    authReducer,
    initialState
  )

  const logout = useCallback(() => {
    setToken(null)

    dispatch({
      type: 'LOGOUT'
    })
  }, [])

  const expireSession = useCallback(() => {
    setToken(null)

    dispatch({
      type: 'SESSION_EXPIRED'
    })
  }, [])

  const refreshProfile = useCallback(
    async signal => {
      const data = await api(
        '/auth/me',
        { signal }
      )

      dispatch({
        type: 'LOGIN',
        payload: data.user
      })

      return data.user
    },
    []
  )

  useEffect(() => {
    const controller = new AbortController()

    window.addEventListener(
      'novatech-session-expired',
      expireSession
    )

    const token = getToken()

    if (token) {
      const expiresAt = getTokenExpiration(token)

      if (!expiresAt || expiresAt <= Date.now()) {
        expireSession()
      } else {
        refreshProfile(controller.signal).catch(error => {
          if (error.name !== 'AbortError') {
            dispatch({
              type: 'ERROR',
              payload: error.message
            })
          }
        })
      }
    } else {
      dispatch({
        type: 'LOGOUT'
      })
    }

    return () => {
      controller.abort()

      window.removeEventListener(
        'novatech-session-expired',
        expireSession
      )
    }
  }, [expireSession, refreshProfile])

  useEffect(() => {
    const token = getToken()

    if (!token || !state.isAuthenticated) {
      return
    }

    const expiresAt = getTokenExpiration(token)
    const remaining = expiresAt - Date.now()

    if (remaining <= 0) {
      expireSession()
      return
    }

    const timer = window.setTimeout(
      expireSession,
      remaining
    )

    return () => {
      window.clearTimeout(timer)
    }
  }, [
    state.isAuthenticated,
    state.user,
    expireSession
  ])

  async function authenticate(path, credentials) {
    dispatch({
      type: 'SET_LOADING',
      payload: true
    })

    try {
      const data = await api(path, {
        method: 'POST',
        body: credentials
      })

      setToken(data.token)

      dispatch({
        type: 'LOGIN',
        payload: data.user
      })

      return data.user
    } finally {
      dispatch({
        type: 'SET_LOADING',
        payload: false
      })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,

        login: data =>
          authenticate('/auth/login', data),

        register: data =>
          authenticate('/auth/register', data),

        logout,
        refreshProfile,
        expireSession
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error(
      'useAuth debe utilizarse dentro de AuthProvider'
    )
  }

  return context
}
