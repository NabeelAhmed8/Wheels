import { useState, useEffect, useCallback } from 'react'
import { getVehicles } from '@/services/api'

/**
 * useVehicles Hook
 * Single Responsibility: Manages vehicle fetching lifecycle from backend,
 * tracks loading state, catches server errors, and provides a refetch handler.
 */
export function useVehicles(params = {}) {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchVehicles = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getVehicles(params)
      if (Array.isArray(data) && data.length > 0) {
        setVehicles(data)
      } else {
        setVehicles([])
        setError('No vehicles available in database')
      }
    } catch (err) {
      console.error('[useVehicles] Backend server error:', err.message || err)
      setError(err.message || 'Could not connect to backend server')
      setVehicles([])
    } finally {
      setLoading(false)
    }
  }, [params.category, params.search])

  useEffect(() => {
    fetchVehicles()
  }, [fetchVehicles])

  const isOffline = Boolean(error || (!loading && vehicles.length === 0))

  return {
    vehicles,
    loading,
    error,
    isOffline,
    refetch: fetchVehicles,
  }
}
