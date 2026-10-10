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
  error: ''
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
        error: ''
      }

    case 'LOGOUT':
      return {
        ...initialState,
        initializing: false
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

export function AuthProvider({
  children
}) {
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
    const controller =
      new AbortController()

    window.addEventListener(
      'novatech-session-expired',
      logout
    )

    if (getToken()) {
      refreshProfile(
        controller.signal
      ).catch(error => {
        if (
          error.name !== 'AbortError'
        ) {
          dispatch({
            type: 'ERROR',
            payload: error.message
          })
        }
      })
    } else {
      dispatch({
        type: 'LOGOUT'
      })
    }

    return () => {
      controller.abort()

      window.removeEventListener(
        'novatech-session-expired',
        logout
      )
    }
  }, [logout, refreshProfile])

  async function authenticate(
    path,
    credentials
  ) {
    dispatch({
      type: 'SET_LOADING',
      payload: true
    })

    try {
      const data = await api(
        path,
        {
          method: 'POST',
          body: credentials
        }
      )

      setToken(data.token)

      dispatch({
        type: 'LOGIN',
        payload: data.user
      })
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
          authenticate(
            '/auth/login',
            data
          ),

        register: data =>
          authenticate(
            '/auth/register',
            data
          ),

        logout,
        refreshProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(
    AuthContext
  )

  if (!context) {
    throw new Error(
      'useAuth debe utilizarse dentro de AuthProvider'
    )
  }

  return context
}