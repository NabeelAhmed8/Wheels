import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMoveableScroll } from '@/hooks/useMoveableScroll'
import { SpecsModelTabCard } from '@/components/specs/SpecsModelTabCard'

/**
 * SpecsModelTabs
 * Single Responsibility: Renders a smooth, moveable vehicle selector strip
 * with arrow controls and drag support (zero native scrollbars).
 */
export function SpecsModelTabs({ vehicles = [], selectedModelId, onSelectModel }) {
  const {
    containerRef,
    canScrollLeft,
    canScrollRight,
    scrollLeft,
    scrollRight,
    isCurrentlyDragging,
    dragProps,
  } = useMoveableScroll({ step: 260 })

  if (!vehicles || vehicles.length === 0) {
    return null
  }

  const selectedIndex = vehicles.findIndex(
    (m) => m.slug === selectedModelId || m._id === selectedModelId
  )
  const currentNum = selectedIndex >= 0 ? selectedIndex + 1 : 1

  return (
    <div className="sticky top-20 z-30 bg-[#faf9f5]/95 backdrop-blur-md border-b border-[#e5e2d8] shadow-xs">
      <div className="container mx-auto px-4 sm:px-8 py-3">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between gap-4 mb-2">
          {/* Section Indicator */}
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-neutral-500">
            <span className="font-bold text-[#171717]">Select Vehicle Blueprint</span>
            <span className="text-neutral-300">/</span>
            <span className="text-[#a82323] font-semibold">
              0{currentNum} of 0{vehicles.length}
            </span>
          </div>

          {/* Moveable Navigation Controls */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline font-mono text-[9px] uppercase tracking-widest text-neutral-400">
              Slide / Drag To Move
            </span>
            <div className="flex items-center gap-1 border border-[#e5e2d8] bg-white p-0.5 shadow-2xs">
              <button
                type="button"
                onClick={scrollLeft}
                disabled={!canScrollLeft}
                aria-label="Slide left"
                className={`flex h-6 w-6 items-center justify-center transition-colors cursor-pointer ${
                  canScrollLeft
                    ? 'text-[#171717] hover:bg-[#171717] hover:text-white'
                    : 'text-neutral-300 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <span className="h-3 w-px bg-[#e5e2d8]" />
              <button
                type="button"
                onClick={scrollRight}
                disabled={!canScrollRight}
                aria-label="Slide right"
                className={`flex h-6 w-6 items-center justify-center transition-colors cursor-pointer ${
                  canScrollRight
                    ? 'text-[#171717] hover:bg-[#171717] hover:text-white'
                    : 'text-neutral-300 cursor-not-allowed'
                }`}
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Moveable Carousel Track (Zero Scrollbar) */}
        <div
          ref={containerRef}
          {...dragProps}
          className={`flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1 select-none ${
            isCurrentlyDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {vehicles.map((model) => (
            <SpecsModelTabCard
              key={model._id || model.slug}
              model={model}
              isSelected={
                model.slug === selectedModelId || model._id === selectedModelId
              }
              onSelect={onSelectModel}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
