import React from 'react'
import { Link } from 'react-router-dom'
import { getImageUrl } from '@/services/api'
import { Button } from '@/components/ui/button'
import { ArrowRight, ShoppingCart, FileText } from 'lucide-react'

export function ExploreFleetSection({
  vehicles = [],
  loading = false,
  error = null,
  onOpenBrochure,
}) {
  // Pure backend rule: Agar server off ho, error ho, loading ho, ya backend se koi data na aaye,
  // to ye poora section DOM se completely hide ho jaye (return null).
  if (loading || error || !vehicles || vehicles.length === 0) {
    return null
  }

  return (
    <section className="py-24 bg-[#faf9f5] border-b border-[#e5e2d8]">
      <div className="container mx-auto px-4 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#e5e2d8] pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] tracking-[0.25em] text-[#a82323] uppercase font-bold">
                OFFICIAL 2026 LINEUP
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-[#171717]">
              Explore The Complete Fleet
            </h2>
            <p className="text-sm font-sans text-neutral-600 font-light max-w-lg">
              Explore our 2026 lineup of high-torque electric motorcycles, naked roadsters, and high-performance touring machines.
            </p>
          </div>
          <Link to="/fleet">
            <Button variant="bold" size="sm" className="gap-2 font-sans text-xs">
              <span>View All {vehicles.length} Models</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {/* Real Backend Vehicles Grid (Editorial Feature Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.slice(0, 3).map((bike, idx) => (
            <div
              key={bike._id || bike.slug}
              className="group border border-[#e5e2d8] bg-white flex flex-col justify-between transition-all duration-300 hover:border-[#171717] hover:shadow-md"
            >
              <div>
                {/* Visual Plate Header */}
                <div className="relative aspect-[16/11] overflow-hidden bg-[#faf9f5] border-b border-[#e5e2d8] flex items-center justify-center p-6">
                  <div className="absolute top-4 left-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-400">
                    <span className="font-serif italic text-neutral-800 lowercase text-xs font-normal">no.</span>
                    <span className="font-bold text-[#171717]">0{idx + 1}</span>
                    <span>—</span>
                    <span>{bike.category?.toUpperCase()}</span>
                  </div>

                  {bike.heroImage ? (
                    <img
                      src={getImageUrl(bike.heroImage)}
                      alt={bike.name}
                      className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="font-mono text-xs text-neutral-400">NO IMAGE</div>
                  )}
                </div>

                {/* Body Content */}
                <div className="p-7 space-y-3">
                  <div className="font-mono text-[9px] tracking-[0.2em] text-neutral-400 uppercase">
                    {bike.brand} — {bike.edition || '2026 EDITION'}
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#171717] group-hover:text-[#a82323] transition-colors">
                    {bike.name}
                  </h3>
                  {bike.tagline && (
                    <p className="text-sm font-serif italic text-neutral-600 line-clamp-2">
                      "{bike.tagline}"
                    </p>
                  )}
                  <div className="pt-2 font-serif text-lg font-bold text-[#171717]">
                    {bike.priceEstimate || `PKR ${bike.basePrice?.toLocaleString()}`}
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-7 pt-0 border-t border-[#f0eee6] bg-white">
                <div className="flex items-center justify-between pt-4">
                  {bike.brochureImage && onOpenBrochure ? (
                    <button
                      type="button"
                      onClick={() => onOpenBrochure(bike)}
                      className="text-xs font-serif italic text-neutral-600 hover:text-[#a82323] underline underline-offset-4 cursor-pointer flex items-center gap-1.5"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      <span>Specifications Sheet</span>
                    </button>
                  ) : (
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                      FACTORY BUILD
                    </span>
                  )}
                  <Link to="/order" state={{ selectedModel: bike }}>
                    <Button
                      variant="bold"
                      size="sm"
                      className="font-sans text-[10px] gap-1.5"
                    >
                      <ShoppingCart className="h-3 w-3" />
                      <span>Reserve</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
