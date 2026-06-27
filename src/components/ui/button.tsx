'use client'
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple/40 disabled:pointer-events-none disabled:opacity-60',
  {
    variants: {
      variant: {
        primary:
          'bg-gradient-to-br from-purple to-purple-2 text-white shadow-[0_8px_32px_rgba(124,58,237,0.35)] hover:shadow-[0_12px_44px_rgba(124,58,237,0.5)] hover:-translate-y-0.5',
        gold:
          'bg-gradient-to-br from-gold to-[#a06020] text-white shadow-[0_8px_32px_rgba(201,151,58,0.3)] hover:shadow-[0_12px_44px_rgba(201,151,58,0.45)] hover:-translate-y-0.5',
        ghost:
          'bg-transparent text-muted border border-border hover:text-text hover:border-border2 hover:bg-purple/5',
        outline:
          'border border-purple/25 bg-purple/5 text-text hover:bg-purple/10 hover:border-purple/40',
        danger: 'bg-red/10 text-red border border-red/25 hover:bg-red/15',
      },
      size: {
        sm: 'h-8 px-3 text-xs rounded-lg',
        md: 'h-10 px-5 text-sm rounded-xl',
        lg: 'h-12 px-8 text-base rounded-xl',
        icon: 'h-9 w-9 rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin opacity-70" aria-hidden="true" />}
        {children}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
