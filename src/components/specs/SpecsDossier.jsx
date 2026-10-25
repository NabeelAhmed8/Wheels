import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getImageUrl } from '@/services/api'
import { getBikeImage } from '@/utils/vehicleUtils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  FileText,
  ShoppingCart,
  Zap,
  BatteryCharging,
  Cpu,
  Gauge,
  Sliders,
  ShieldCheck,
  Award,
} from 'lucide-react'

export function SpecsDossier({ activeBike, activeColor, onChangeActiveColor, onOpenBrochure }) {
  const navigate = useNavigate()
  if (!activeBike) return null

  const isZoom = activeBike.slug === 'zoom-2000w'
  const hasVariants = isZoom || (activeBike.colorVariants && activeBike.colorVariants.length > 1)
  const spotlightImage = getBikeImage(activeBike, activeColor)

  return (
    <section className="py-16 bg-[#faf9f5] border-b border-[#e5e2d8]">
      <div className="container mx-auto px-4 sm:px-8 space-y-12">
        {/* Spotlight Hero Banner for Selected Model */}
        <div className="border border-[#e5e2d8] bg-white p-6 sm:p-10 shadow-sm relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Studio Transparent Image */}
            <div className="lg:col-span-5 bg-[#faf9f5] border border-[#e5e2d8] aspect-[16/11] flex items-center justify-center p-6 relative overflow-hidden">
              <img
                key={spotlightImage}
                src={getImageUrl(spotlightImage)}
                alt={activeBike.name}
                className="h-full w-full object-contain transition-all duration-300 animate-in fade-in"
              />
              <Badge
                variant="outline"
                className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-[0.2em] bg-white/90"
              >
                {activeBike.category === 'electric' ? '100% PURE ELECTRIC' : 'PETROL POWER'}
              </Badge>
            </div>

            {/* Vehicle Title & Quick Specs Summary */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-400 font-bold">
                    {activeBike.brand} — {activeBike.edition || '2026 EDITION'}
                  </span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-[#171717] mt-1">
                  {activeBike.name}
                </h2>
                <p className="text-sm font-serif italic text-neutral-600 mt-2 border-l border-[#171717] pl-3">"{activeBike.tagline}"</p>
              </div>

              {/* Color Variant Selector */}
              {hasVariants && (
                <div className="flex items-center gap-3 pt-1 border-t border-[#e5e2d8]">
                  <span className="font-serif italic text-xs text-neutral-500">
                    Colorway:
                  </span>
                  <button
                    type="button"
                    onClick={() => onChangeActiveColor('red')}
                    className={`px-3 py-1 font-sans text-xs uppercase font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeColor === 'red'
                        ? 'bg-[#171717] text-[#faf9f5] border-[#171717]'
                        : 'bg-white text-neutral-800 border-[#e5e2d8] hover:border-[#171717]'
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full bg-[#dc2626]" />
                    <span>Crimson Red</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onChangeActiveColor('black')}
                    className={`px-3 py-1 font-sans text-xs uppercase font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeColor === 'black'
                        ? 'bg-[#171717] text-[#faf9f5] border-[#171717]'
                        : 'bg-white text-neutral-800 border-[#e5e2d8] hover:border-[#171717]'
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full bg-[#171717]" />
                    <span>Obsidian Black</span>
                  </button>
                </div>
              )}

              {activeBike.highlights && activeBike.highlights.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-y border-[#e5e2d8] py-4 font-sans text-xs">
                  {activeBike.highlights.slice(0, 4).map((hl, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <div className="font-mono text-[8px] uppercase tracking-[0.18em] text-neutral-400">0{idx + 1} — {hl.label}</div>
                      <div className="font-serif font-bold text-sm text-[#171717]">{hl.val}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div>
                  <div className="font-mono text-[10px] uppercase text-neutral-400">
                    Official Retail Price
                  </div>
                  <div className="font-mono text-xl font-black text-black">
                    {activeBike.priceEstimate || `PKR ${activeBike.basePrice?.toLocaleString()}`}
                  </div>
                </div>

                <div className="flex gap-3">
                  {activeBike.brochureImage && onOpenBrochure && (
                    <Button
                      variant="outline"
                      onClick={() => onOpenBrochure(activeBike)}
                      className="font-mono text-xs gap-1.5 cursor-pointer"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      <span>Official Sheet</span>
                    </Button>
                  )}

                  <Button
                    variant="bold"
                    onClick={() =>
                      navigate('/order', {
                        state: {
                          selectedModel: activeBike,
                          color: activeColor,
                        },
                      })
                    }
                    className="font-mono text-xs gap-1.5 cursor-pointer"
                  >
                    <ShoppingCart className="h-3.5 w-3.5" />
                    <span>Order This Model</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Granular 4-Column Technical Specification Dossier (Editorial Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Box 1: Powertrain & Performance */}
          <div className="border border-[#e5e2d8] bg-white p-6 space-y-4">
            <div className="flex items-center gap-2.5 border-b border-[#e5e2d8] pb-3">
              <div className="flex h-7 w-7 items-center justify-center bg-[#171717] text-[#faf9f5]">
                <Zap className="h-3.5 w-3.5 text-[#a82323]" />
              </div>
              <div>
                <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-neutral-400 block font-bold">I. DRIVE</span>
                <h3 className="font-serif font-bold text-sm text-[#171717] leading-none">
                  Powertrain
                </h3>
              </div>
            </div>

            <div className="space-y-3 font-sans text-xs">
              {activeBike.specs?.powertrain && activeBike.specs.powertrain.length > 0 ? (
                activeBike.specs.powertrain.map((row, i) => (
                  <div key={i} className="space-y-0.5 border-b border-[#f0eee6] pb-2">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 block">{row.label}</span>
                    <span className="font-serif font-semibold text-sm text-[#171717] block">{row.val}</span>
                  </div>
                ))
              ) : (
                activeBike.highlights?.slice(0, 3).map((hl, i) => (
                  <div key={i} className="space-y-0.5 border-b border-[#f0eee6] pb-2">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 block">{hl.label}</span>
                    <span className="font-serif font-semibold text-sm text-[#171717] block">{hl.val}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Box 2: Energy & Fuel */}
          <div className="border border-[#e5e2d8] bg-white p-6 space-y-4">
            <div className="flex items-center gap-2.5 border-b border-[#e5e2d8] pb-3">
              <div className="flex h-7 w-7 items-center justify-center bg-[#171717] text-[#faf9f5]">
                <BatteryCharging className="h-3.5 w-3.5 text-[#a82323]" />
              </div>
              <div>
                <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-neutral-400 block font-bold">II. ENERGY</span>
                <h3 className="font-serif font-bold text-sm text-[#171717] leading-none">
                  {activeBike.category === 'electric' ? 'Lithium Energy Pack' : 'Fuel Dynamics'}
                </h3>
              </div>
            </div>

            <div className="space-y-3 font-sans text-xs">
              {activeBike.specs?.energy && activeBike.specs.energy.length > 0 ? (
                activeBike.specs.energy.map((row, i) => (
                  <div key={i} className="space-y-0.5 border-b border-[#f0eee6] pb-2">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 block">{row.label}</span>
                    <span className="font-serif font-semibold text-sm text-[#171717] block">{row.val}</span>
                  </div>
                ))
              ) : (
                activeBike.highlights?.slice(1, 4).map((hl, i) => (
                  <div key={i} className="space-y-0.5 border-b border-[#f0eee6] pb-2">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 block">{hl.label}</span>
                    <span className="font-serif font-semibold text-sm text-[#171717] block">{hl.val}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Box 3: Chassis & Brakes */}
          <div className="border border-[#e5e2d8] bg-white p-6 space-y-4">
            <div className="flex items-center gap-2.5 border-b border-[#e5e2d8] pb-3">
              <div className="flex h-7 w-7 items-center justify-center bg-[#171717] text-[#faf9f5]">
                <Sliders className="h-3.5 w-3.5 text-[#a82323]" />
              </div>
              <div>
                <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-neutral-400 block font-bold">III. CHASSIS</span>
                <h3 className="font-serif font-bold text-sm text-[#171717] leading-none">
                  Chassis & Braking
                </h3>
              </div>
            </div>

            <div className="space-y-3 font-sans text-xs">
              {activeBike.specs?.chassis && activeBike.specs.chassis.length > 0 ? (
                activeBike.specs.chassis.map((row, i) => (
                  <div key={i} className="space-y-0.5 border-b border-[#f0eee6] pb-2">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 block">{row.label}</span>
                    <span className="font-serif font-semibold text-sm text-[#171717] block">{row.val}</span>
                  </div>
                ))
              ) : (
                <div className="text-[11px] text-neutral-500 font-sans font-light">
                  Heavy-duty high-tensile backbone chassis with hydraulic dual suspension.
                </div>
              )}
            </div>
          </div>

          {/* Box 4: Electronics & Warranty */}
          <div className="border border-[#e5e2d8] bg-white p-6 space-y-4">
            <div className="flex items-center gap-2.5 border-b border-[#e5e2d8] pb-3">
              <div className="flex h-7 w-7 items-center justify-center bg-[#171717] text-[#faf9f5]">
                <Cpu className="h-3.5 w-3.5 text-[#a82323]" />
              </div>
              <div>
                <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-neutral-400 block font-bold">IV. ELECTRONICS</span>
                <h3 className="font-serif font-bold text-sm text-[#171717] leading-none">
                  Electronics & Safety
                </h3>
              </div>
            </div>

            <div className="space-y-3 font-sans text-xs">
              {activeBike.specs?.electronics && activeBike.specs.electronics.length > 0 ? (
                activeBike.specs.electronics.map((row, i) => (
                  <div key={i} className="space-y-0.5 border-b border-[#f0eee6] pb-2">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 block">{row.label}</span>
                    <span className="font-serif font-semibold text-sm text-[#171717] block">{row.val}</span>
                  </div>
                ))
              ) : (
                <div className="space-y-2.5 font-sans">
                  <div className="flex items-center gap-2 text-[#171717] font-serif font-semibold">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-[#a82323]" />
                    <span>3-Year Factory Warranty</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-600 font-serif">
                    <Award className="h-4 w-4 shrink-0 text-[#a82323]" />
                    <span>IP67 Weather Sealed Harness</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
