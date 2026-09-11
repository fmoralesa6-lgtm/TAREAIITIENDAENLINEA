import {
  createContext,
  useContext,
  useReducer
} from 'react'

const AuthContext = createContext()

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  lastLogin: null
}

function authReducer(state, action) {

  switch (action.type) {

    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        lastLogin: action.payload.loginDate,
        loading: false
      }

    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        lastLogin: null
      }

    case 'UPDATE_PROFILE':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      }

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      }

    default:
      return state
  }
}

export function AuthProvider({ children }) {

  const [state, dispatch] =
    useReducer(authReducer, initialState)

  const login = (userData) => {

    dispatch({
      type: 'LOGIN',
      payload: userData
    })
  }

  const logout = () => {

    dispatch({
      type: 'LOGOUT'
    })
  }

  const updateProfile = (data) => {

    dispatch({
      type: 'UPDATE_PROFILE',
      payload: data
    })
  }

  const setLoading = (value) => {

    dispatch({
      type: 'SET_LOADING',
      payload: value
    })
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        updateProfile,
        setLoading
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