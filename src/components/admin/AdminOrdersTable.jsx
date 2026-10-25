import React, { useState } from 'react'
import dayjs from 'dayjs'
import { getImageUrl } from '@/services/api'
import { copyText } from '@/utils/clipboard'
import { formatPKR } from '@/utils/vehicleUtils'
import { Badge } from '@/components/ui/badge'
import {
  Package,
  Check,
  Copy,
  MessageCircle,
  Eye,
  Loader2,
} from 'lucide-react'

export function AdminOrdersTable({
  orders,
  loading,
  updatingId,
  searchQuery,
  onViewSlip,
  onStatusChange,
}) {
  const [copiedKey, setCopiedKey] = useState(null)

  const handleCopy = async (key, text) => {
    const success = await copyText(text)
    if (success) {
      setCopiedKey(key)
      setTimeout(() => setCopiedKey(null), 2000)
    }
  }

  if (loading && orders.length === 0) {
    return (
      <div className="p-16 border border-neutral-800 bg-[#141416] flex flex-col items-center justify-center space-y-3 font-mono">
        <Loader2 className="h-6 w-6 animate-spin text-red-600" />
        <span className="text-xs uppercase text-neutral-400">Loading Order Ledger...</span>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="p-16 border border-neutral-800 bg-[#141416] text-center space-y-3 font-mono">
        <Package className="h-10 w-10 text-neutral-600 mx-auto" />
        <h3 className="text-lg font-bold text-white uppercase">No Orders Found</h3>
        <p className="text-xs text-neutral-500 max-w-sm mx-auto">
          {searchQuery ? `No orders matched query "${searchQuery}".` : 'No orders in this status category.'}
        </p>
      </div>
    )
  }

  return (
    <div className="border border-neutral-800 bg-[#141416] overflow-x-auto shadow-2xl font-mono text-xs">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-neutral-800 bg-[#1a1a1d] text-neutral-300 uppercase text-[11px] tracking-wider">
            <th className="py-3.5 px-4 font-bold">Order Code & Time</th>
            <th className="py-3.5 px-4 font-bold border-l border-neutral-800">Customer & Contact</th>
            <th className="py-3.5 px-4 font-bold border-l border-neutral-800">Motorcycle Spec</th>
            <th className="py-3.5 px-4 font-bold border-l border-neutral-800">Payment & Slip</th>
            <th className="py-3.5 px-4 font-bold border-l border-neutral-800">Order Status</th>
            <th className="py-3.5 px-4 font-bold border-l border-neutral-800 text-center">Manage Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800">
          {orders.map((order) => {
            const isUpdating = updatingId === order._id
            const formattedDate = dayjs(order.createdAt).format('DD MMM YYYY, hh:mm A')
            const phoneDigits = order.customer?.phone?.replace(/[^0-9]/g, '') || ''
            const cleanPhone = phoneDigits.startsWith('0') ? '92' + phoneDigits.slice(1) : phoneDigits
            const hasSlip = !!order.payment?.receiptImage

            return (
              <tr key={order._id} className="hover:bg-[#1a1a1e] transition-colors">
                {/* 1. Order Code & Time */}
                <td className="py-4 px-4 align-top space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white text-sm">{order.orderNumber}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(order.orderNumber, order.orderNumber)}
                      className="text-neutral-500 hover:text-white cursor-pointer"
                      title="Copy Order ID"
                    >
                      {copiedKey === order.orderNumber ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                  <div className="text-[10px] text-neutral-500">{formattedDate}</div>
                  <div className="text-[10px] text-neutral-400">
                    {order.fulfillment?.deliveryMethod === 'home_delivery' ? 'Doorstep Delivery' : 'Showroom Pickup'}
                  </div>
                </td>

                {/* 2. Customer & Contact */}
                <td className="py-4 px-4 align-top border-l border-neutral-800 space-y-1">
                  <div className="font-bold text-white uppercase">{order.customer?.fullName}</div>
                  <div className="text-[11px] text-neutral-400">CNIC: {order.customer?.cnic}</div>
                  <div className="flex items-center gap-2 pt-0.5">
                    <span className="text-[11px] text-neutral-300">{order.customer?.phone}</span>
                    {cleanPhone && (
                      <a
                        href={`https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(order.customer?.fullName)},%20this%20is%20Motorcycle%20Fleet%20regarding%20your%20order%20${order.orderNumber}.`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-green-950 text-green-400 border border-green-800 text-[10px] rounded hover:bg-green-900 cursor-pointer"
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle className="h-3 w-3" />
                        <span>WhatsApp</span>
                      </a>
                    )}
                  </div>
                  <div className="text-[10px] text-neutral-500 truncate max-w-xs" title={`${order.customer?.address}, ${order.customer?.city}`}>
                    {order.customer?.address}, {order.customer?.city}
                  </div>
                </td>

                {/* 3. Motorcycle Spec */}
                <td className="py-4 px-4 align-top border-l border-neutral-800 space-y-1">
                  <div className="flex items-center gap-2.5">
                    {order.vehicle?.heroImage && (
                      <div className="h-10 w-14 bg-white/5 border border-neutral-800 p-0.5 flex items-center justify-center shrink-0">
                        <img
                          src={getImageUrl(order.vehicle.heroImage)}
                          alt={order.vehicle.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <div className="font-bold text-white uppercase text-[11px] leading-tight">
                        {order.vehicle?.name}
                      </div>
                      <div className="text-[10px] text-neutral-400 truncate max-w-[180px]">
                        {order.vehicle?.variantLabel || 'Standard Spec'}
                      </div>
                    </div>
                  </div>
                  <div className="text-[11px] text-neutral-300 pt-1">
                    Total: <strong className="text-white">{formatPKR(order.pricing?.totalPrice)}</strong>
                  </div>
                </td>

                {/* 4. Payment & Slip */}
                <td className="py-4 px-4 align-top border-l border-neutral-800 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-neutral-800 text-neutral-200 border border-neutral-700 text-[9px] uppercase font-mono">
                      {order.payment?.plan === 'booking_token' ? 'Token (PKR 25K)' : 'Full Payment'}
                    </Badge>
                    <span className="text-[10px] font-bold text-neutral-300 uppercase">
                      {order.payment?.method === 'bank_transfer'
                        ? 'Meezan Bank'
                        : order.payment?.method === 'jazzcash'
                        ? 'JazzCash'
                        : order.payment?.method === 'easypaisa'
                        ? 'EasyPaisa'
                        : 'Cash on Handover'}
                    </span>
                  </div>

                  <div className="text-[11px] space-y-0.5">
                    <div>
                      Paid Today: <strong className="text-green-400">{formatPKR(order.pricing?.payableNow)}</strong>
                    </div>
                    {order.pricing?.remainingBalance > 0 && (
                      <div className="text-[10px] text-red-400">
                        Remaining: {formatPKR(order.pricing?.remainingBalance)}
                      </div>
                    )}
                  </div>

                  {order.payment?.transactionId && (
                    <div className="text-[10px] text-neutral-400 flex items-center gap-1 bg-[#1a1a1f] px-1.5 py-0.5 border border-neutral-800 max-w-fit">
                      <span>TID:</span>
                      <span className="text-white font-bold">{order.payment.transactionId}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(`tid_${order._id}`, order.payment.transactionId)}
                        className="text-neutral-500 hover:text-white cursor-pointer"
                      >
                        {copiedKey === `tid_${order._id}` ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                      </button>
                    </div>
                  )}

                  {hasSlip ? (
                    <button
                      type="button"
                      onClick={() => onViewSlip(order)}
                      className="inline-flex items-center gap-1.5 px-2 py-1 bg-red-950/80 text-red-200 border border-red-700 hover:bg-red-900 text-[10px] uppercase font-bold transition-all cursor-pointer rounded"
                    >
                      <Eye className="h-3 w-3" />
                      <span>View Payment Slip</span>
                    </button>
                  ) : (
                    <div className="text-[10px] text-neutral-500 italic">No slip attached</div>
                  )}
                </td>

                {/* 5. Order Status */}
                <td className="py-4 px-4 align-top border-l border-neutral-800 space-y-1">
                  <Badge
                    className={`text-[10px] uppercase font-bold tracking-wider font-mono ${
                      order.orderStatus === 'CONFIRMED'
                        ? 'bg-blue-900/60 text-blue-200 border-blue-700'
                        : order.orderStatus === 'IN_ASSEMBLY'
                        ? 'bg-purple-900/60 text-purple-200 border-purple-700'
                        : order.orderStatus === 'DISPATCHED'
                        ? 'bg-indigo-900/60 text-indigo-200 border-indigo-700'
                        : order.orderStatus === 'DELIVERED'
                        ? 'bg-green-900/60 text-green-200 border-green-700'
                        : order.orderStatus === 'CANCELLED'
                        ? 'bg-red-900/60 text-red-200 border-red-700'
                        : 'bg-amber-900/60 text-amber-200 border-amber-700'
                    }`}
                  >
                    {order.orderStatus}
                  </Badge>
                  {order.fulfillment?.trackingCode && (
                    <div className="text-[10px] text-neutral-400">
                      Track: <span className="text-white font-bold">{order.fulfillment.trackingCode}</span>
                    </div>
                  )}
                  <div className="text-[10px] text-neutral-500">
                    Payment: <span className="text-neutral-300 font-bold uppercase">{order.payment?.status}</span>
                  </div>
                </td>

                {/* 6. Manage Actions */}
                <td className="py-4 px-4 align-top border-l border-neutral-800 text-center space-y-1.5">
                  {isUpdating ? (
                    <Loader2 className="h-5 w-5 animate-spin text-red-600 mx-auto" />
                  ) : (
                    <div className="flex flex-col gap-1.5 items-stretch min-w-[130px]">
                      {order.orderStatus === 'PENDING' && (
                        <button
                          type="button"
                          onClick={() => onStatusChange(order._id, 'CONFIRMED', 'token_paid')}
                          className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white text-[10px] uppercase font-bold transition-colors cursor-pointer"
                        >
                          ✓ Verify & Confirm
                        </button>
                      )}

                      {order.orderStatus === 'CONFIRMED' && (
                        <button
                          type="button"
                          onClick={() => onStatusChange(order._id, 'IN_ASSEMBLY')}
                          className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-[10px] uppercase font-bold transition-colors cursor-pointer"
                        >
                          ⚙ Send to Assembly
                        </button>
                      )}

                      {order.orderStatus === 'IN_ASSEMBLY' && (
                        <button
                          type="button"
                          onClick={() => onStatusChange(order._id, 'DISPATCHED')}
                          className="px-2 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] uppercase font-bold transition-colors cursor-pointer"
                        >
                          🚚 Dispatch Carrier
                        </button>
                      )}

                      {order.orderStatus === 'DISPATCHED' && (
                        <button
                          type="button"
                          onClick={() => onStatusChange(order._id, 'DELIVERED', 'paid_in_full')}
                          className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] uppercase font-bold transition-colors cursor-pointer"
                        >
                          ✓ Mark Delivered
                        </button>
                      )}

                      {order.orderStatus !== 'CANCELLED' && order.orderStatus !== 'DELIVERED' && (
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Are you sure you want to cancel order ${order.orderNumber}?`)) {
                              onStatusChange(order._id, 'CANCELLED')
                            }
                          }}
                          className="px-2 py-0.5 border border-neutral-800 text-neutral-400 hover:text-red-400 hover:border-red-800 text-[9px] uppercase transition-colors cursor-pointer"
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
