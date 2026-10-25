import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, RefreshCw, X } from 'lucide-react'

const STATUS_TABS = [
  { label: 'All Orders', val: 'ALL' },
  { label: 'Pending Verification', val: 'PENDING' },
  { label: 'Confirmed', val: 'CONFIRMED' },
  { label: 'In Assembly', val: 'IN_ASSEMBLY' },
  { label: 'Dispatched', val: 'DISPATCHED' },
  { label: 'Delivered', val: 'DELIVERED' },
  { label: 'Cancelled', val: 'CANCELLED' },
]

export function AdminFilterBar({
  searchQuery,
  onChangeSearchQuery,
  statusFilter,
  onChangeStatusFilter,
  loading,
  onRefresh,
}) {
  return (
    <div className="border border-neutral-800 bg-[#141416] p-4 space-y-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="h-4 w-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Search by Order ID, Name, Phone, CNIC, TID..."
            value={searchQuery}
            onChange={(e) => onChangeSearchQuery(e.target.value)}
            className="bg-[#1c1c1f] border-neutral-700 text-white font-mono text-xs pl-9 h-10 focus:border-red-600"
          />
          {searchQuery && (
            <button
              onClick={() => onChangeSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Refresh Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={loading}
          className="border-neutral-700 bg-neutral-900 text-neutral-300 hover:text-white hover:border-neutral-500 font-mono text-xs gap-2 cursor-pointer w-full md:w-auto"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Orders</span>
        </Button>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar font-mono text-xs uppercase">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.val}
            type="button"
            onClick={() => onChangeStatusFilter(tab.val)}
            className={`px-3 py-1.5 border transition-all shrink-0 cursor-pointer ${
              statusFilter === tab.val
                ? 'border-red-600 bg-red-600 text-white font-bold'
                : 'border-neutral-800 bg-[#1a1a1d] text-neutral-400 hover:text-white hover:border-neutral-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
