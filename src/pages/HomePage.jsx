import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HeroSection } from '@/components/home/HeroSection'
import { ExploreFleetSection } from '@/components/home/ExploreFleetSection'
import { useVehicles } from '@/hooks/useVehicles'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HomePage({ onOpenBrochure }) {
  const [activeColor, setActiveColor] = useState('red')
  const [activeBattery, setActiveBattery] = useState('30Ah')
  const { vehicles, loading, error, refetch } = useVehicles()
  const navigate = useNavigate()

  const handleBookRide = () => {
    navigate('/order', {
      state: {
        selectedModel: { slug: 'zoom-2000w', name: 'Super Power ZOOM 2000W' },
        battery: activeBattery,
        color: activeColor,
      },
    })
  }

  const handleExploreSpecs = () => {
    navigate('/specs')
  }

  return (
    <div className="space-y-0">
      {/* Flagship Hero Spotlight */}
      <HeroSection
        activeColor={activeColor}
        onColorChange={setActiveColor}
        activeBattery={activeBattery}
        onBatteryChange={setActiveBattery}
        onBookTestRide={handleBookRide}
        onExploreSpecs={handleExploreSpecs}
      />

      {/* Fleet Portfolio Teaser (Direct from Backend - Pure dynamic, hidden completely when server is off) */}
      <ExploreFleetSection
        vehicles={vehicles}
        loading={loading}
        error={error}
        onRetry={refetch}
        onOpenBrochure={onOpenBrochure}
      />

      {/* Retro Heritage & Design Inspo Banner */}
      <section className="py-24 bg-[#f4f2ea] border-b border-[#e5e2d8]">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] tracking-[0.25em] text-[#a82323] uppercase font-bold">
                  DESIGN PHILOSOPHY // 125CC HERITAGE
                </span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-serif font-black tracking-tight text-[#171717] leading-[0.95]">
                A Mix of Modern, <br />
                Inspired by <span className="italic font-normal text-[#a82323]">Classic 125 Heritage</span>
              </h2>
              <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-sans font-light border-l border-[#171717] pl-4">
                "Fresh yet somehow gives a feeling that we’ve seen this. Adapting to our tastes."
                Super Power combined the beloved 125cc commuter frame with cutting-edge 2000W electric power.
              </p>
              <div className="flex gap-4 pt-2">
                <Link to="/heritage">
                  <Button variant="bold" size="lg" className="gap-2 font-sans text-xs">
                    <span>Explore Design Heritage</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 border border-[#e5e2d8] bg-white p-5 shadow-sm">
              <img
                src="/images/zoom/red-lifestyle.jpg"
                alt="Retro Heritage"
                className="w-full aspect-[16/10] object-cover border border-[#e5e2d8]"
              />
              <div className="mt-3 text-right">
                <span className="font-serif italic text-xs text-neutral-500">
                  The classic red 125cc chassis in urban transit.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
