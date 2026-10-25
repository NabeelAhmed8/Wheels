import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useVehicles } from '@/hooks/useVehicles'
import { Button } from '@/components/ui/button'
import { Zap, Flame, RefreshCw } from 'lucide-react'
import { FleetBikeCard } from '@/components/fleet/FleetBikeCard'
import { ServerOfflineNotice } from '@/components/common/ServerOfflineNotice'
import { LoadingNotice } from '@/components/common/LoadingNotice'

export function FleetPage({ onOpenBrochure }) {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all') // 'all' | 'electric' | 'petrol'
  const [selectedColors, setSelectedColors] = useState({})
  const { vehicles, loading, isOffline, refetch } = useVehicles()

  const handleBookModel = (bike, displayImage, activeColor) => {
    navigate('/order', {
      state: {
        selectedModel: bike,
        color: activeColor,
        heroImage: displayImage,
      },
    })
  }

  const handleColorChange = (bikeSlug, color) => {
    setSelectedColors((prev) => ({ ...prev, [bikeSlug]: color }))
  }

  // Instant client-side filtering for fast, smooth tab switching
  const displayedVehicles = vehicles.filter((bike) => {
    if (filter === 'all') return true
    return bike.category === filter
  })

  // 1. Loading state while checking server connection
  if (loading && vehicles.length === 0) {
    return <LoadingNotice label="Connecting to Showroom Fleet Catalog..." />
  }

  // 2. Offline state when server is down or error occurs
  if (isOffline) {
    return (
      <ServerOfflineNotice
        title="Showroom Catalog Unavailable"
        message="Showroom fleet catalog direct secure database server se connect hoti hai. Please network connection check karein aur retry karein."
        onRetry={refetch}
        isRetrying={loading}
      />
    )
  }

  return (
    <div className="min-h-screen bg-[#faf9f5]">
      <section id="fleet" className="py-24 bg-[#faf9f5] border-b border-[#e5e2d8]">
        <div className="container mx-auto px-4 sm:px-8 space-y-12">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#e5e2d8] pb-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] tracking-[0.25em] text-[#a82323] uppercase font-bold">
                    OFFICIAL PRODUCTION SHOWROOM
                  </span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-[#171717]">
                  The 2026 Fleet Showroom
                </h2>
                <p className="text-sm font-sans text-neutral-600 font-light max-w-md hidden md:block">
                  Explore official factory models from Super Power & EMOTO. Available for nationwide showroom pickup and insured delivery.
                </p>
              </div>
            </div>

            {/* Filter Pills (Editorial Style) */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setFilter('all')}
                className={`px-5 py-2 font-sans text-xs uppercase tracking-wider transition-all cursor-pointer border ${
                  filter === 'all'
                    ? 'bg-[#171717] text-[#faf9f5] border-[#171717] font-semibold'
                    : 'bg-white text-[#171717] border-[#e5e2d8] hover:border-[#171717]'
                }`}
              >
                All Powertrains ({vehicles.length})
              </button>
              <button
                onClick={() => setFilter('electric')}
                className={`flex items-center gap-2 px-5 py-2 font-sans text-xs uppercase tracking-wider transition-all cursor-pointer border ${
                  filter === 'electric'
                    ? 'bg-[#171717] text-[#faf9f5] border-[#171717] font-semibold'
                    : 'bg-white text-[#171717] border-[#e5e2d8] hover:border-[#171717]'
                }`}
              >
                <Zap className="h-3.5 w-3.5 text-[#a82323]" />
                <span>Electric Mobility</span>
              </button>
              <button
                onClick={() => setFilter('petrol')}
                className={`flex items-center gap-2 px-5 py-2 font-sans text-xs uppercase tracking-wider transition-all cursor-pointer border ${
                  filter === 'petrol'
                    ? 'bg-[#171717] text-[#faf9f5] border-[#171717] font-semibold'
                    : 'bg-white text-[#171717] border-[#e5e2d8] hover:border-[#171717]'
                }`}
              >
                <Flame className="h-3.5 w-3.5 text-[#a82323]" />
                <span>Petrol Heavy Bikes</span>
              </button>
            </div>

            {/* Model Cards Grid */}
            {loading && vehicles.length === 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="border border-black bg-white p-6 h-96 animate-pulse" />
                ))}
              </div>
            ) : displayedVehicles.length === 0 ? (
              <div className="border border-[#e5e2d8] bg-white p-12 text-center space-y-4">
                <h3 className="text-xl font-serif font-medium text-[#171717]">
                  No Models Found in this Category
                </h3>
                <p className="text-xs font-mono text-stone-500">
                  Please select another filter or retry connection.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={refetch}
                  className="gap-2 font-sans text-xs tracking-[0.18em]"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Retry Connection</span>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedVehicles.map((bike) => (
                  <FleetBikeCard
                    key={bike._id || bike.slug}
                    bike={bike}
                    activeColor={selectedColors[bike.slug] || 'red'}
                    onChangeColor={handleColorChange}
                    onOpenBrochure={onOpenBrochure}
                    onOrder={handleBookModel}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
    </div>
  )
}
