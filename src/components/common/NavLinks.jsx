import React from 'react'
import { NavLink } from 'react-router-dom'
import { NAV_LINKS } from '@/config/navConfig'

/**
 * NavLinks
 * Single Responsibility: Renders desktop navigation items with clean active indicator.
 */
export function NavLinks() {
  return (
    <nav className="hidden lg:flex items-center gap-7 font-sans text-xs uppercase tracking-[0.16em]">
      {NAV_LINKS.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `transition-all py-1.5 flex items-center gap-2 relative ${
              isActive
                ? 'text-[#171717] font-bold border-b-2 border-[#a82323]'
                : 'text-neutral-600 hover:text-[#a82323] border-b-2 border-transparent'
            }`
          }
        >
          <span>{item.label}</span>
          {item.badge && (
            <span className="font-mono text-[8px] bg-[#a82323] text-white px-1.5 py-0.5 tracking-normal font-semibold rounded-xs">
              {item.badge}
            </span>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
