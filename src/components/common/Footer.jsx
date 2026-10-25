import React from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, Award, MapPin, Phone, Mail, Truck } from 'lucide-react'
import { BrandLogo } from '@/components/common/BrandLogo'

export function Footer() {
  return (
    <footer className="border-t border-[#e5e2d8] bg-[#f4f2ea] text-[#171717] font-sans">
      <div className="container mx-auto px-4 pt-16 pb-10 sm:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 pb-14 border-b border-[#e5e2d8]">
          {/* Column 1: Editorial Colophon & Brand */}
          <div className="lg:col-span-5 space-y-5">
            <BrandLogo variant="horizontal" size="lg" theme="light" />

            <p className="max-w-md text-xs font-sans text-neutral-600 font-light leading-relaxed border-l border-[#171717] pl-3">
              Official commercial catalog and direct booking showroom for 2026 motorcycles and electric mobility. Featuring ZOOM 2000W, OTO 3 NEXO, OTOX DIMEN, TITAN 250CC, and NITRO 300CC with factory warranty and insured nationwide dispatch across Pakistan.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2 font-mono text-[9px] uppercase tracking-[0.15em] text-neutral-700 font-semibold">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[#a82323]" />
                <span>3-Year Motor Warranty</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="h-3.5 w-3.5 text-[#a82323]" />
                <span>2-Year Battery Pack</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="h-3.5 w-3.5 text-[#a82323]" />
                <span>Nationwide Logistics</span>
              </div>
            </div>
          </div>

          {/* Column 2: Index I — Models Archive */}
          <div className="lg:col-span-3 space-y-4">
            <div className="border-b border-[#e5e2d8] pb-2">
              <h4 className="font-serif text-sm font-bold text-[#171717] flex items-baseline gap-1.5">
                <span className="font-mono text-[10px] text-neutral-400 font-normal">I.</span>
                <span>Fleet Index</span>
              </h4>
            </div>
            <ul className="space-y-2.5 text-xs text-neutral-700">
              <li>
                <Link to="/zoom-2000w" className="hover:text-[#a82323] transition-colors flex items-center justify-between">
                  <span className="font-serif">ZOOM 2000W</span>
                  <span className="font-mono text-[9px] text-[#a82323]">[125 EV]</span>
                </Link>
              </li>
              <li>
                <Link to="/fleet" className="hover:text-[#a82323] transition-colors flex items-center justify-between">
                  <span className="font-serif">OTO 3 NEXO</span>
                  <span className="font-mono text-[9px] text-neutral-400">[EV SCOOTER]</span>
                </Link>
              </li>
              <li>
                <Link to="/fleet" className="hover:text-[#a82323] transition-colors flex items-center justify-between">
                  <span className="font-serif">OTOX DIMEN</span>
                  <span className="font-mono text-[9px] text-neutral-400">[NAKED EV]</span>
                </Link>
              </li>
              <li>
                <Link to="/fleet" className="hover:text-[#a82323] transition-colors flex items-center justify-between">
                  <span className="font-serif">TITAN 250CC</span>
                  <span className="font-mono text-[9px] text-neutral-400">[CRUISER]</span>
                </Link>
              </li>
              <li>
                <Link to="/fleet" className="hover:text-[#a82323] transition-colors flex items-center justify-between">
                  <span className="font-serif">NITRO 300CC</span>
                  <span className="font-mono text-[9px] text-neutral-400">[RACING]</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Index II — Factory Hubs & Editorial Contact */}
          <div className="lg:col-span-4 space-y-4">
            <div className="border-b border-[#e5e2d8] pb-2">
              <h4 className="font-serif text-sm font-bold text-[#171717] flex items-baseline gap-1.5">
                <span className="font-mono text-[10px] text-neutral-400 font-normal">II.</span>
                <span>Factory Hubs</span>
              </h4>
            </div>
            <div className="space-y-3 text-xs text-neutral-700">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-3.5 w-3.5 text-neutral-600 shrink-0 mt-0.5" />
                <span>Authorized 3S Centers: Karachi • Lahore • Islamabad • Faisalabad</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-3.5 w-3.5 text-neutral-600 shrink-0" />
                <span>UAN: +92 (21) 111-POWER / WhatsApp Concierge</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-3.5 w-3.5 text-neutral-600 shrink-0" />
                <span>concierge@motorcyclefleet.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Colophon Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-500">
          <div>
            © 2026 MOTORCYCLE FLEET SHOWROOM. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <span>AUTHORIZED DEALER NETWORK</span>
            <span>KARACHI • PAKISTAN</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
