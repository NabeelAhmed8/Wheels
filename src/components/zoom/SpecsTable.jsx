import React from 'react'
import { Badge } from '@/components/ui/badge'

export function SpecsTable() {
  const specs = [
    { label: 'Electric Motor Output', val30: '2000W Brushless DC Hub Motor', val40: '2000W Brushless DC Hub Motor' },
    { label: 'Controller Architecture', val30: '72V Smart Sine-Wave Vector Controller', val40: '72V Smart Sine-Wave Vector Controller' },
    { label: 'Battery Capacity', val30: '72V 30Ah Lithium-Ion Pack', val40: '72V 40Ah High-Capacity Lithium Pack' },
    { label: 'Real-World Range', val30: '85 - 95 km (Eco / City)', val40: '120 - 135 km (Extended Tourer)' },
    { label: 'Top Velocity', val30: '75 - 80 km/h', val40: '75 - 80 km/h' },
    { label: 'Charge Duration (0-100%)', val30: 'Approx. 3.5 Hours', val40: 'Approx. 4.5 Hours' },
    { label: 'Base Motorcycle Platform', val30: 'Converted 125cc Retro Backbone Chassis', val40: 'Converted 125cc Retro Backbone Chassis' },
    { label: 'Front Suspension', val30: 'Telescopic Hydraulic Dampers', val40: 'Telescopic Hydraulic Dampers' },
    { label: 'Rear Suspension', val30: 'Dual Adjustable Coilover Shocks', val40: 'Dual Adjustable Coilover Shocks' },
    { label: 'Braking System', val30: 'Front Disc + Rear Hub w/ Regenerative E-Brake', val40: 'Front Disc + Rear Hub w/ Regenerative E-Brake' },
    { label: 'Wheel Set', val30: '18" Multi-Spoke Alloy Wheels', val40: '18" Multi-Spoke Alloy Wheels' },
    { label: 'Available Finish Options', val30: 'Obsidian Black / Crimson Red', val40: 'Obsidian Black / Crimson Red' },
    { label: 'Lighting System', val30: 'Classic Round Headlamp w/ High-Intensity LED', val40: 'Classic Round Headlamp w/ High-Intensity LED' },
    { label: 'Instrument Cluster', val30: 'Retro Twin Dial w/ Digital Battery & Speedometer', val40: 'Retro Twin Dial w/ Digital Battery & Speedometer' },
  ]

  return (
    <section id="specs" className="py-20 bg-[#faf9f5] border-b border-[#e5e2d8]">
      <div className="container mx-auto px-4 sm:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#e5e2d8] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-block h-1.5 w-6 bg-[#a82323]" />
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#a82323] uppercase font-semibold">
                TECHNICAL SPECIFICATIONS
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-medium text-[#1a1918] tracking-tight">
              30Ah vs 40Ah <span className="italic font-normal text-[#a82323]">Battery Comparison</span>
            </h2>
          </div>
          <p className="text-xs font-serif italic text-stone-600 max-w-sm border-l border-[#a82323] pl-3">
            Common graphics and 125cc base chassis across both energy storage variants.
          </p>
        </div>

        {/* Specifications Table */}
        <div className="border border-[#e5e2d8] bg-white overflow-x-auto shadow-sm">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#1a1918] bg-[#1a1918] text-[#faf9f5] uppercase text-[11px] tracking-wider">
                <th className="py-4 px-6 font-semibold w-2/5">Technical Metric</th>
                <th className="py-4 px-6 font-semibold w-3/10 border-l border-stone-800">
                  ZOOM 2000W (30Ah)
                </th>
                <th className="py-4 px-6 font-semibold w-3/10 border-l border-stone-800">
                  ZOOM 2000W (40Ah) <span className="text-[#a82323] font-normal text-[9px] ml-1">[LONG RANGE]</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e2d8] uppercase">
              {specs.map((row, i) => (
                <tr
                  key={i}
                  className={`transition-colors hover:bg-[#f4f2ea]/50 ${
                    i % 2 === 0 ? 'bg-white' : 'bg-[#faf9f5]'
                  }`}
                >
                  <td className="py-3 px-6 text-stone-600 font-medium">
                    {row.label}
                  </td>
                  <td className="py-3 px-6 text-[#1a1918] border-l border-[#e5e2d8] font-bold">
                    {row.val30}
                  </td>
                  <td className="py-3 px-6 text-[#1a1918] border-l border-[#e5e2d8] font-bold bg-[#faf9f5]/50">
                    {row.val40}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
