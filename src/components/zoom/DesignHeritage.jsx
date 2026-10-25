import React from 'react'
import { Zap, Shield, Sparkles, Award } from 'lucide-react'

export function DesignHeritage() {
  return (
    <section id="heritage" className="py-20 bg-[#faf9f5] border-b border-[#e5e2d8]">
      <div className="container mx-auto px-4 sm:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-2xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-6 bg-[#a82323]" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#a82323] uppercase font-semibold">
              PHILOSOPHY & INSPIRATION
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-serif text-[#1a1918] tracking-tight leading-[1.05]">
            A Mix of Modern, <br />
            Inspired by <span className="italic font-normal text-[#a82323]">Classic 125 Heritage</span>
          </h2>
          <p className="text-base text-stone-600 font-serif italic leading-relaxed pt-2">
            Super Power took the most recognized, battle-tested motorcycle platform in our history—the 125cc commuter backbone—and reimagined it with clean 2000W pure electric muscle.
          </p>
        </div>

        {/* 3 Pillar Cards from the PDF */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="border border-[#e5e2d8] bg-white p-6 space-y-4 shadow-sm">
            <div className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#a82323]">
              01 // FAMILIAR HERITAGE
            </div>
            <div className="aspect-[16/10] overflow-hidden bg-[#faf9f5] border border-[#e5e2d8]">
              <img
                src="/images/zoom/red-lifestyle.jpg"
                alt="Cobblestone Lifestyle"
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="text-xl font-serif font-medium text-[#1a1918] tracking-tight">
              Adapting To Our <span className="italic">Tastes</span>
            </h3>
            <p className="text-xs font-serif italic text-stone-600 leading-relaxed">
              "Fresh yet somehow gives a feeling that we’ve seen this. Timeless silhouettes updated with high-voltage electrification."
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="border border-[#e5e2d8] bg-white p-6 space-y-4 shadow-sm">
            <div className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#a82323]">
              02 // AGGRESSIVE STYLING
            </div>
            <div className="aspect-[16/10] overflow-hidden bg-[#faf9f5] border border-[#e5e2d8]">
              <img
                src="/images/zoom/black-lifestyle.jpg"
                alt="Black Lifestyle"
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="text-xl font-serif font-medium text-[#1a1918] tracking-tight">
              Born To Be <span className="italic">Aggressive</span>
            </h3>
            <p className="text-xs font-serif italic text-stone-600 leading-relaxed">
              "Fits the personality of a product which is engineered for speed, high torque, and unapologetic presence on urban streets."
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="border border-[#e5e2d8] bg-white p-6 space-y-4 shadow-sm">
            <div className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#a82323]">
              03 // VINTAGE POP CULTURE
            </div>
            <div className="aspect-[16/10] overflow-hidden bg-[#faf9f5] border border-[#e5e2d8]">
              <img
                src="/images/zoom/zoom-comic-poster.jpg"
                alt="Pop Art Comic Poster"
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="text-xl font-serif font-medium text-[#1a1918] tracking-tight">
              Maximum Velocity <span className="italic">Demonstrated</span>
            </h3>
            <p className="text-xs font-serif italic text-stone-600 leading-relaxed">
              "Full Amperage! No Apologies! The electric revolution with rock-and-roll attitude and zero gasoline emissions."
            </p>
          </div>
        </div>

        {/* Sticker Graphics Engineering Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 border border-[#e5e2d8] bg-white p-8 shadow-sm">
          <div className="space-y-4">
            <div className="font-mono text-[10px] tracking-[0.2em] text-[#a82323] uppercase font-semibold">
              DECAL WORK & ERGONOMICS
            </div>
            <h3 className="text-2xl font-serif font-medium text-[#1a1918] tracking-tight">
              Triple-Zone Sticker <span className="italic font-normal text-[#a82323]">Architecture</span>
            </h3>
            <div className="space-y-3 font-sans text-xs text-stone-600 leading-relaxed">
              <div className="border-l border-[#a82323] pl-3.5">
                <strong className="text-[#1a1918] block font-serif text-sm">1. Fuel Tank Center Ribbon:</strong>
                The top view of the tank features a retro-styled center stripe running vertically with bold ZOOM lettering right to the filler cap.
              </div>
              <div className="border-l border-[#a82323] pl-3.5">
                <strong className="text-[#1a1918] block font-serif text-sm">2. Dual-Tone Side Gradient Decals:</strong>
                Retro vintage racing streaks blending into dynamic checkerboard speed flags along the tank flank.
              </div>
              <div className="border-l border-[#a82323] pl-3.5">
                <strong className="text-[#1a1918] block font-serif text-sm">3. Side Cover Power Pack Badge:</strong>
                SUPER POWER branding emblazoned on the battery bay covers with color-matched racing ribbons.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="border border-[#e5e2d8] bg-[#faf9f5] p-3 text-center">
              <img
                src="/images/zoom/tank-top-view.jpg"
                alt="Top Tank Stripe"
                className="h-40 w-full object-cover mb-2 border border-[#e5e2d8]"
              />
              <span className="font-mono text-[10px] uppercase font-semibold text-[#1a1918]">
                Tank Top Center Stripe
              </span>
            </div>

            <div className="border border-[#e5e2d8] bg-[#faf9f5] p-3 text-center">
              <img
                src="/images/zoom/red-tank-sticker.jpg"
                alt="Tank Decal Close Up"
                className="h-40 w-full object-contain mb-2 border border-[#e5e2d8] bg-white"
              />
              <span className="font-mono text-[10px] uppercase font-semibold text-[#1a1918]">
                Precision Decal Artwork
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
