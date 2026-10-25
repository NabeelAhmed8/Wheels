import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full border border-neutral-300 bg-white px-3.5 py-2 text-xs font-mono text-neutral-950 placeholder:text-neutral-400 placeholder:font-sans transition-all focus:border-black focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-40",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }
