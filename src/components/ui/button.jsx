import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-xs font-sans font-semibold uppercase tracking-[0.18em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-900 disabled:pointer-events-none disabled:opacity-40 select-none cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[#171717] text-[#faf9f5] hover:bg-[#a82323] border border-[#171717] hover:border-[#a82323] shadow-none",
        bold:
          "bg-[#171717] text-[#faf9f5] border border-[#171717] hover:bg-[#faf9f5] hover:text-[#171717]",
        destructive:
          "bg-[#a82323] text-white hover:bg-[#171717] border border-[#a82323]",
        outline:
          "border border-[#171717] bg-transparent text-[#171717] hover:bg-[#171717] hover:text-[#faf9f5]",
        secondary:
          "bg-[#f0eee6] text-[#171717] hover:bg-[#171717] hover:text-[#faf9f5] border border-[#e5e2d8]",
        ghost:
          "text-[#171717] hover:bg-[#f0eee6] hover:text-[#a82323]",
        link:
          "text-[#171717] underline-offset-4 hover:underline font-serif italic lowercase tracking-normal text-sm",
        editorial:
          "bg-transparent text-[#171717] border-b border-[#171717] hover:text-[#a82323] hover:border-[#a82323] px-0 h-auto font-serif italic tracking-normal text-sm lowercase",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 px-4 text-[10px]",
        lg: "h-13 px-8 text-xs",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
