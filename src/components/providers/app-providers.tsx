'use client'

import { AuthProvider } from '@/context/auth-context'
import { Toaster } from '@/components/ui/sonner'

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <Toaster richColors closeButton />
    </AuthProvider>
  )
}
