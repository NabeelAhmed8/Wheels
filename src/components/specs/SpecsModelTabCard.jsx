import React from 'react'
import { getImageUrl } from '@/services/api'

/**
 * SpecsModelTabCard
 * Single Responsibility: Renders an individual interactive vehicle selector card in the moveable strip.
 */
export function SpecsModelTabCard({ model, isSelected, onSelect }) {
  const isElectric = model.category === 'electric'

  return (
    <button
      type="button"
      onClick={() => onSelect(model.slug || model._id)}
      className={`group relative flex items-center gap-3 px-4 py-2.5 border transition-all duration-200 shrink-0 cursor-pointer select-none ${
        isSelected
          ? 'border-[#171717] bg-[#171717] text-[#faf9f5] shadow-sm'
          : 'border-[#e5e2d8] bg-white text-neutral-800 hover:border-[#171717] hover:bg-neutral-50'
      }`}
    >
      {/* Bike Thumbnail */}
      <div
        className={`h-9 w-12 shrink-0 p-0.5 border flex items-center justify-center transition-colors ${
          isSelected
            ? 'border-neutral-700 bg-neutral-900'
            : 'border-[#e5e2d8] bg-[#faf9f5]'
        }`}
      >
        {model.heroImage ? (
          <img
            src={getImageUrl(model.heroImage)}
            alt={model.name}
            className="max-h-full max-w-full object-contain pointer-events-none"
          />
        ) : (
          <span className="text-[7px] font-mono text-neutral-400">NO IMG</span>
        )}
      </div>

      {/* Model Name & Category */}
      <div className="text-left">
        <div className="flex items-center gap-1.5">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isSelected ? 'bg-[#a82323]' : isElectric ? 'bg-green-600' : 'bg-neutral-400'
            }`}
          />
          <span className="font-serif font-bold text-sm leading-tight tracking-tight">
            {model.name}
          </span>
        </div>
        <div
          className={`font-mono text-[9px] uppercase tracking-wider mt-0.5 ${
            isSelected ? 'text-neutral-400' : 'text-neutral-500'
          }`}
        >
          {isElectric ? 'Electric' : 'Petrol'} • {model.priceEstimate || `PKR ${model.basePrice?.toLocaleString()}`}
        </div>
      </div>
    </button>
  )
}
