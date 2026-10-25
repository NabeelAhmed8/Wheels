import React from 'react'
import { formatPKR } from '@/utils/vehicleUtils'
import { Package, Clock, Wrench, Truck, ShieldCheck } from 'lucide-react'

export function AdminMetricsCards({ metrics, orders }) {
  const pendingCount = orders.filter(
    (o) => o.orderStatus === 'PENDING' || o.payment?.status === 'verification_pending'
  ).length
  const assemblyCount = orders.filter(
    (o) => o.orderStatus === 'CONFIRMED' || o.orderStatus === 'IN_ASSEMBLY'
  ).length
  const dispatchedCount = orders.filter(
    (o) => o.orderStatus === 'DISPATCHED' || o.orderStatus === 'DELIVERED'
  ).length
  const totalRev =
    metrics?.totalRevenue ?? orders.reduce((sum, o) => sum + (o.pricing?.totalPrice || 0), 0)

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
      {/* Total Orders */}
      <div className="p-5 border border-neutral-800 bg-[#141416] space-y-2">
        <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase block">
          TOTAL ORDERS
        </span>
        <div className="text-2xl sm:text-3xl font-serif font-bold text-white">
          {metrics?.totalOrders ?? orders.length}
        </div>
        <div className="text-[11px] font-mono text-neutral-400 flex items-center gap-1.5">
          <Package className="h-3 w-3 text-neutral-400" />
          <span>All registered orders</span>
        </div>
      </div>

      {/* Pending Verification */}
      <div className="p-5 border border-amber-900/40 bg-[#161410] space-y-2">
        <span className="font-mono text-[10px] tracking-widest text-amber-500 uppercase block">
          PENDING VERIFICATION
        </span>
        <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-400">
          {pendingCount}
        </div>
        <div className="text-[11px] font-mono text-amber-300/70 flex items-center gap-1.5">
          <Clock className="h-3 w-3 text-amber-400" />
          <span>Requires slip check</span>
        </div>
      </div>

      {/* Confirmed / Assembly */}
      <div className="p-5 border border-blue-900/40 bg-[#101318] space-y-2">
        <span className="font-mono text-[10px] tracking-widest text-blue-400 uppercase block">
          CONFIRMED / ASSEMBLY
        </span>
        <div className="text-2xl sm:text-3xl font-serif font-bold text-blue-400">
          {assemblyCount}
        </div>
        <div className="text-[11px] font-mono text-blue-300/70 flex items-center gap-1.5">
          <Wrench className="h-3 w-3 text-blue-400" />
          <span>In production queue</span>
        </div>
      </div>

      {/* Dispatched / Delivered */}
      <div className="p-5 border border-green-900/40 bg-[#0e1610] space-y-2">
        <span className="font-mono text-[10px] tracking-widest text-green-400 uppercase block">
          DISPATCHED / DELIVERED
        </span>
        <div className="text-2xl sm:text-3xl font-serif font-bold text-green-400">
          {dispatchedCount}
        </div>
        <div className="text-[11px] font-mono text-green-300/70 flex items-center gap-1.5">
          <Truck className="h-3 w-3 text-green-400" />
          <span>On carrier / completed</span>
        </div>
      </div>

      {/* Order Value */}
      <div className="p-5 border border-red-900/40 bg-[#181010] space-y-2 col-span-2 lg:col-span-1">
        <span className="font-mono text-[10px] tracking-widest text-red-400 uppercase block">
          ORDER VALUE
        </span>
        <div className="text-xl sm:text-2xl font-serif font-bold text-red-500 truncate">
          {formatPKR(totalRev)}
        </div>
        <div className="text-[11px] font-mono text-red-300/70 flex items-center gap-1.5">
          <ShieldCheck className="h-3 w-3 text-red-400" />
          <span>Gross vehicle pipeline</span>
        </div>
      </div>
    </div>
  )
}
