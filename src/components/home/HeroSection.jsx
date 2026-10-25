import React from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ZOOM_COLOR_VARIANTS, ZOOM_BATTERY_OPTIONS } from '@/config/zoomConfig'
import { useGsapHero } from '@/hooks/useGsapAnimation'

export function HeroSection({
  activeColor,
  onColorChange,
  activeBattery,
  onBatteryChange,
  onBookTestRide,
  onExploreSpecs,
}) {
  const heroRef = useGsapHero()
  const variant = ZOOM_COLOR_VARIANTS[activeColor] || ZOOM_COLOR_VARIANTS.red
  const battery = ZOOM_BATTERY_OPTIONS[activeBattery] || ZOOM_BATTERY_OPTIONS['30Ah']

  return (
    <section
      ref={heroRef}
      id="overview"
      className="relative overflow-hidden bg-[#faf9f5] border-b border-[#e5e2d8] py-14 sm:py-24"
    >
      <div className="container relative mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
          {/* Left Column: Editorial Storytelling & Typography */}
          <div className="lg:col-span-6 space-y-6">
            <div className="hero-badge flex items-center gap-2">
              <span className="font-mono text-[9px] tracking-[0.25em] text-[#a82323] uppercase font-bold">
                FLAGSHIP ELECTRIC MOTORCYCLE — 2026 EDITION
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="hero-title text-5xl sm:text-7xl lg:text-8xl font-serif font-black tracking-tight text-[#171717] leading-[0.92]">
                Full Amperage, <br />
                <span className="italic font-normal text-[#a82323]">Pure Electric Power.</span>
              </h1>
              <p className="hero-desc max-w-lg text-base sm:text-lg text-neutral-600 font-sans font-light leading-relaxed pt-2 border-l border-[#171717] pl-4">
                A mix of modern speed, inspired by classic 125 heritage. Super Power combines the beloved classic 125 backbone chassis with a 2000W high-torque brushless electric motor for zero emissions and instant acceleration.
              </p>
            </div>

            {/* Options & Specifications Box */}
            <div className="space-y-5 pt-3 border-y border-[#e5e2d8] py-6 font-sans">
              {/* Finish Selection */}
              <div>
                <div className="flex items-center justify-between mb-2.5 font-mono text-[10px] uppercase tracking-[0.18em]">
                  <span className="text-neutral-500">
                    Official Color: <strong className="text-[#171717] font-serif normal-case italic text-xs">{variant.name}</strong>
                  </span>
                  <span className="text-neutral-400">
                    [ OFFICIAL COLORWAY ]
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => onColorChange('red')}
                    className={`flex items-center justify-between border px-4 py-3 font-sans text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                      activeColor === 'red'
                        ? 'border-[#171717] bg-[#171717] text-[#faf9f5]'
                        : 'border-[#e5e2d8] bg-white text-neutral-800 hover:border-[#171717]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#dc2626] border border-white/50" />
                      <span>Crimson Red</span>
                    </div>
                    {activeColor === 'red' && <span className="font-serif italic text-xs lowercase">active</span>}
                  </button>

                  <button
                    type="button"
                    onClick={() => onColorChange('black')}
                    className={`flex items-center justify-between border px-4 py-3 font-sans text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                      activeColor === 'black'
                        ? 'border-[#171717] bg-[#171717] text-[#faf9f5]'
                        : 'border-[#e5e2d8] bg-white text-neutral-800 hover:border-[#171717]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#171717] border border-neutral-600" />
                      <span>Obsidian Black</span>
                    </div>
                    {activeColor === 'black' && <span className="font-serif italic text-xs lowercase">active</span>}
                  </button>
                </div>
              </div>

              {/* Energy Pack Option */}
              <div>
                <div className="flex items-center justify-between mb-2.5 font-mono text-[10px] uppercase tracking-[0.18em]">
                  <span className="text-neutral-500">
                    Energy Capacity: <strong className="text-[#171717] font-serif normal-case italic text-xs">{battery.capacity}</strong>
                  </span>
                  <span className="font-serif italic text-[#a82323] lowercase">
                    est. range {battery.range}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => onBatteryChange('30Ah')}
                    className={`border p-3.5 text-left transition-all cursor-pointer ${
                      activeBattery === '30Ah'
                        ? 'border-[#171717] bg-[#171717] text-[#faf9f5]'
                        : 'border-[#e5e2d8] bg-white text-neutral-700 hover:border-[#171717]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-sm font-bold">30Ah City Pack</span>
                      {activeBattery === '30Ah' && <Check className="h-3.5 w-3.5 text-[#a82323]" />}
                    </div>
                    <div className={`font-sans text-[11px] mt-1 ${activeBattery === '30Ah' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                      85 - 95 km • 3.5h Fast Charge
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => onBatteryChange('40Ah')}
                    className={`border p-3.5 text-left transition-all cursor-pointer ${
                      activeBattery === '40Ah'
                        ? 'border-[#171717] bg-[#171717] text-[#faf9f5]'
                        : 'border-[#e5e2d8] bg-white text-neutral-700 hover:border-[#171717]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-sm font-bold">40Ah Tourer Pack</span>
                      {activeBattery === '40Ah' && <Check className="h-3.5 w-3.5 text-[#a82323]" />}
                    </div>
                    <div className={`font-sans text-[11px] mt-1 ${activeBattery === '40Ah' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                      120 - 135 km • Long Range
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="hero-cta flex flex-wrap items-center gap-4 pt-2">
              <Button
                variant="bold"
                size="lg"
                onClick={onBookTestRide}
                className="gap-3 font-sans text-xs"
              >
                <span>Reserve ZOOM 2000W ({battery.priceEstimate})</span>
                <ArrowRight className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={onExploreSpecs}
                className="font-sans text-xs"
              >
                View Specifications
              </Button>
            </div>

            {/* Metric Strip */}
            <div className="grid grid-cols-4 gap-3 pt-3 border-t border-[#e5e2d8]">
              <div className="text-left">
                <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-400">Motor</div>
                <div className="font-serif text-2xl font-bold text-[#171717]">2000W</div>
                <div className="font-sans text-[10px] text-neutral-500">BLDC Hub</div>
              </div>
              <div className="text-left">
                <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-400">Velocity</div>
                <div className="font-serif text-2xl font-bold text-[#171717]">80 <span className="text-xs font-normal">km/h</span></div>
                <div className="font-sans text-[10px] text-neutral-500">Top Speed</div>
              </div>
              <div className="text-left">
                <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-400">Endurance</div>
                <div className="font-serif text-2xl font-bold text-[#a82323]">{battery.range.split(' ')[0]} <span className="text-xs font-normal">km</span></div>
                <div className="font-sans text-[10px] text-neutral-500">Per Charge</div>
              </div>
              <div className="text-left">
                <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-400">Chassis</div>
                <div className="font-serif text-2xl font-bold text-[#171717]">125cc</div>
                <div className="font-sans text-[10px] text-neutral-500">Backbone</div>
              </div>
            </div>
          </div>

          {/* Right Column: Figure Presentation */}
          <div className="hero-car-preview lg:col-span-6">
            <div className="relative border border-[#e5e2d8] bg-white p-6 shadow-sm">
              <div className="relative aspect-[16/11] overflow-hidden bg-[#faf9f5] border border-[#e5e2d8]">
                <img
                  key={activeColor}
                  src={variant.studioImage}
                  alt={`Super Power ZOOM 2000W - ${variant.name}`}
                  className="h-full w-full object-contain p-5 transition-all duration-300 animate-in fade-in"
                />

                <Badge
                  variant="outline"
                  className="absolute top-4 left-4 bg-white/90 font-serif italic normal-case tracking-normal text-xs"
                >
                  {variant.badge}
                </Badge>

                <div className="absolute bottom-4 right-4 bg-[#171717] text-[#faf9f5] px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em]">
                  SUPER POWER ZOOM 2000W
                </div>
              </div>

              {/* Caption & Details below Main Image */}
              <div className="mt-4 flex items-center justify-between border-t border-[#e5e2d8] pt-4 font-sans text-xs text-neutral-500">
                <span className="font-serif italic">
                  Studio profile of the Zoom 2000W electric motorcycle in {variant.name}.
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">
                  2026 EDITION
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
