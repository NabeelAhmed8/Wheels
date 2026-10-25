import React from 'react'
import { X, Download } from 'lucide-react'
import { getImageUrl } from '@/services/api'

export function BrochureModal({ isOpen, onClose, model }) {
  if (!isOpen || !model) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-6 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-hidden border border-[#e5e2d8] bg-[#faf9f5] flex flex-col shadow-2xl">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#e5e2d8] px-6 py-4 bg-white shrink-0">
          <div>
            <div className="font-mono text-[10px] tracking-[0.2em] text-[#a82323] uppercase font-semibold">
              {model.brand} // OFFICIAL SPECIFICATION SHEET
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-medium text-[#1a1918] tracking-tight">
              {model.name} — <span className="italic font-normal text-[#a82323]">Technical Brochure</span>
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={getImageUrl(model.brochureImage)}
              download={`${model.slug || model._id || 'brochure'}.jpg`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 border border-[#e5e2d8] px-3.5 py-1.5 font-sans text-xs tracking-[0.18em] uppercase hover:bg-[#1a1918] hover:text-[#faf9f5] text-[#1a1918] transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Save Sheet</span>
            </a>

            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center border border-[#e5e2d8] bg-white text-[#1a1918] hover:bg-[#1a1918] hover:text-[#faf9f5] transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Brochure Viewer */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#faf9f5] flex items-center justify-center">
          <div className="max-w-2xl bg-white border border-[#e5e2d8] shadow-md overflow-hidden">
            <img
              src={getImageUrl(model.brochureImage)}
              alt={`${model.name} Official Brochure`}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Footer Info */}
        <div className="border-t border-[#e5e2d8] px-6 py-3 bg-white flex flex-col sm:flex-row items-center justify-between font-mono text-[10px] uppercase text-stone-500 shrink-0 gap-2">
          <span>SUPER POWER & EMOTO MOTORCYCLES ALL RIGHTS RESERVED</span>
          <span className="text-[#1a1918] font-bold">VERIFIED TECHNICAL PUBLICATION</span>
        </div>
      </div>
    </div>
  )
}
