import React from 'react'

/**
 * BrandLogo
 * Single Responsibility: Renders the official scalable vector automotive emblem
 * and wordmark for "MOTORCYCLE FLEET" (Super Power & EMOTO).
 *
 * Props:
 * - variant: 'symbol' (icon only) | 'horizontal' (icon + wordmark) | 'badge'
 * - size: 'sm' (32px) | 'md' (40px) | 'lg' (48px) | 'xl' (64px)
 * - theme: 'light' (on light backgrounds) | 'dark' (on dark/admin backgrounds)
 */
export function BrandLogo({
  variant = 'symbol',
  size = 'md',
  theme = 'light',
  className = '',
}) {
  const sizeMap = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64,
  }

  const dimension = sizeMap[size] || 40
  const isDarkTheme = theme === 'dark'

  const primaryFill = isDarkTheme ? '#ffffff' : '#171717'
  const secondaryFill = '#a82323' // Deep Crimson Red
  const ringStroke = isDarkTheme ? '#333333' : '#e5e2d8'

  // The Vector Automotive Crest Emblem
  const EmblemSvg = (
    <svg
      width={dimension}
      height={dimension}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      aria-label="Motorcycle Fleet Official Emblem"
    >
      {/* Outer Hexagonal Shield / Crest */}
      <polygon
        points="50,4 92,26 92,74 50,96 8,74 8,26"
        fill={isDarkTheme ? '#1c1c1f' : '#171717'}
        stroke={ringStroke}
        strokeWidth="2.5"
      />

      {/* Inner Precision Inset Rule */}
      <polygon
        points="50,9 87,29 87,71 50,91 13,71 13,29"
        fill="none"
        stroke={isDarkTheme ? '#2a2a2e' : '#262626'}
        strokeWidth="1"
      />

      {/* Aerodynamic Speed Wing - Left 'M' Vector */}
      <path
        d="M26 68 L26 32 L40 48 L50 34 L50 48 L36 68 Z"
        fill="#ffffff"
      />

      {/* Aerodynamic Speed Wing - Right 'F' Vector */}
      <path
        d="M50 34 L74 34 L74 41 L57 41 L57 49 L70 49 L70 56 L57 56 L57 68 L50 68 Z"
        fill="#ffffff"
      />

      {/* Dynamic Red Electric Torque Accent (Speed Diamond) */}
      <polygon
        points="50,42 56,48 50,54 44,48"
        fill={secondaryFill}
      />

      {/* Bottom Corner Precision Dot */}
      <circle cx="50" cy="82" r="2.5" fill={secondaryFill} />
    </svg>
  )

  if (variant === 'symbol') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {EmblemSvg}
      </div>
    )
  }

  // Full Horizontal Lockup (Emblem + Dealership Typography)
  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      {EmblemSvg}
      <div className="flex flex-col text-left">
        <span
          className={`font-serif font-black tracking-tight leading-none ${
            size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
          } ${isDarkTheme ? 'text-white' : 'text-[#171717]'}`}
        >
          MOTORCYCLE{' '}
          <span className="italic font-normal text-[#a82323]">Fleet</span>
        </span>
        <span
          className={`font-mono uppercase tracking-[0.22em] mt-1 font-semibold ${
            size === 'sm' ? 'text-[7px]' : 'text-[8px]'
          } ${isDarkTheme ? 'text-neutral-400' : 'text-neutral-500'}`}
        >
          SUPER POWER & EMOTO MOTORCYCLES
        </span>
      </div>
    </div>
  )
}
