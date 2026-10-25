import React from 'react'
import { getImageUrl } from '@/services/api'
import { getBikeImage, formatPKR } from '@/utils/vehicleUtils'
import { Badge } from '@/components/ui/badge'
import { ShieldCheck, Truck, FileText } from 'lucide-react'

export function OrderCartSidebar({
  currentModel,
  zoomColor,
  variantLabel,
  basePrice,
  deliveryFee,
  totalPrice,
  paymentPlan,
  payableNow,
  remainingBalance,
}) {
  return (
    <div className="sticky top-28 border border-[#e5e2d8] bg-white p-6 sm:p-8 space-y-6 shadow-sm font-mono">
      <div className="border-b border-[#e5e2d8] pb-4">
        <div className="text-[10px] tracking-[0.2em] text-[#a82323] uppercase font-semibold">
          [ LIVE ORDER SUMMARY ]
        </div>
        <h3 className="text-xl font-serif font-medium text-[#1a1918] mt-1">
          Order <span className="italic">Summary</span>
        </h3>
      </div>

      {/* Bike Visual & Info */}
      {currentModel ? (
        <div className="space-y-3">
          <div className="aspect-[16/10] bg-[#faf9f5] border border-[#e5e2d8] flex items-center justify-center p-3">
            {currentModel.heroImage ? (
              <img
                key={currentModel.slug === 'zoom-2000w' ? zoomColor : currentModel.slug}
                src={getImageUrl(getBikeImage(currentModel, zoomColor))}
                alt={currentModel.name}
                className="h-full w-full object-contain transition-all duration-300 animate-in fade-in"
              />
            ) : (
              <div className="text-xs text-stone-400 font-serif italic">Vehicle Image Unavailable</div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 font-mono">
              <span className="text-[9px] uppercase tracking-widest text-stone-500">
                {currentModel.brand}
              </span>
              <Badge variant="default" className="text-[9px] font-mono bg-[#1a1918] text-[#faf9f5]">
                {currentModel.category?.toUpperCase() || 'VEHICLE'}
              </Badge>
            </div>
            <div className="text-lg font-serif font-medium text-[#1a1918] mt-0.5">
              {currentModel.name}
            </div>
            <div className="text-xs text-stone-600 font-sans">
              Config: <strong className="text-[#1a1918] font-mono text-[11px]">{variantLabel}</strong>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 border border-[#e5e2d8] bg-[#faf9f5] text-xs text-stone-500 text-center font-serif italic">
          Select a vehicle model to view order details.
        </div>
      )}

      {/* Pricing Line Items */}
      <div className="space-y-2.5 border-t border-[#e5e2d8] pt-4 text-xs font-mono">
        <div className="flex justify-between">
          <span className="text-stone-500 uppercase">Base Vehicle Price:</span>
          <span className="font-bold text-[#1a1918]">{formatPKR(basePrice)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-stone-500 uppercase">Fulfillment & Shipping:</span>
          <span className="font-bold text-[#1a1918]">
            {deliveryFee === 0 ? (
              <span className="text-stone-600 uppercase">COMPLIMENTARY</span>
            ) : (
              formatPKR(deliveryFee)
            )}
          </span>
        </div>

        <div className="flex justify-between border-t border-[#e5e2d8] pt-3">
          <span className="font-bold uppercase text-[#1a1918] text-sm">Total Order Price:</span>
          <span className="font-serif font-bold text-[#1a1918] text-lg">{formatPKR(totalPrice)}</span>
        </div>

        <div className="flex justify-between text-stone-600 pt-1 text-[11px]">
          <span className="uppercase">Payment Plan:</span>
          <span className="font-bold text-[#1a1918] uppercase">
            {paymentPlan === 'booking_token' ? 'Advance Token' : 'Full Settlement (100%)'}
          </span>
        </div>

        <div className="flex justify-between border-t border-dashed border-[#e5e2d8] pt-3 text-[#a82323]">
          <span className="font-bold uppercase text-xs">Payable Today:</span>
          <span className="font-serif font-bold text-lg">{formatPKR(payableNow)}</span>
        </div>

        {remainingBalance > 0 && (
          <div className="flex justify-between text-stone-500 text-[11px]">
            <span className="uppercase">Remaining on Delivery:</span>
            <span className="font-bold text-[#1a1918]">{formatPKR(remainingBalance)}</span>
          </div>
        )}
      </div>

      {/* Assurance Highlights */}
      <div className="border-t border-[#e5e2d8] pt-4 space-y-2.5 text-[11px] text-stone-600 font-sans">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-[#a82323] shrink-0" />
          <span>3-Year Official Super Power Factory Warranty</span>
        </div>
        <div className="flex items-center gap-2">
          <Truck className="h-4 w-4 text-[#a82323] shrink-0" />
          <span>Insured Nationwide Delivery (3-5 Business Days)</span>
        </div>
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-[#a82323] shrink-0" />
          <span>Original Sales Tax Invoice & Excise Docs Included</span>
        </div>
      </div>
    </div>
  )
}
