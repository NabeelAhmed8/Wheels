import React from 'react'
import { Link } from 'react-router-dom'
import { DesignHeritage } from '@/components/zoom/DesignHeritage'
import { InteractiveViewer } from '@/components/zoom/InteractiveViewer'
import { ArrowRight, Sparkles, Shield, Cpu, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeritagePage() {
  return (
    <div className="min-h-screen bg-[#faf9f5]">
      {/* Editorial Page Header */}
      <div className="bg-[#f4f2ea] border-b border-[#e5e2d8] py-16">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-6 bg-[#a82323]" />
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#a82323] uppercase font-semibold">
                DESIGN PHILOSOPHY & VISUAL ANATOMY
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-[#1a1918] tracking-tight leading-[1.05]">
              Retro Heritage, <br />
              <span className="italic font-normal text-[#a82323]">Pure Electric Soul</span>
            </h1>
            <p className="text-sm font-serif italic text-stone-600 border-l border-[#a82323] pl-4 max-w-xl">
              An homage to iconic classic 125 ergonomics married with high-torque 2000W brushless electric performance. Explore chassis evolution and official graphics.
            </p>
          </div>
        </div>
      </div>

      {/* Main Philosophy Pillars */}
      <DesignHeritage />

      {/* High-Resolution Decal & Visual Inspector */}
      <InteractiveViewer />

      {/* Engineering Philosophy Dossier */}
      <section className="py-20 bg-[#faf9f5] border-b border-[#e5e2d8]">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="border border-[#e5e2d8] bg-white p-8 sm:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="font-mono text-[10px] tracking-[0.2em] text-[#a82323] uppercase font-semibold">
                  [ 125CC CONVERSION BLUEPRINT ]
                </div>
                <h3 className="text-2xl sm:text-4xl font-serif font-medium text-[#1a1918] tracking-tight">
                  Why Convert The Historic <span className="italic font-normal text-[#a82323]">125cc Chassis?</span>
                </h3>
                <p className="text-sm text-stone-600 font-sans leading-relaxed">
                  Millions of riders across Pakistan know every bolt, vibration, and turn of the classic 125cc tubular backbone frame. By preserving this proven geometry while replacing ICE vibrations with a silent 72V 2000W hub motor, we deliver instant familiarity with revolutionary zero-maintenance electric efficiency.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 font-mono">
                  <div className="border border-[#e5e2d8] bg-[#faf9f5] p-4">
                    <div className="font-serif text-3xl font-bold text-[#1a1918]">100%</div>
                    <div className="text-[10px] uppercase text-stone-500 mt-1">
                      Familiar Seating & Handling
                    </div>
                  </div>
                  <div className="border border-[#e5e2d8] bg-[#faf9f5] p-4">
                    <div className="font-serif text-3xl font-bold text-[#a82323]">0 dB</div>
                    <div className="text-[10px] uppercase text-stone-500 mt-1">
                      Whisper-Quiet Electric Drive
                    </div>
                  </div>
                  <div className="border border-[#e5e2d8] bg-[#faf9f5] p-4">
                    <div className="font-serif text-3xl font-bold text-[#1a1918]">72V</div>
                    <div className="text-[10px] uppercase text-stone-500 mt-1">
                      Direct Sine-Wave Output
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3.5 border-t lg:border-t-0 lg:border-l border-[#e5e2d8] pt-6 lg:pt-0 lg:pl-8">
                <div className="font-mono text-xs uppercase tracking-wider text-stone-500">
                  Ready to experience the ride?
                </div>
                <Link to="/zoom-2000w">
                  <Button variant="outline" className="w-full justify-between font-sans text-xs tracking-[0.18em]">
                    <span>Inspect ZOOM 2000W</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
                <Link to="/specs">
                  <Button variant="outline" className="w-full justify-between font-sans text-xs tracking-[0.18em]">
                    <span>View Specifications</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
                <Link to="/order">
                  <Button variant="bold" className="w-full justify-between font-sans text-xs tracking-[0.18em]">
                    <span>Order Online</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
