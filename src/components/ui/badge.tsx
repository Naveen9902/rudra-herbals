import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--sage-tint)] text-white hover:opacity-80",
        secondary:
          "border-transparent bg-[var(--cream-100)] text-[var(--ink-900)] hover:bg-[var(--cream-50)]",
        destructive:
          "border-transparent bg-red-900 text-white hover:bg-red-900/80",
        outline: "text-current border-[var(--border-subtle)]",
        reserve: "border-[var(--gold-400)] text-[var(--gold-400)] bg-[var(--forest-900)]/80 backdrop-blur-sm",
        terracotta: "border-transparent bg-[var(--terracotta-400)] text-white",
        tag: "border-[var(--border-subtle)] bg-transparent text-[var(--ink-50)] opacity-70",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
