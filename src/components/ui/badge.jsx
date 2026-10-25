import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center border px-2.5 py-0.5 text-[9px] font-mono uppercase tracking-[0.2em] transition-colors select-none",
  {
    variants: {
      variant: {
        default:
          "border-[#171717] bg-[#171717] text-[#faf9f5]",
        secondary:
          "border-[#e5e2d8] bg-[#f0eee6] text-[#171717]",
        destructive:
          "border-[#a82323] bg-[#a82323] text-white",
        outline:
          "border-[#171717] bg-transparent text-[#171717]",
        editorial:
          "border-[#a82323] bg-transparent text-[#a82323] font-serif italic tracking-normal text-[11px]",
        speed:
          "border-[#171717] bg-[#171717] text-white",
        eco:
          "border-emerald-800 bg-emerald-50 text-emerald-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
