import React from 'react'
import { Link } from 'react-router-dom'
import { getImageUrl } from '@/services/api'
import { formatPKR } from '@/utils/vehicleUtils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Building2, Printer, FileCheck } from 'lucide-react'

export function OrderInvoiceModal({ orderInvoice }) {
  if (!orderInvoice) return null

  return (
    <div className="max-w-3xl mx-auto border border-[#1a1918] bg-[#faf9f5] p-8 sm:p-12 shadow-md space-y-8 animate-in fade-in duration-300 font-mono">
      {/* Invoice Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e2d8] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-6 bg-[#a82323]" />
            <span className="text-[10px] tracking-[0.2em] text-[#a82323] uppercase font-bold">
              OFFICIAL ORDER RECEIPT & BOOKING CERTIFICATE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#1a1918] mt-1">
            Order <span className="italic font-normal text-[#a82323]">Confirmed</span>
          </h2>
          <div className="text-xs text-stone-500 mt-1">
            Order Reference ID: <strong className="text-[#1a1918] font-mono">{orderInvoice.orderNumber}</strong>
          </div>
        </div>

        <div className="flex sm:flex-col items-start sm:items-end justify-between text-xs">
          <Badge variant="default" className="text-xs bg-[#1a1918] text-[#faf9f5] uppercase font-mono tracking-wider">
            {orderInvoice.paymentChannel === 'cash_on_delivery'
              ? 'ORDER LOGGED'
              : 'PAYMENT VERIFYING'}
          </Badge>
          <span className="text-[10px] text-stone-500 mt-1">{orderInvoice.orderDate}</span>
        </div>
      </div>

      {/* Vehicle Summary Item */}
      <div className="border border-[#e5e2d8] bg-white p-6 flex flex-col sm:flex-row items-center gap-6">
        <div className="h-24 w-36 bg-[#faf9f5] border border-[#e5e2d8] p-2 flex items-center justify-center shrink-0">
          <img
            src={getImageUrl(orderInvoice.model?.heroImage)}
            alt={orderInvoice.model?.name}
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <div className="flex-1 space-y-1 text-center sm:text-left">
          <div className="text-[10px] uppercase text-stone-400 font-mono">
            {orderInvoice.model?.brand}
          </div>
          <div className="text-xl font-serif font-medium text-[#1a1918]">
            {orderInvoice.model?.name}
          </div>
          <div className="text-xs text-stone-600 font-sans">
            Configuration: <span className="font-mono text-[11px] font-bold text-[#1a1918]">{orderInvoice.variantLabel}</span>
          </div>
        </div>
        <div className="text-right font-mono">
          <div className="text-[10px] text-stone-400 uppercase">Unit Price</div>
          <div className="text-lg font-bold text-[#1a1918]">
            {formatPKR(orderInvoice.basePrice)}
          </div>
        </div>
      </div>

      {/* Buyer & Shipment Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs border border-[#e5e2d8] p-6 bg-white font-mono">
        <div>
          <span className="text-[10px] uppercase text-stone-400 block">Buyer Legal Name</span>
          <span className="font-bold text-[#1a1918] uppercase">{orderInvoice.fullName}</span>
        </div>
        <div>
          <span className="text-[10px] uppercase text-stone-400 block">CNIC Number</span>
          <span className="font-bold text-[#1a1918]">{orderInvoice.cnic}</span>
        </div>
        <div>
          <span className="text-[10px] uppercase text-stone-400 block">WhatsApp / Phone</span>
          <span className="font-bold text-[#1a1918]">{orderInvoice.phone}</span>
        </div>
        <div>
          <span className="text-[10px] uppercase text-stone-400 block">Email Address</span>
          <span className="font-bold text-[#1a1918]">{orderInvoice.email}</span>
        </div>
        <div className="sm:col-span-2 border-t border-[#e5e2d8] pt-3">
          <span className="text-[10px] uppercase text-stone-400 block">Fulfillment Destination</span>
          <span className="font-bold text-[#1a1918]">
            {orderInvoice.address}, {orderInvoice.city} (
            {orderInvoice.deliveryMethod === 'home_delivery'
              ? 'Doorstep Home Delivery'
              : 'Showroom Collection'}
            )
          </span>
        </div>
      </div>

      {/* Payment Telemetry & Receipt Box */}
      <div className="border border-[#e5e2d8] bg-white p-6 space-y-4 text-xs font-mono">
        <div className="font-bold uppercase text-[#1a1918] text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-[#a82323]" />
            <span>Payment & Financial Settlement:</span>
          </div>
          <span className="text-[11px] font-bold text-[#a82323] uppercase">
            {orderInvoice.paymentPlan === 'booking_token' ? 'Advance Token' : 'Full Settlement'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#faf9f5] p-3.5 border border-[#e5e2d8]">
          <div>
            <span className="text-[10px] text-stone-400 uppercase block">Payment Channel</span>
            <span className="font-bold text-[#1a1918] uppercase">
              {orderInvoice.paymentChannel === 'bank_transfer'
                ? 'Meezan Bank (IBFT)'
                : orderInvoice.paymentChannel === 'jazzcash'
                ? 'JazzCash Wallet'
                : orderInvoice.paymentChannel === 'easypaisa'
                ? 'EasyPaisa Wallet'
                : 'Cash on Handover'}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-stone-400 uppercase block">Amount Paid Today</span>
            <span className="font-bold text-[#1a1918] text-sm">
              {formatPKR(orderInvoice.payableNow)}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-stone-400 uppercase block">Remaining Balance Due</span>
            <span className="font-bold text-[#a82323] text-sm">
              {formatPKR(orderInvoice.remainingBalance)}
            </span>
          </div>
        </div>

        {orderInvoice.transactionId && (
          <div className="flex items-center justify-between text-[11px] bg-[#faf9f5] p-2.5 border border-[#e5e2d8]">
            <span className="text-stone-500 uppercase">Transaction ID (TID):</span>
            <span className="font-bold text-[#1a1918] font-mono">{orderInvoice.transactionId}</span>
          </div>
        )}

        {orderInvoice.hasReceipt && (
          <div className="flex items-center gap-2 text-stone-700 bg-[#f4f2ea] p-2.5 border border-[#e5e2d8] text-[11px]">
            <FileCheck className="h-4 w-4 text-[#a82323] shrink-0" />
            <span>Payment Deposit Slip / Screenshot recorded in backend ledger.</span>
          </div>
        )}

        <p className="text-stone-600 leading-relaxed text-[11px] font-sans">
          {orderInvoice.paymentChannel === 'cash_on_delivery'
            ? `Your booking is registered under Order #${orderInvoice.orderNumber}. Our sales officer will contact your WhatsApp (${orderInvoice.phone}) within 2 hours to confirm vehicle delivery schedule.`
            : `Your payment verification is under process by our accounts department. You will receive an official WhatsApp confirmation at ${orderInvoice.phone} within 1 to 2 business hours.`}
        </p>
        <div className="pt-1 text-[11px] text-stone-500 font-sans">
          Estimated Delivery Window: <strong>3 to 5 business days</strong> with live delivery tracking.
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-2">
        <Link to="/fleet" className="flex-1">
          <Button variant="outline" className="w-full font-sans text-xs tracking-[0.18em] cursor-pointer">
            Return to Showroom
          </Button>
        </Link>
        <Button
          variant="bold"
          onClick={() => window.print()}
          className="flex-1 font-sans text-xs tracking-[0.18em] gap-2 cursor-pointer"
        >
          <Printer className="h-3.5 w-3.5" />
          <span>Print Sales Receipt</span>
        </Button>
      </div>
    </div>
  )
}
