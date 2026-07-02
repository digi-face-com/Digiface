'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { useAuth } from '@/context/auth-context'
import { canAccessAccountPanel } from '@/lib/auth/roles'

export function AccountAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (loading) return

    if (!user) {
      router.replace(`/auth/login?next=${encodeURIComponent(pathname)}`)
      return
    }

    if (!canAccessAccountPanel(user.role)) {
      router.replace('/admin')
    }
  }, [loading, user, pathname, router])

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center text-muted">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  if (!user || !canAccessAccountPanel(user.role)) {
    return null
  }

  return <>{children}</>
}
