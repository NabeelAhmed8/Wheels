import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { NAV_LINKS, DEALERSHIP_INFO } from '@/config/navConfig'
import { ShoppingCart, Phone, MapPin, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

/**
 * MobileMenu
 * Single Responsibility: Renders the mobile drawer navigation and quick actions.
 */
export function MobileMenu({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="lg:hidden border-t border-[#e5e2d8] bg-[#faf9f5] px-6 py-6 font-sans text-xs uppercase tracking-wider space-y-4 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
      {/* Navigation Items */}
      <div className="space-y-2">
        {NAV_LINKS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center justify-between p-3.5 border transition-all ${
                isActive
                  ? 'border-[#171717] bg-[#171717] text-[#faf9f5] font-bold shadow-sm'
                  : 'border-[#e5e2d8] bg-white text-[#171717] hover:border-[#171717]'
              }`
            }
          >
            <span className="font-sans font-semibold tracking-wider text-xs">
              {item.label}
            </span>
            {item.badge ? (
              <span className="font-mono text-[9px] bg-[#a82323] text-white px-2 py-0.5 font-bold">
                {item.badge}
              </span>
            ) : (
              <ArrowRight className="h-3.5 w-3.5 opacity-40" />
            )}
          </NavLink>
        ))}
      </div>

      {/* Primary Mobile CTA */}
      <div className="pt-2">
        <Link to="/order" onClick={onClose}>
          <Button
            variant="bold"
            size="lg"
            className="w-full justify-center gap-2 font-sans text-xs uppercase tracking-widest h-12"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Order / Reserve Online</span>
          </Button>
        </Link>
      </div>

      {/* Dealership Info Footer in Mobile */}
      <div className="border-t border-[#e5e2d8] pt-4 font-mono text-[10px] text-neutral-500 space-y-1.5 normal-case">
        <div className="flex items-center gap-2 text-[#171717] font-semibold">
          <Phone className="h-3 w-3 text-[#a82323]" />
          <span>Concierge Helpline: {DEALERSHIP_INFO.hotline}</span>
        </div>
        <div className="flex items-center gap-2 text-neutral-500">
          <MapPin className="h-3 w-3 text-neutral-400" />
          <span>3S Dealerships: {DEALERSHIP_INFO.hubs}</span>
        </div>
      </div>
    </div>
  )
}
