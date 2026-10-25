import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ZOOM_COLOR_VARIANTS, ZOOM_BATTERY_OPTIONS } from '@/config/zoomConfig'
import { ArrowRight, Check, Zap, Gauge, BatteryCharging, ShoppingCart, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { InteractiveViewer } from '@/components/zoom/InteractiveViewer'
import { SpecsTable } from '@/components/zoom/SpecsTable'

export function ZoomDetailsPage() {
  const [activeColor, setActiveColor] = useState('red')
  const [activeBattery, setActiveBattery] = useState('30Ah')
  const navigate = useNavigate()

  const variant = ZOOM_COLOR_VARIANTS[activeColor] || ZOOM_COLOR_VARIANTS.red
  const battery = ZOOM_BATTERY_OPTIONS[activeBattery] || ZOOM_BATTERY_OPTIONS['30Ah']

  return (
    <div className="min-h-screen bg-[#faf9f5]">
      {/* Editorial Title Header */}
      <div className="bg-[#f4f2ea] border-b border-[#e5e2d8] py-14">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="inline-block h-1.5 w-6 bg-[#a82323]" />
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#a82323] uppercase font-semibold">
                  SUPER POWER MOTORCYCLE // 2026 EDITION
                </span>
                <span className="h-1 w-1 rounded-full bg-stone-400" />
                <span className="font-mono text-[10px] text-stone-500 uppercase tracking-widest">
                  CONVERTED EV SPECIAL
                </span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-serif text-[#1a1918] tracking-tight leading-[1.05]">
                ZOOM 2000W <span className="italic font-normal text-[#a82323]">Electric</span>
              </h1>
              <p className="text-sm font-serif italic text-stone-600 border-l border-[#a82323] pl-4 max-w-xl">
                A mix of modern, inspired by classic 125 heritage. 2000W BLDC hub motor on the legendary 125cc backbone frame.
              </p>
            </div>

            <Button
              variant="bold"
              size="lg"
              onClick={() =>
                navigate('/order', {
                  state: {
                    selectedModel: { slug: 'zoom-2000w', name: 'Super Power ZOOM 2000W' },
                    battery: activeBattery,
                    color: activeColor,
                  },
                })
              }
              className="gap-2 font-sans text-xs tracking-[0.18em] shrink-0 cursor-pointer"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Reserve ZOOM 2000W</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Interactive Studio Presentation */}
      <section className="py-16 border-b border-[#e5e2d8] bg-[#faf9f5]">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Visual Studio Floating Bike */}
            <div className="lg:col-span-7">
              <div className="border border-[#e5e2d8] bg-white p-6 sm:p-8 shadow-sm">
                <div className="relative aspect-[16/10] overflow-hidden flex items-center justify-center p-4 bg-[#faf9f5]">
                  <img
                    key={activeColor}
                    src={variant.studioImage}
                    alt={`ZOOM 2000W - ${variant.name}`}
                    className="h-full w-full object-contain drop-shadow-sm transition-all duration-500 animate-in fade-in"
                  />

                  <Badge
                    variant="default"
                    className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-widest bg-[#1a1918] text-[#faf9f5]"
                  >
                    {variant.badge}
                  </Badge>

                  <div className="absolute bottom-3 right-3 bg-white/95 border border-[#e5e2d8] px-3 py-1 font-mono text-[10px] uppercase text-[#1a1918] font-bold">
                    CHASSIS: CONVERTED 125CC
                  </div>
                </div>

                {/* Sub-strip with decals */}
                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[#e5e2d8] pt-4 font-mono">
                  <div className="border border-[#e5e2d8] bg-[#faf9f5] p-2.5 flex items-center gap-3">
                    <img
                      src={variant.tankStickerImage}
                      alt="Tank Decals"
                      className="h-10 w-24 object-contain bg-white border border-[#e5e2d8]"
                    />
                    <div>
                      <div className="text-[9px] uppercase text-stone-500">
                        Side Tank Graphic
                      </div>
                      <div className="text-xs font-serif font-medium text-[#1a1918]">
                        ZOOM 2000W Ribbon
                      </div>
                    </div>
                  </div>

                  <div className="border border-[#e5e2d8] bg-[#faf9f5] p-2.5 flex items-center gap-3">
                    <img
                      src="/images/zoom/tank-top-view.jpg"
                      alt="Top Stripe"
                      className="h-10 w-24 object-cover bg-white border border-[#e5e2d8]"
                    />
                    <div>
                      <div className="text-[9px] uppercase text-stone-500">
                        Tank Center Decal
                      </div>
                      <div className="text-xs font-serif font-medium text-[#1a1918]">
                        Top Center Stripe
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Configurator */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#a82323] uppercase font-semibold">
                  CUSTOMIZE SPECIFICATION
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#1a1918] tracking-tight">
                  Configure Your <span className="italic font-normal text-[#a82323]">Machine</span>
                </h2>
                <p className="text-xs font-serif italic text-stone-600">
                  Select your desired finish and battery pack to view real-world range and charging performance.
                </p>
              </div>

              {/* Color Select */}
              <div className="space-y-2 border-t border-[#e5e2d8] pt-4">
                <div className="flex justify-between font-mono text-xs uppercase">
                  <span className="text-stone-500">Colorway:</span>
                  <span className="font-bold text-[#1a1918]">{variant.name}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveColor('red')}
                    className={`flex items-center gap-2 border p-3 font-mono text-xs uppercase font-bold transition-all cursor-pointer ${
                      activeColor === 'red'
                        ? 'border-[#a82323] bg-[#a82323] text-white shadow-sm'
                        : 'border-[#e5e2d8] bg-white text-stone-700 hover:border-[#1a1918]'
                    }`}
                  >
                    <span className="h-3.5 w-3.5 rounded-full bg-[#a82323] border border-white" />
                    <span>Crimson Red</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveColor('black')}
                    className={`flex items-center gap-2 border p-3 font-mono text-xs uppercase font-bold transition-all cursor-pointer ${
                      activeColor === 'black'
                        ? 'border-[#1a1918] bg-[#1a1918] text-[#faf9f5] shadow-sm'
                        : 'border-[#e5e2d8] bg-white text-stone-700 hover:border-[#1a1918]'
                    }`}
                  >
                    <span className="h-3.5 w-3.5 rounded-full bg-stone-900 border border-stone-600" />
                    <span>Obsidian Black</span>
                  </button>
                </div>
              </div>

              {/* Battery Capacity Select */}
              <div className="space-y-2 border-t border-[#e5e2d8] pt-4">
                <div className="flex justify-between font-mono text-xs uppercase">
                  <span className="text-stone-500">Lithium Energy Storage:</span>
                  <span className="font-bold text-[#a82323]">{battery.range} Range</span>
                </div>
                <div className="space-y-2 font-mono">
                  <button
                    type="button"
                    onClick={() => setActiveBattery('30Ah')}
                    className={`w-full border p-4 text-left transition-all cursor-pointer ${
                      activeBattery === '30Ah'
                        ? 'border-[#1a1918] bg-white ring-1 ring-[#1a1918]'
                        : 'border-[#e5e2d8] bg-white text-stone-600 hover:border-stone-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase">72V 30Ah City Pack</span>
                      <span className="font-bold text-[#1a1918]">{battery.priceEstimate}</span>
                    </div>
                    <div className="text-[11px] text-stone-500 mt-1">
                      85 - 95 km Range • 3.5 Hours Charging Duration
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveBattery('40Ah')}
                    className={`w-full border p-4 text-left transition-all cursor-pointer ${
                      activeBattery === '40Ah'
                        ? 'border-[#1a1918] bg-white ring-1 ring-[#1a1918]'
                        : 'border-[#e5e2d8] bg-white text-stone-600 hover:border-stone-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase">72V 40Ah Tourer Pack (Extended)</span>
                      <span className="font-bold text-[#1a1918]">{ZOOM_BATTERY_OPTIONS['40Ah'].priceEstimate}</span>
                    </div>
                    <div className="text-[11px] text-stone-500 mt-1">
                      120 - 135 km Range • 4.5 Hours Charging Duration
                    </div>
                  </button>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-3 pt-4 border-t border-[#e5e2d8]">
                <Button
                  variant="bold"
                  size="lg"
                  onClick={() =>
                    navigate('/order', {
                      state: {
                        selectedModel: { slug: 'zoom-2000w', name: 'Super Power ZOOM 2000W' },
                        battery: activeBattery,
                        color: activeColor,
                      },
                    })
                  }
                  className="w-full gap-2 font-sans text-xs tracking-[0.18em] py-3 cursor-pointer"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Order This Configuration ({battery.priceEstimate})</span>
                </Button>

                <div className="flex justify-center font-mono text-xs text-stone-500 pt-1">
                  <Link to="/specs" className="underline hover:text-black">
                    Compare Full Specs Table →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Anatomy & Gallery */}
      <InteractiveViewer />

      {/* Engineering Specs Comparison Table */}
      <SpecsTable />
    </div>
  )
}
