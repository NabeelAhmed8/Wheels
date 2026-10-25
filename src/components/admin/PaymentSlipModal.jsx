import React from 'react'
import { getImageUrl } from '@/services/api'
import { formatPKR } from '@/utils/vehicleUtils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { X, FileText, Download, CheckCircle2 } from 'lucide-react'

export function PaymentSlipModal({ viewingSlipOrder, onClose, onApprovePayment }) {
  if (!viewingSlipOrder) return null

  const isPdf = viewingSlipOrder.payment?.receiptImage?.toLowerCase().endsWith('.pdf')
  const slipUrl = getImageUrl(viewingSlipOrder.payment?.receiptImage)

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#141416] border border-neutral-700 max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-[#1a1a1d]">
          <div>
            <div className="flex items-center gap-2">
              <Badge className="bg-red-600 text-white font-mono text-[9px] uppercase">
                PAYMENT SLIP INSPECTION
              </Badge>
              <span className="font-mono text-xs text-white font-bold">
                {viewingSlipOrder.orderNumber}
              </span>
            </div>
            <div className="font-mono text-[11px] text-neutral-400 mt-0.5">
              Customer: <strong className="text-white">{viewingSlipOrder.customer?.fullName}</strong> (
              {viewingSlipOrder.customer?.phone})
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1.5 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Slip Meta Info Bar */}
        <div className="p-3 bg-[#111113] border-b border-neutral-800 grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
          <div>
            <span className="text-[10px] text-neutral-500 uppercase block">Payment Channel</span>
            <span className="font-bold text-white uppercase">{viewingSlipOrder.payment?.method}</span>
          </div>
          <div>
            <span className="text-[10px] text-neutral-500 uppercase block">Amount Due</span>
            <span className="font-bold text-green-400">
              {formatPKR(viewingSlipOrder.pricing?.payableNow)}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-neutral-500 uppercase block">Transaction ID</span>
            <span className="font-bold text-white">
              {viewingSlipOrder.payment?.transactionId || 'N/A'}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-neutral-500 uppercase block">Sender Account</span>
            <span className="font-bold text-white truncate block">
              {viewingSlipOrder.payment?.senderName || 'N/A'}
            </span>
          </div>
        </div>

        {/* Modal Body: Image / File Viewer */}
        <div className="flex-1 p-4 overflow-y-auto bg-black flex items-center justify-center min-h-[300px]">
          {isPdf ? (
            <div className="text-center p-8 space-y-4">
              <FileText className="h-16 w-16 text-red-500 mx-auto" />
              <div className="font-mono text-sm text-white">Payment Receipt in PDF Format</div>
              <a
                href={slipUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-mono text-xs uppercase font-bold"
              >
                <Download className="h-4 w-4" />
                <span>Download / Open PDF</span>
              </a>
            </div>
          ) : (
            <img
              src={slipUrl}
              alt="Customer Deposit Slip"
              className="max-h-[60vh] max-w-full object-contain border border-neutral-800 shadow-md"
            />
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 border-t border-neutral-800 bg-[#141416] flex items-center justify-between gap-3 font-mono">
          <a
            href={slipUrl}
            target="_blank"
            rel="noreferrer"
            download
            className="inline-flex items-center gap-1.5 px-3 py-2 border border-neutral-700 bg-neutral-900 text-neutral-300 hover:text-white text-xs cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Open Full Size</span>
          </a>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="text-xs border-neutral-700 text-neutral-400 hover:text-white"
            >
              Close
            </Button>
            {viewingSlipOrder.orderStatus === 'PENDING' && (
              <Button
                size="sm"
                onClick={() => onApprovePayment(viewingSlipOrder._id)}
                className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Approve Payment & Confirm Order</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
