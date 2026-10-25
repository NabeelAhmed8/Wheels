import { useRef, useState, useEffect, useCallback } from 'react'

/**
 * useMoveableScroll
 * Single Responsibility: Provides smooth arrow navigation and drag-to-move scrolling
 * for horizontal components, without requiring native browser scrollbars.
 */
export function useMoveableScroll({ step = 320 } = {}) {
  const containerRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeftPos = useRef(0)
  const [isCurrentlyDragging, setIsCurrentlyDragging] = useState(false)

  const checkScrollBounds = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    setCanScrollLeft(scrollLeft > 8)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 8)
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    checkScrollBounds()
    el.addEventListener('scroll', checkScrollBounds, { passive: true })
    window.addEventListener('resize', checkScrollBounds)

    return () => {
      el.removeEventListener('scroll', checkScrollBounds)
      window.removeEventListener('resize', checkScrollBounds)
    }
  }, [checkScrollBounds])

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -step, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: step, behavior: 'smooth' })
    }
  }

  // Mouse Drag Handlers
  const handleMouseDown = (e) => {
    if (!containerRef.current) return
    isDragging.current = true
    setIsCurrentlyDragging(true)
    startX.current = e.pageX - containerRef.current.offsetLeft
    scrollLeftPos.current = containerRef.current.scrollLeft
  }

  const handleMouseMove = (e) => {
    if (!isDragging.current || !containerRef.current) return
    e.preventDefault()
    const x = e.pageX - containerRef.current.offsetLeft
    const distance = (x - startX.current) * 1.4
    containerRef.current.scrollLeft = scrollLeftPos.current - distance
  }

  const handleMouseUp = () => {
    isDragging.current = false
    setIsCurrentlyDragging(false)
  }

  return {
    containerRef,
    canScrollLeft,
    canScrollRight,
    scrollLeft,
    scrollRight,
    isCurrentlyDragging,
    checkScrollBounds,
    dragProps: {
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseUp,
    },
  }
}
