import axios from 'axios'

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5006/api'

// Helper to resolve uploaded image filenames (e.g. 'bike-123.png') to full backend URL
export const getImageUrl = (image) => {
  if (!image) return ''
  if (image.startsWith('http://') || image.startsWith('https://') || image.startsWith('data:')) {
    return image
  }
  const backendBase = (import.meta.env.VITE_API_URL || 'http://localhost:5006/api').replace(/\/api\/?$/, '')
  const cleanPath = image.startsWith('/') ? image : `/${image}`
  return `${backendBase}${cleanPath.startsWith('/uploads') ? cleanPath : `/uploads${cleanPath}`}`
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 4000,
})

// Automatically attach Admin JWT token if present in localStorage
apiClient.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('mf_admin_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  } catch (e) {}
  return config
})

// Clear any legacy persistent cache so offline states never show stale broken images
try {
  ;['mf_vehicles_cache', 'mf_vehicles', 'vehicles', 'mock_orders', 'default_vehicles'].forEach((k) =>
    localStorage.removeItem(k)
  )
} catch (e) {}

// Fetch all vehicles directly from backend (optional category: 'electric' | 'petrol', search)
export const getVehicles = async (params = {}) => {
  const { category, search } = params

  try {
    const query = new URLSearchParams()
    if (category && category !== 'all') query.append('category', category)
    if (search) query.append('search', search)

    const url = `/vehicles${query.toString() ? `?${query.toString()}` : ''}`
    const response = await apiClient.get(url)
    return response.data?.data || []
  } catch (error) {
    console.error('[API Error] Fetch vehicles failed:', error.message)
    throw error
  }
}

// Fetch single vehicle by slug
export const getVehicleBySlug = async (slug) => {
  try {
    const response = await apiClient.get(`/vehicles/${slug}`)
    return response.data?.data || null
  } catch (error) {
    console.error(`[API Error] Fetch vehicle /${slug} failed:`, error.message)
    throw error
  }
}

// Place a real order via backend POST /api/orders (supports JSON or FormData with receipt file)
export const submitOrder = async (orderPayload) => {
  try {
    const isFormData = typeof FormData !== 'undefined' && orderPayload instanceof FormData
    const response = await apiClient.post('/orders', orderPayload, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : undefined,
    })
    return response.data
  } catch (error) {
    console.error('[API Error] Submit order failed:', error.message)
    throw error
  }
}

// Track an order by order number (e.g. SP-ORD-2026-XXXXX)
export const trackOrder = async (orderNumber) => {
  try {
    const response = await apiClient.get(`/orders/track/${orderNumber}`)
    return response.data?.data || null
  } catch (error) {
    console.error(`[API Error] Track order #${orderNumber} failed:`, error.message)
    throw error
  }
}

// Submit a customer support or fleet inquiry
export const submitInquiry = async (inquiryPayload) => {
  try {
    const response = await apiClient.post('/inquiries', inquiryPayload)
    return response.data
  } catch (error) {
    console.error('[API Error] Submit inquiry failed:', error.message)
    throw error
  }
}

// ==========================================
// ADMIN AUTHENTICATION & ORDERS MANAGEMENT
// ==========================================

export const adminLogin = async (email, password) => {
  try {
    const response = await apiClient.post('/auth/login', { email, password })
    if (response.data?.token) {
      localStorage.setItem('mf_admin_token', response.data.token)
      localStorage.setItem('mf_admin_user', JSON.stringify(response.data.admin))
    }
    return response.data
  } catch (error) {
    console.error('[API Error] Admin login failed:', error.message)
    throw error
  }
}

export const adminLogout = () => {
  try {
    localStorage.removeItem('mf_admin_token')
    localStorage.removeItem('mf_admin_user')
  } catch (e) {}
}

export const getAdminAuth = () => {
  try {
    const token = localStorage.getItem('mf_admin_token')
    const userRaw = localStorage.getItem('mf_admin_user')
    const user = userRaw ? JSON.parse(userRaw) : null
    return { token, user, isAuthenticated: !!token }
  } catch (e) {
    return { token: null, user: null, isAuthenticated: false }
  }
}

// Fetch all orders for Admin Dashboard (with optional status & pagination)
export const getAdminOrders = async (params = {}) => {
  try {
    const query = new URLSearchParams()
    if (params.status && params.status !== 'ALL') query.append('status', params.status)
    if (params.limit) query.append('limit', params.limit)
    if (params.page) query.append('page', params.page)

    const url = `/orders${query.toString() ? `?${query.toString()}` : ''}`
    const response = await apiClient.get(url)
    return response.data
  } catch (error) {
    console.error('[API Error] Fetch admin orders failed:', error.message)
    throw error
  }
}

// Fetch Order Metrics / Telemetry
export const getAdminMetrics = async () => {
  try {
    const response = await apiClient.get('/orders/metrics')
    return response.data?.data || null
  } catch (error) {
    console.error('[API Error] Fetch metrics failed:', error.message)
    throw error
  }
}

// Update Order Status, Tracking Code, or Payment Status
export const updateAdminOrderStatus = async (orderId, updatePayload) => {
  try {
    const response = await apiClient.put(`/orders/${orderId}/status`, updatePayload)
    return response.data
  } catch (error) {
    console.error(`[API Error] Update order ${orderId} failed:`, error.message)
    throw error
  }
}
