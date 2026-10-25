import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react'
import { useMoveableScroll } from '@/hooks/useMoveableScroll'
import { SpecsComparisonCard } from '@/components/specs/SpecsComparisonCard'

/**
 * SpecsComparisonTable
 * Single Responsibility: Renders a moveable side-by-side comparison matrix across all models,
 * controlled via smooth arrow buttons and drag navigation (zero native horizontal scrollbar).
 */
export function SpecsComparisonTable({ vehicles = [], onSelectModel }) {
  const [filter, setFilter] = useState('all') // 'all' | 'electric' | 'petrol'
  const {
    containerRef,
    canScrollLeft,
    canScrollRight,
    scrollLeft,
    scrollRight,
    isCurrentlyDragging,
    dragProps,
  } = useMoveableScroll({ step: 340 })

  if (!vehicles || vehicles.length === 0) {
    return null
  }

  const displayedVehicles = vehicles.filter((v) => {
    if (filter === 'all') return true
    return v.category === filter
  })

  return (
    <section className="py-20 bg-[#faf9f5] border-b border-[#e5e2d8]">
      <div className="container mx-auto px-4 sm:px-8 space-y-8">
        {/* Header Strip with Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#e5e2d8] pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] tracking-[0.25em] text-[#a82323] uppercase font-bold">
                TECHNICAL COMPARISON // ALL FLEET MODELS
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-[#171717]">
              Side-By-Side Technical Benchmark
            </h2>
            <p className="text-sm font-sans font-light text-neutral-600 max-w-xl">
              Compare power output, top velocity, lithium capacity, and chassis dynamics across all {vehicles.length} production models.
            </p>
          </div>

          {/* Filter Pills & Moveable Slider Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Tabs */}
            <div className="flex items-center border border-[#e5e2d8] bg-white p-1 font-mono text-[10px] uppercase">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 transition-colors cursor-pointer ${
                  filter === 'all'
                    ? 'bg-[#171717] text-white font-bold'
                    : 'text-neutral-600 hover:text-[#171717]'
                }`}
              >
                All ({vehicles.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter('electric')}
                className={`px-3 py-1.5 transition-colors cursor-pointer ${
                  filter === 'electric'
                    ? 'bg-[#171717] text-white font-bold'
                    : 'text-neutral-600 hover:text-[#171717]'
                }`}
              >
                Electric
              </button>
              <button
                type="button"
                onClick={() => setFilter('petrol')}
                className={`px-3 py-1.5 transition-colors cursor-pointer ${
                  filter === 'petrol'
                    ? 'bg-[#171717] text-white font-bold'
                    : 'text-neutral-600 hover:text-[#171717]'
                }`}
              >
                Petrol
              </button>
            </div>

            {/* Moveable Navigation Controls */}
            <div className="flex items-center gap-1.5">
              <span className="hidden sm:inline font-mono text-[9px] uppercase tracking-wider text-neutral-400">
                Move Models
              </span>
              <div className="flex items-center border border-[#e5e2d8] bg-white p-1 shadow-2xs">
                <button
                  type="button"
                  onClick={scrollLeft}
                  disabled={!canScrollLeft}
                  aria-label="Previous model card"
                  className={`flex h-8 w-8 items-center justify-center transition-colors cursor-pointer ${
                    canScrollLeft
                      ? 'text-[#171717] hover:bg-[#171717] hover:text-white'
                      : 'text-neutral-300 cursor-not-allowed'
                  }`}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="h-4 w-px bg-[#e5e2d8]" />
                <button
                  type="button"
                  onClick={scrollRight}
                  disabled={!canScrollRight}
                  aria-label="Next model card"
                  className={`flex h-8 w-8 items-center justify-center transition-colors cursor-pointer ${
                    canScrollRight
                      ? 'text-[#171717] hover:bg-[#171717] hover:text-white'
                      : 'text-neutral-300 cursor-not-allowed'
                  }`}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Moveable Carousel Track (Zero Horizontal Scrollbar) */}
        <div
          ref={containerRef}
          {...dragProps}
          className={`flex gap-6 overflow-x-auto no-scrollbar py-2 px-1 select-none ${
            isCurrentlyDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {displayedVehicles.map((bike) => (
            <SpecsComparisonCard
              key={bike._id || bike.slug}
              bike={bike}
              onSelectModel={onSelectModel}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
