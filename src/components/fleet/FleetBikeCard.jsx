import React from 'react'
import { getImageUrl } from '@/services/api'
import { getBikeImage } from '@/utils/vehicleUtils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FileText, ShoppingCart } from 'lucide-react'

export function FleetBikeCard({ bike, activeColor = 'red', onChangeColor, onOpenBrochure, onOrder }) {
  const isZoom = bike.slug === 'zoom-2000w'
  const hasVariants = isZoom || (bike.colorVariants && bike.colorVariants.length > 1)
  const displayImage = getBikeImage(bike, activeColor)

  return (
    <div className="group border border-[#e5e2d8] bg-white flex flex-col justify-between transition-all duration-300 hover:border-[#171717] hover:shadow-md">
      <div>
        {/* Visual Presentation Plate */}
        <div className="relative aspect-[16/11] overflow-hidden bg-[#faf9f5] border-b border-[#e5e2d8] flex items-center justify-center p-6">
          {displayImage ? (
            <img
              key={displayImage}
              src={getImageUrl(displayImage)}
              alt={bike.name}
              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="font-mono text-xs text-neutral-400">NO IMAGE</div>
          )}

          <div className="absolute top-4 left-4">
            <Badge
              variant="outline"
              className="bg-white/90 font-mono text-[9px] uppercase tracking-[0.2em]"
            >
              {bike.category === 'electric' ? '100% ELECTRIC' : 'PETROL POWER'}
            </Badge>
          </div>

          {/* Brochure Trigger */}
          {bike.brochureImage && onOpenBrochure && (
            <button
              type="button"
              onClick={() => onOpenBrochure(bike)}
              className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-white border border-[#e5e2d8] px-3 py-1 text-[10px] font-serif italic text-[#171717] hover:border-[#171717] transition-all cursor-pointer shadow-xs"
            >
              <FileText className="h-3 w-3" />
              <span>Specs Sheet</span>
            </button>
          )}
        </div>

        {/* Body Content */}
        <div className="p-7 space-y-4">
          <div>
            <div className="font-mono text-[9px] tracking-[0.2em] text-neutral-400 uppercase">
              {bike.brand} — {bike.edition || '2026 SERIES'}
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#171717] mt-1 group-hover:text-[#a82323] transition-colors">
              {bike.name}
            </h3>
            {bike.tagline && (
              <p className="text-sm font-serif italic text-neutral-600 line-clamp-2 mt-1">
                "{bike.tagline}"
              </p>
            )}
          </div>

          {/* Highlights Grid */}
          {bike.highlights && bike.highlights.length > 0 && (
            <div className="grid grid-cols-3 gap-3 border-y border-[#e5e2d8] py-4">
              {bike.highlights.slice(0, 3).map((item, idx) => (
                <div key={idx} className="text-center font-sans">
                  <div className="font-mono text-[8px] uppercase tracking-[0.18em] text-neutral-400">
                    {item.label}
                  </div>
                  <div className="font-serif text-sm font-bold text-[#171717] mt-1">{item.val}</div>
                </div>
              ))}
            </div>
          )}

          {/* Color Variant Swatches */}
          {hasVariants && (
            <div className="flex items-center justify-between border-b border-[#f0eee6] pb-3 font-sans text-xs">
              <div className="font-serif italic text-neutral-500 text-xs">
                Colorway: <strong className="text-[#171717] not-italic">{activeColor === 'black' ? 'Obsidian Black' : 'Crimson Red'}</strong>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  title="Crimson Red"
                  onClick={(e) => {
                    e.stopPropagation()
                    onChangeColor?.(bike.slug, 'red')
                  }}
                  className={`h-4 w-4 rounded-full border cursor-pointer transition-all ${
                    activeColor === 'red'
                      ? 'border-[#171717] ring-1 ring-[#171717] bg-[#dc2626] scale-110'
                      : 'border-[#e5e2d8] bg-[#dc2626] opacity-60 hover:opacity-100'
                  }`}
                />
                <button
                  type="button"
                  title="Obsidian Black"
                  onClick={(e) => {
                    e.stopPropagation()
                    onChangeColor?.(bike.slug, 'black')
                  }}
                  className={`h-4 w-4 rounded-full border cursor-pointer transition-all ${
                    activeColor === 'black'
                      ? 'border-[#171717] ring-1 ring-[#171717] bg-[#171717] scale-110'
                      : 'border-[#e5e2d8] bg-[#171717] opacity-60 hover:opacity-100'
                  }`}
                />
              </div>
            </div>
          )}

          {/* Stock Availability */}
          <div className="flex items-center justify-between text-[11px] font-mono tracking-wider">
            <span className="text-neutral-400 uppercase">AVAILABILITY</span>
            <span className="flex items-center gap-1.5 font-sans font-semibold text-xs text-[#171717]">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  bike.inStock ? 'bg-emerald-600' : 'bg-amber-600'
                }`}
              />
              {bike.inStock
                ? `In Stock (${bike.stockCount || 10} Units)`
                : 'Backorder Available'}
            </span>
          </div>
        </div>
      </div>

      {/* Price & Action Footer */}
      <div className="p-7 pt-0 border-t border-[#f0eee6] bg-white">
        <div className="flex items-center justify-between pt-4">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-400">
              RETAIL EST.
            </div>
            <div className="text-xl font-serif font-bold text-[#171717]">
              {bike.priceEstimate || `PKR ${bike.basePrice?.toLocaleString()}`}
            </div>
          </div>

          <Button
            variant="bold"
            size="sm"
            onClick={() => onOrder(bike, displayImage, activeColor)}
            className="gap-2 font-sans text-xs"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            <span>Reserve Model</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
