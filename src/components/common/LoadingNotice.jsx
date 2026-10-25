import React from 'react'
import { Loader2 } from 'lucide-react'

/**
 * LoadingNotice
 * Single Responsibility: Renders a minimal editorial loader while connecting to the backend.
 */
export function LoadingNotice({ label = 'Connecting to Showroom Database...' }) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 font-mono bg-[#faf9f5]">
      <Loader2 className="h-6 w-6 animate-spin text-[#a82323]" />
      <span className="text-xs uppercase tracking-[0.2em] text-stone-500">
        {label}
      </span>
    </div>
  )
}
