import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, User, LogOut } from 'lucide-react'
import { BrandLogo } from '@/components/common/BrandLogo'

export function AdminHeader({ adminUser, onLogout }) {
  return (
    <header className="sticky top-0 z-40 bg-[#141416]/95 backdrop-blur-md border-b border-neutral-800">
      <div className="container mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BrandLogo variant="symbol" size="md" theme="dark" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold">
                SUPER POWER & EMOTO
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-mono text-green-500 uppercase font-bold">
                LIVE OPERATIONS
              </span>
            </div>
            <h1 className="text-xl font-serif font-medium tracking-tight text-white leading-none">
              Showroom <span className="italic font-normal text-red-500">Operations Management</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          {/* Public Store Link */}
          <Link
            to="/"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 border border-neutral-700 bg-neutral-900 text-neutral-300 hover:text-white hover:border-neutral-500 transition-colors cursor-pointer"
          >
            <span>View Public Store</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>

          {/* Admin Badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-neutral-900 border border-neutral-800">
            <User className="h-3.5 w-3.5 text-red-500" />
            <span className="text-neutral-300">{adminUser?.name || 'Owner'}</span>
            <Badge className="bg-red-600/20 text-red-400 border border-red-800/50 text-[9px] uppercase font-bold">
              {adminUser?.role || 'SUPER_ADMIN'}
            </Badge>
          </div>

          {/* Logout Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={onLogout}
            className="gap-2 border-neutral-700 bg-neutral-900 text-neutral-300 hover:text-red-400 hover:border-red-600 cursor-pointer font-mono text-xs"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
