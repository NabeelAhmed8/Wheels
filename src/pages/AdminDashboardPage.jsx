import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getAdminAuth,
  adminLogout,
  getAdminOrders,
  getAdminMetrics,
  updateAdminOrderStatus,
} from '@/services/api'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { AdminMetricsCards } from '@/components/admin/AdminMetricsCards'
import { AdminFilterBar } from '@/components/admin/AdminFilterBar'
import { AdminOrdersTable } from '@/components/admin/AdminOrdersTable'
import { PaymentSlipModal } from '@/components/admin/PaymentSlipModal'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export function AdminDashboardPage() {
  const navigate = useNavigate()
  const [adminUser, setAdminUser] = useState(null)
  const [orders, setOrders] = useState([])
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState(null)
  const [error, setError] = useState(null)

  // Filters & Search
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')

  // Active Slip Modal
  const [viewingSlipOrder, setViewingSlipOrder] = useState(null)

  // Auth Guard
  useEffect(() => {
    const auth = getAdminAuth()
    if (!auth.isAuthenticated) {
      navigate('/admin/login', { replace: true })
    } else {
      setAdminUser(auth.user)
    }
  }, [navigate])

  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [ordersRes, metricsRes] = await Promise.all([
        getAdminOrders({ status: statusFilter === 'ALL' ? undefined : statusFilter, limit: 100 }),
        getAdminMetrics().catch(() => null),
      ])
      setOrders(ordersRes?.data || [])
      if (metricsRes) setMetrics(metricsRes)
    } catch (err) {
      console.error('Failed to load admin dashboard data:', err)
      if (err.response?.status === 401) {
        adminLogout()
        navigate('/admin/login', { replace: true })
      } else {
        setError('Failed to load orders from backend. Make sure the server is running on port 5006.')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [statusFilter])

  const handleLogout = () => {
    adminLogout()
    navigate('/admin/login', { replace: true })
  }

  const handleStatusChange = async (orderId, newStatus, paymentStatus = null) => {
    setUpdatingId(orderId)
    try {
      const payload = { orderStatus: newStatus }
      if (paymentStatus) {
        payload.paymentStatus = paymentStatus
      }
      if (newStatus === 'DISPATCHED') {
        const code = prompt(
          'Enter Carrier Tracking Code (optional):',
          `TC-${Math.floor(100000 + Math.random() * 900000)}`
        )
        if (code !== null) payload.trackingCode = code
      }

      await updateAdminOrderStatus(orderId, payload)
      await loadData()
      if (viewingSlipOrder && viewingSlipOrder._id === orderId) {
        setViewingSlipOrder(null)
      }
    } catch (err) {
      alert('Failed to update status: ' + (err.response?.data?.message || err.message))
    } finally {
      setUpdatingId(null)
    }
  }

  // Filter orders by search query
  const filteredOrders = orders.filter((o) => {
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase()
    return (
      o.orderNumber?.toLowerCase().includes(q) ||
      o.customer?.fullName?.toLowerCase().includes(q) ||
      o.customer?.phone?.includes(q) ||
      o.customer?.cnic?.includes(q) ||
      o.payment?.transactionId?.toLowerCase().includes(q) ||
      o.vehicle?.name?.toLowerCase().includes(q)
    )
  })

  return (
    <div className="min-h-screen bg-[#0e0e10] text-[#f4f4f5] font-sans selection:bg-red-600 selection:text-white">
      {/* Top Operations Header */}
      <AdminHeader adminUser={adminUser} onLogout={handleLogout} />

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* KPI Telemetry Cards */}
        <AdminMetricsCards metrics={metrics} orders={orders} />

        {/* Filter & Search Bar */}
        <AdminFilterBar
          searchQuery={searchQuery}
          onChangeSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          onChangeStatusFilter={setStatusFilter}
          loading={loading}
          onRefresh={loadData}
        />

        {/* Error Banner */}
        {error && (
          <div className="p-4 bg-red-950/60 border border-red-800 text-red-200 font-mono text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <span>{error}</span>
            </div>
            <Button size="sm" variant="outline" onClick={loadData} className="font-mono text-xs">
              Retry
            </Button>
          </div>
        )}

        {/* Orders Table */}
        <AdminOrdersTable
          orders={filteredOrders}
          loading={loading}
          updatingId={updatingId}
          searchQuery={searchQuery}
          onViewSlip={setViewingSlipOrder}
          onStatusChange={handleStatusChange}
        />
      </main>

      {/* Payment Slip Inspection Modal */}
      <PaymentSlipModal
        viewingSlipOrder={viewingSlipOrder}
        onClose={() => setViewingSlipOrder(null)}
        onApprovePayment={(orderId) => handleStatusChange(orderId, 'CONFIRMED', 'token_paid')}
      />
    </div>
  )
}
