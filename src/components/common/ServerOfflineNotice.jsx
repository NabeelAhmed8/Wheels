import React from 'react'
import { RefreshCw, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

/**
 * ServerOfflineNotice
 * Single Responsibility: Renders a refined editorial offline notice with a red error icon
 * when the backend server is unreachable.
 */
export function ServerOfflineNotice({
  title = 'Catalog Service Unavailable',
  message = 'Showroom vehicle catalog direct secure database server se connect hoti hai. Please network connection check karein aur retry karein.',
  onRetry,
  isRetrying = false,
}) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-[#faf9f5]">
      <div className="border border-[#e5e2d8] bg-white p-10 sm:p-12 max-w-lg mx-auto space-y-4 shadow-sm text-center">
        {/* Red Error Icon */}
        <div className="flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 border border-red-200 text-[#a82323] shadow-sm">
            <AlertCircle className="h-7 w-7 text-[#a82323]" />
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#171717]">
          {title}
        </h2>
        <p className="text-xs font-serif italic text-stone-600 leading-relaxed">
          {message}
        </p>
        {onRetry && (
          <div className="pt-2">
            <Button
              variant="bold"
              size="sm"
              onClick={onRetry}
              disabled={isRetrying}
              className="gap-2 font-sans text-xs tracking-[0.18em] mx-auto cursor-pointer"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRetrying ? 'animate-spin' : ''}`} />
              <span>{isRetrying ? 'Connecting to Server...' : 'Retry Connection'}</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
