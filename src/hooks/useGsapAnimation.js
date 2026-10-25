import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function useGsapHero() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(containerRef)
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      if (q('.hero-badge').length) {
        tl.from(q('.hero-badge'), {
          y: -30,
          opacity: 0,
          duration: 0.8,
        })
      }

      if (q('.hero-title').length) {
        tl.from(
          q('.hero-title'),
          {
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
          },
          '-=0.4'
        )
      }

      if (q('.hero-desc').length) {
        tl.from(
          q('.hero-desc'),
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.5'
        )
      }

      if (q('.hero-cta').length) {
        tl.from(
          q('.hero-cta'),
          {
            scale: 0.9,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
          },
          '-=0.4'
        )
      }

      if (q('.hero-stats-item').length) {
        tl.from(
          q('.hero-stats-item'),
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
          },
          '-=0.3'
        )
      }

      if (q('.hero-car-preview').length) {
        tl.from(
          q('.hero-car-preview'),
          {
            x: 80,
            opacity: 0,
            duration: 1.2,
            ease: 'power2.out',
          },
          '-=1'
        )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return containerRef
}
