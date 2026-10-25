import React from 'react'
import { Link } from 'react-router-dom'
import { BrandLogo } from '@/components/common/BrandLogo'

/**
 * NavBrand
 * Single Responsibility: Renders the official showroom logo mark and brand typography.
 */
export function NavBrand() {
  return (
    <Link to="/" className="group select-none" aria-label="Motorcycle Fleet Home">
      <BrandLogo variant="horizontal" size="md" theme="light" />
    </Link>
  )
}
