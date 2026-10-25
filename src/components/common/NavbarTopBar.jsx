import React from 'react'
import { DEALERSHIP_INFO } from '@/config/navConfig'
import { Phone, MapPin, ShieldCheck } from 'lucide-react'

/**
 * NavbarTopBar
 * Single Responsibility: Displays the top official dealership utility strip.
 */
export function NavbarTopBar() {
  return (
    <div className="hidden md:flex items-center justify-between border-b border-[#e5e2d8] px-4 sm:px-8 py-2 bg-[#f4f2ea] text-neutral-600 font-mono text-[10px] uppercase tracking-wider">
      {/* Official Status */}
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5 font-bold text-[#171717]">
          <ShieldCheck className="h-3.5 w-3.5 text-[#a82323]" />
          <span>SUPER POWER & EMOTO</span>
        </span>
        <span className="text-neutral-300">|</span>
        <span className="text-neutral-500 font-normal">
          OFFICIAL FACTORY STORE {DEALERSHIP_INFO.year}
        </span>
      </div>

      {/* Hubs & Concierge Contact */}
      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center gap-1.5 text-neutral-500">
          <MapPin className="h-3 w-3 text-neutral-400" />
          <span>{DEALERSHIP_INFO.hubs}</span>
        </div>
        <span className="hidden lg:inline text-neutral-300">|</span>
        <div className="flex items-center gap-1.5 text-[#171717] font-semibold">
          <Phone className="h-3 w-3 text-[#a82323]" />
          <span>UAN: {DEALERSHIP_INFO.hotline}</span>
        </div>
      </div>
    </div>
  )
}
