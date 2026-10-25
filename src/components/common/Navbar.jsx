import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NavbarTopBar } from '@/components/common/NavbarTopBar'
import { NavBrand } from '@/components/common/NavBrand'
import { NavLinks } from '@/components/common/NavLinks'
import { MobileMenu } from '@/components/common/MobileMenu'

/**
 * Navbar
 * Single Responsibility: Composes top bar, brand identity, navigation links,
 * and mobile drawer into a unified dealership header.
 */
export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#e5e2d8] bg-[#faf9f5]/95 backdrop-blur-md">
      {/* Top Dealership Utility Strip */}
      <NavbarTopBar />

      {/* Main Dealership Masthead Bar */}
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-8">
        {/* Brand Mark */}
        <NavBrand />

        {/* Desktop Navigation Links */}
        <NavLinks />

        {/* Right Action Block */}
        <div className="flex items-center gap-3">
          <Link to="/order">
            <Button
              variant="bold"
              size="sm"
              className="gap-2 font-sans text-xs tracking-wider uppercase hidden sm:flex h-10 px-5 shadow-sm"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              <span>Order Online</span>
            </Button>
          </Link>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            className="lg:hidden flex h-10 w-10 items-center justify-center border border-[#171717] bg-white text-[#171717] hover:bg-[#171717] hover:text-white transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={closeMobileMenu} />
    </header>
  )
}
