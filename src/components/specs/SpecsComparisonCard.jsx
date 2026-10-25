import React from 'react'
import { Link } from 'react-router-dom'
import { getImageUrl } from '@/services/api'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Zap, Gauge, BatteryCharging, ShoppingCart, Sliders } from 'lucide-react'

/**
 * SpecsComparisonCard
 * Single Responsibility: Renders an individual vehicle specification card
 * in the moveable comparison matrix.
 */
export function SpecsComparisonCard({ bike, onSelectModel }) {
  const isElectric = bike.category === 'electric'
  const motorOutput =
    bike.highlights?.[0]?.val || bike.specs?.powertrain?.[0]?.val || 'High Output'
  const topSpeed =
    bike.highlights?.[2]?.val ||
    bike.specs?.powertrain?.[2]?.val ||
    bike.specs?.powertrain?.[1]?.val ||
    '80 km/h'
  const range =
    bike.highlights?.[3]?.val ||
    bike.specs?.energy?.[1]?.val ||
    bike.specs?.energy?.[0]?.val ||
    'Extended Range'

  return (
    <div className="w-[300px] sm:w-[330px] shrink-0 border border-[#e5e2d8] bg-white flex flex-col justify-between transition-all duration-300 hover:border-[#171717] hover:shadow-md select-none">
      <div>
        {/* Card Header & Studio Preview */}
        <div className="relative aspect-[16/11] bg-[#faf9f5] border-b border-[#e5e2d8] p-5 flex items-center justify-center overflow-hidden">
          <Badge
            variant="outline"
            className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-wider bg-white/90"
          >
            {isElectric ? '100% ELECTRIC' : 'PETROL POWER'}
          </Badge>

          {bike.heroImage ? (
            <img
              src={getImageUrl(bike.heroImage)}
              alt={bike.name}
              className="h-full w-full object-contain pointer-events-none transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="font-mono text-xs text-neutral-400">NO IMAGE</div>
          )}
        </div>

        {/* Model Title & Price */}
        <div className="p-5 border-b border-[#e5e2d8] space-y-1">
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-400">
            {bike.brand} — {bike.edition || '2026 EDITION'}
          </div>
          <h3 className="text-xl font-serif font-black text-[#171717]">
            {bike.name}
          </h3>
          <div className="font-serif text-base font-bold text-[#a82323] pt-0.5">
            {bike.priceEstimate || `PKR ${bike.basePrice?.toLocaleString()}`}
          </div>
        </div>

        {/* Granular Spec Rows */}
        <div className="p-5 space-y-3 font-sans text-xs">
          {/* Powertrain Row */}
          <div className="flex items-center justify-between border-b border-[#f0eee6] pb-2">
            <span className="flex items-center gap-1.5 text-neutral-500 text-[11px]">
              <Zap className="h-3 w-3 text-[#a82323]" />
              <span>Drive / Motor</span>
            </span>
            <span className="font-serif font-semibold text-[#171717]">
              {motorOutput}
            </span>
          </div>

          {/* Top Speed Row */}
          <div className="flex items-center justify-between border-b border-[#f0eee6] pb-2">
            <span className="flex items-center gap-1.5 text-neutral-500 text-[11px]">
              <Gauge className="h-3 w-3 text-[#a82323]" />
              <span>Max Velocity</span>
            </span>
            <span className="font-serif font-semibold text-[#171717]">
              {topSpeed}
            </span>
          </div>

          {/* Range / Energy Row */}
          <div className="flex items-center justify-between border-b border-[#f0eee6] pb-2">
            <span className="flex items-center gap-1.5 text-neutral-500 text-[11px]">
              <BatteryCharging className="h-3 w-3 text-[#a82323]" />
              <span>Range / Fuel</span>
            </span>
            <span className="font-serif font-semibold text-[#171717]">
              {range}
            </span>
          </div>

          {/* Chassis Architecture */}
          <div className="flex items-center justify-between border-b border-[#f0eee6] pb-2">
            <span className="flex items-center gap-1.5 text-neutral-500 text-[11px]">
              <Sliders className="h-3 w-3 text-[#a82323]" />
              <span>Chassis</span>
            </span>
            <span className="font-serif text-neutral-700">
              {bike.bodyType || 'Backbone Frame'}
            </span>
          </div>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="p-5 pt-0 bg-white space-y-2">
        {onSelectModel && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              onSelectModel(bike.slug || bike._id)
              window.scrollTo({ top: 180, behavior: 'smooth' })
            }}
            className="w-full font-mono text-[10px] uppercase tracking-wider cursor-pointer"
          >
            Inspect Blueprint
          </Button>
        )}

        <Link to="/order" state={{ selectedModel: bike }} className="block">
          <Button
            variant="bold"
            size="sm"
            className="w-full font-sans text-xs uppercase tracking-wider gap-1.5 cursor-pointer"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            <span>Order This Model</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}
