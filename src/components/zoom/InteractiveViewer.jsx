import React, { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Sparkles, ZoomIn, Eye } from 'lucide-react'

const ZOOM_GALLERY = [
  {
    title: 'Full Studio Profile (Red)',
    caption: 'A mix of modern velocity, inspired by classic 125 geometry.',
    src: '/images/zoom/red-studio.png',
    tag: 'RED VARIANT',
  },
  {
    title: 'Full Studio Profile (Black)',
    caption: 'Aggressive street presence with gold and racing vermilion stripes.',
    src: '/images/zoom/black-studio.png',
    tag: 'BLACK VARIANT',
  },
  {
    title: 'Close-Up Tank Stickers (Red)',
    caption: 'Precision contour tank decals with checkerboard speed patterns.',
    src: '/images/zoom/red-tank-sticker.jpg',
    tag: 'STICKER WORK',
  },
  {
    title: 'Close-Up Tank Stickers (Black)',
    caption: 'High-contrast gold wings with ZOOM ELECTRIC 2000W badge.',
    src: '/images/zoom/black-tank-sticker.jpg',
    tag: 'STICKER WORK',
  },
  {
    title: 'Top Tank Center Racing Stripe',
    caption: 'Retro-styled vertical ZOOM racing stripe spanning down the tank center line.',
    src: '/images/zoom/tank-top-view.jpg',
    tag: 'TOP VIEW',
  },
  {
    title: 'Street Personality (Black)',
    caption: 'Fits the personality of a product which is born to be aggressive and winner.',
    src: '/images/zoom/black-lifestyle.jpg',
    tag: 'LIFESTYLE',
  },
  {
    title: 'Cobblestone Street Cruise (Red)',
    caption: 'Converts everyday urban commuting into an effortless electric experience.',
    src: '/images/zoom/red-lifestyle.jpg',
    tag: 'LIFESTYLE',
  },
]

export function InteractiveViewer() {
  const [selectedTag, setSelectedTag] = useState('ALL')
  const [activeImage, setActiveImage] = useState(ZOOM_GALLERY[0])

  const tags = ['ALL', 'RED VARIANT', 'BLACK VARIANT', 'STICKER WORK', 'TOP VIEW', 'LIFESTYLE']

  const filteredGallery = selectedTag === 'ALL'
    ? ZOOM_GALLERY
    : ZOOM_GALLERY.filter((item) => item.tag === selectedTag)

  // When a tag is clicked, update selectedTag AND switch activeImage to that category's primary image
  const handleSelectTag = (tag) => {
    setSelectedTag(tag)
    if (tag === 'ALL') {
      setActiveImage(ZOOM_GALLERY[0])
    } else {
      const firstMatch = ZOOM_GALLERY.find((item) => item.tag === tag)
      if (firstMatch) {
        setActiveImage(firstMatch)
      }
    }
  }

  return (
    <section id="gallery" className="py-20 bg-[#f4f2ea] border-b border-[#e5e2d8]">
      <div className="container mx-auto px-4 sm:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#e5e2d8] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-block h-1.5 w-6 bg-[#a82323]" />
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#a82323] uppercase font-semibold">
                OFFICIAL VISUAL GALLERY & DECAL WORK
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-medium text-[#1a1918] tracking-tight">
              Graphics & <span className="italic font-normal text-[#a82323]">Visual Anatomy</span>
            </h2>
          </div>
          <p className="text-xs font-serif italic text-stone-600 max-w-sm border-l border-[#a82323] pl-3">
            High-definition inspection of the retro tank decals, converted chassis geometry, and street persona.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleSelectTag(tag)}
              className={`px-3.5 py-2 font-mono text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
                selectedTag === tag
                  ? 'bg-[#1a1918] text-[#faf9f5] font-semibold shadow-sm'
                  : 'bg-white text-stone-700 border border-[#e5e2d8] hover:border-[#1a1918]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Spotlight Showcase Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-[#e5e2d8] bg-white p-6 sm:p-8 shadow-sm">
          {/* Large Preview */}
          <div className="lg:col-span-8 relative aspect-[16/10] overflow-hidden bg-[#faf9f5] border border-[#e5e2d8] flex items-center justify-center">
            <img
              key={activeImage.src}
              src={activeImage.src}
              alt={activeImage.title}
              className="h-full w-full object-contain p-4 transition-all duration-300 animate-in fade-in"
            />
            <Badge
              variant="default"
              className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-widest bg-[#1a1918] text-[#faf9f5]"
            >
              {activeImage.tag}
            </Badge>
          </div>

          {/* Details & Commentary from PDF */}
          <div className="lg:col-span-4 space-y-4">
            <div className="font-mono text-[10px] tracking-[0.2em] text-[#a82323] uppercase font-semibold">
              DOCUMENTATION ITEM
            </div>
            <h3 className="text-2xl font-serif font-medium text-[#1a1918] tracking-tight leading-snug">
              {activeImage.title}
            </h3>
            <p className="text-sm font-serif italic text-stone-600 leading-relaxed border-l border-[#a82323] pl-3 py-1">
              "{activeImage.caption}"
            </p>

            <div className="pt-4 border-t border-[#e5e2d8] space-y-2 font-mono text-[11px] uppercase text-stone-500">
              <div className="flex justify-between">
                <span>Model Ref:</span>
                <span className="font-bold text-[#1a1918]">SUPER POWER ZOOM 2000W</span>
              </div>
              <div className="flex justify-between">
                <span>Compatibility:</span>
                <span className="font-bold text-[#1a1918]">30Ah & 40Ah Common Chassis</span>
              </div>
              <div className="flex justify-between">
                <span>Design Inspo:</span>
                <span className="font-bold text-[#1a1918]">Retro 125cc Modernized</span>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Grid */}
        <div className="space-y-3">
          <div className="font-mono text-[11px] uppercase tracking-wider text-stone-500">
            {selectedTag === 'ALL' ? 'All Visual Assets' : `${selectedTag} (${filteredGallery.length})`}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {filteredGallery.map((item, idx) => {
              const isSelected = activeImage.src === item.src
              return (
                <div
                  key={idx}
                  onClick={() => setActiveImage(item)}
                  className={`group border cursor-pointer p-2.5 bg-white transition-all ${
                    isSelected
                      ? 'border-[#1a1918] ring-1 ring-[#1a1918] shadow-sm'
                      : 'border-[#e5e2d8] hover:border-[#1a1918]'
                  }`}
                >
                  <div className="aspect-[16/10] overflow-hidden bg-[#faf9f5] mb-2 flex items-center justify-center p-1 border border-[#e5e2d8]">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-stone-400">
                    {item.tag}
                  </div>
                  <div className="font-serif text-xs font-medium text-[#1a1918] truncate mt-0.5">
                    {item.title}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
