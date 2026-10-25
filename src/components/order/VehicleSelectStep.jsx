import React from 'react'
import { getImageUrl } from '@/services/api'
import { getBikeImage, formatPKR } from '@/utils/vehicleUtils'
import { Badge } from '@/components/ui/badge'
import { Sparkles, CheckCircle2 } from 'lucide-react'

export function VehicleSelectStep({
  vehicles,
  selectedModelId,
  onSelectModel,
  zoomColor,
  onChangeZoomColor,
  zoomBattery,
  onChangeZoomBattery,
  otoxBattery,
  onChangeOtoxBattery,
}) {
  const selectedVehicle = vehicles.find((v) => v.slug === selectedModelId || v._id === selectedModelId)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-[#e5e2d8] pb-3">
        <div className="font-mono text-xs uppercase tracking-[0.18em] text-[#1a1918] font-bold">
          Step 1: Select Your Vehicle
        </div>
        <span className="font-mono text-[10px] uppercase text-stone-400">
          {vehicles.length} Available Models
        </span>
      </div>

      {vehicles.length === 0 ? (
        <div className="border border-[#e5e2d8] bg-white p-6 text-center font-mono text-xs text-stone-500">
          No vehicles currently available for order.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {vehicles.map((bike) => {
            const isSelected = bike.slug === selectedModelId || bike._id === selectedModelId
            const displayColor = isSelected ? zoomColor : 'red'
            const displayImg = getBikeImage(bike, displayColor)

            return (
              <button
                key={bike._id || bike.slug}
                type="button"
                onClick={() => onSelectModel(bike.slug)}
                className={`text-left p-3.5 border transition-all flex items-center gap-3.5 cursor-pointer ${
                  isSelected
                    ? 'border-[#1a1918] bg-[#1a1918] text-[#faf9f5] shadow-sm ring-1 ring-[#1a1918]'
                    : 'border-[#e5e2d8] bg-white text-[#1a1918] hover:border-[#1a1918]'
                }`}
              >
                <div className="h-16 w-20 flex-shrink-0 bg-white border border-[#e5e2d8] p-1 flex items-center justify-center">
                  <img
                    src={getImageUrl(displayImg)}
                    alt={bike.name}
                    className="max-h-full max-w-full object-contain transition-all duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 font-mono">
                    <span className="text-[9px] uppercase tracking-wider opacity-70">
                      {bike.brand}
                    </span>
                    <Badge
                      variant="outline"
                      className={`text-[8px] py-0 px-1 font-mono uppercase ${
                        isSelected ? 'border-stone-600 text-stone-300' : 'border-[#e5e2d8] text-stone-600'
                      }`}
                    >
                      {bike.category}
                    </Badge>
                  </div>
                  <div className="font-serif font-medium text-sm truncate mt-0.5">
                    {bike.name}
                  </div>
                  <div className={`text-xs font-mono font-bold mt-1 ${isSelected ? 'text-[#e5e2d8]' : 'text-[#a82323]'}`}>
                    {formatPKR(bike.basePrice)}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      )}

      {/* Model-Specific Configuration Modifiers */}
      {selectedVehicle?.slug === 'zoom-2000w' && (
        <div className="border border-[#e5e2d8] bg-white p-4 space-y-4 font-mono text-xs">
          {/* Color Switcher */}
          <div className="space-y-1.5">
            <span className="uppercase text-stone-500 text-[10px] block">
              Official Color Edition:
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onChangeZoomColor('red')}
                className={`flex items-center gap-2 px-3 py-1.5 border cursor-pointer transition-all ${
                  zoomColor === 'red' ? 'border-[#a82323] bg-[#a82323] text-white font-bold' : 'border-[#e5e2d8] bg-white text-[#1a1918]'
                }`}
              >
                <span className="h-2.5 w-2.5 rounded-full bg-[#a82323] border border-white" />
                <span>Crimson Red</span>
              </button>
              <button
                type="button"
                onClick={() => onChangeZoomColor('black')}
                className={`flex items-center gap-2 px-3 py-1.5 border cursor-pointer transition-all ${
                  zoomColor === 'black' ? 'border-[#1a1918] bg-[#1a1918] text-white font-bold' : 'border-[#e5e2d8] bg-white text-[#1a1918]'
                }`}
              >
                <span className="h-2.5 w-2.5 rounded-full bg-black border border-white" />
                <span>Obsidian Black</span>
              </button>
            </div>
          </div>

          {/* Battery Pack Selection */}
          <div className="space-y-1.5">
            <span className="uppercase text-stone-500 text-[10px] block">
              Lithium Energy Storage:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <label
                className={`flex items-center justify-between p-2.5 border cursor-pointer ${
                  zoomBattery === '30Ah' ? 'border-[#1a1918] bg-[#faf9f5] ring-1 ring-[#1a1918]' : 'border-[#e5e2d8] bg-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="zoomBattery"
                    checked={zoomBattery === '30Ah'}
                    onChange={() => onChangeZoomBattery('30Ah')}
                  />
                  <span>72V 30Ah (85-95 km)</span>
                </div>
                <span className="font-bold">PKR 385,000</span>
              </label>

              <label
                className={`flex items-center justify-between p-2.5 border cursor-pointer ${
                  zoomBattery === '40Ah' ? 'border-[#1a1918] bg-[#faf9f5] ring-1 ring-[#1a1918]' : 'border-[#e5e2d8] bg-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="zoomBattery"
                    checked={zoomBattery === '40Ah'}
                    onChange={() => onChangeZoomBattery('40Ah')}
                  />
                  <span>72V 40Ah Long Range (120-135 km)</span>
                </div>
                <span className="font-bold">PKR 435,000</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {selectedVehicle?.slug === 'oto-x-dimen' && (
        <div className="border border-[#e5e2d8] bg-white p-4 space-y-2 font-mono text-xs">
          <span className="uppercase text-stone-500 text-[10px] block">
            Battery Configuration:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <label
              className={`flex items-center justify-between p-2.5 border cursor-pointer ${
                otoxBattery === 'single' ? 'border-[#1a1918] bg-[#faf9f5] ring-1 ring-[#1a1918]' : 'border-[#e5e2d8] bg-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="otoxBattery"
                  checked={otoxBattery === 'single'}
                  onChange={() => onChangeOtoxBattery('single')}
                />
                <span>Single 72V 38Ah (70-90 km)</span>
              </div>
              <span className="font-bold">{formatPKR(selectedVehicle.basePrice)}</span>
            </label>

            <label
              className={`flex items-center justify-between p-2.5 border cursor-pointer ${
                otoxBattery === 'dual' ? 'border-[#1a1918] bg-[#faf9f5] ring-1 ring-[#1a1918]' : 'border-[#e5e2d8] bg-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="otoxBattery"
                  checked={otoxBattery === 'dual'}
                  onChange={() => onChangeOtoxBattery('dual')}
                />
                <span>Dual 72V 38Ah (+PKR 70,000)</span>
              </div>
              <span className="font-bold">{formatPKR(selectedVehicle.basePrice + 70000)}</span>
            </label>
          </div>
        </div>
      )}
    </div>
  )
}
