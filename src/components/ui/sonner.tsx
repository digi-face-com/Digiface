'use client'

import type { ComponentProps } from 'react'
import { Toaster as Sonner } from 'sonner'

type ToasterProps = ComponentProps<typeof Sonner>

function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      dir="rtl"
      theme="dark"
      position="top-center"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-card group-[.toaster]:text-text group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:rounded-xl',
          description: 'group-[.toast]:text-muted',
          actionButton: 'group-[.toast]:bg-purple group-[.toast]:text-white',
          cancelButton: 'group-[.toast]:bg-white/10 group-[.toast]:text-muted',
          error: 'group-[.toast]:border-red/30 group-[.toast]:bg-red/10 group-[.toast]:text-red',
          success: 'group-[.toast]:border-green/30 group-[.toast]:bg-green/10 group-[.toast]:text-green',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
