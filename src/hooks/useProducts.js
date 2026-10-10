import {
  useEffect,
  useState
} from 'react'

import {
  api
} from '../services/api.js'

export default function useProducts(
  query = '',
  revision = 0
) {
  const [state, setState] = useState({
    products: [],
    loading: true,
    error: ''
  })

  useEffect(() => {
    const controller =
      new AbortController()

    setState({
      products: [],
      loading: true,
      error: ''
    })

    const path = query
      ? `/recursos?${query}`
      : '/recursos'

    api(
      path,
      {
        signal: controller.signal
      }
    )
      .then(products => {
        setState({
          products,
          loading: false,
          error: ''
        })
      })
      .catch(error => {
        if (
          error.name !== 'AbortError'
        ) {
          setState({
            products: [],
            loading: false,
            error: error.message
          })
        }
      })

    return () => controller.abort()
  }, [query, revision])

  return state
}