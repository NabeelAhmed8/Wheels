import React, { useState, useEffect } from 'react'
import { useVehicles } from '@/hooks/useVehicles'
import { SpecsModelTabs } from '@/components/specs/SpecsModelTabs'
import { SpecsDossier } from '@/components/specs/SpecsDossier'
import { SpecsComparisonTable } from '@/components/specs/SpecsComparisonTable'
import { ServerOfflineNotice } from '@/components/common/ServerOfflineNotice'
import { LoadingNotice } from '@/components/common/LoadingNotice'

export function SpecsPage({ onOpenBrochure }) {
  const { vehicles, loading, isOffline, refetch } = useVehicles()
  const [selectedModelId, setSelectedModelId] = useState('zoom-2000w')
  const [activeColor, setActiveColor] = useState('red')

  useEffect(() => {
    if (vehicles.length > 0) {
      setSelectedModelId((prev) => {
        if (prev && vehicles.some((m) => m.slug === prev || m._id === prev)) {
          return prev
        }
        return vehicles[0].slug
      })
    }
  }, [vehicles])

  if (loading && vehicles.length === 0) {
    return <LoadingNotice label="Loading Official Vehicle Specifications..." />
  }

  if (isOffline) {
    return (
      <ServerOfflineNotice
        title="Technical Specifications Unavailable"
        message="Official vehicle specifications and blueprints direct showroom server se load hotay hain. Please network connection check karein aur retry karein."
        onRetry={refetch}
        isRetrying={loading}
      />
    )
  }

  const activeBike =
    vehicles.find((m) => m.slug === selectedModelId || m._id === selectedModelId) ||
    vehicles[0] ||
    null

  return (
    <div className="min-h-screen bg-[#faf9f5]">
      {/* Page Header */}
      <div className="bg-[#faf9f5] border-b border-[#e5e2d8] py-16">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] tracking-[0.25em] text-[#a82323] uppercase font-bold">
                OFFICIAL FACTORY BLUEPRINTS & SPECS
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-serif font-black tracking-tight text-[#171717]">
              Technical <span className="italic font-normal text-[#a82323]">Specifications Hub</span>
            </h1>
            <p className="text-sm font-sans font-light text-neutral-600 max-w-xl border-l border-[#171717] pl-4">
              Official factory engineering blueprints. Review motor outputs, lithium storage, suspension dynamics, brake systems, and dimensions across all models.
            </p>
          </div>
        </div>
      </div>

      {/* Model Selector Tab Navigation */}
      <SpecsModelTabs
        vehicles={vehicles}
        selectedModelId={selectedModelId}
        onSelectModel={setSelectedModelId}
      />

      {/* Active Vehicle Spotlight & Technical Telemetry Dossier */}
      {activeBike && (
        <SpecsDossier
          activeBike={activeBike}
          activeColor={activeColor}
          onChangeActiveColor={setActiveColor}
          onOpenBrochure={onOpenBrochure}
        />
      )}

      {/* Complete Lineup Cross-Comparison Matrix */}
      <SpecsComparisonTable
        vehicles={vehicles}
        onSelectModel={setSelectedModelId}
      />
    </div>
  )
}
