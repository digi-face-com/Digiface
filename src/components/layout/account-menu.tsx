'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ChevronDown, Loader2, LogOut, UserRound } from 'lucide-react'
import { useAuth } from '@/context/auth-context'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'

export function AccountMenu() {
  const router = useRouter()
  const { user, loading, logout, isAuthenticated } = useAuth()
  const [loggingOut, setLoggingOut] = useState(false)

  if (loading) {
    return <Skeleton className="hidden sm:block h-9 w-[88px] rounded-lg bg-white/[0.10] opacity-80" />
  }

  if (!isAuthenticated || !user) {
    return (
      <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-[13px] font-semibold hover:bg-transparent">
        <Link href="/auth/login" className="hover:bg-transparent">ورود</Link>
      </Button>
    )
  }

  const menuLabel = user.username || user.fullName || 'ورود'
  const avatarLetter = (user.username?.[0] || user.fullName?.[0] || user.phone?.[0] || 'U').toUpperCase()

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await logout()
      router.push('/')
      router.refresh()
    } finally {
      setLoggingOut(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="hidden sm:inline-flex min-w-[96px] max-w-[160px] border-purple/20 bg-purple/5 hover:bg-purple/10"
          disabled={loggingOut}
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple to-purple-2 text-[10px] font-bold text-white">
            {avatarLetter}
          </span>
          <span className="truncate text-[13px] font-semibold">{menuLabel}</span>
          {loggingOut ? (
            <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin opacity-60" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-60" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold text-text truncate">{user.fullName || user.username || 'کاربر'}</span>
            {user.username && <span className="text-[11px] text-muted truncate">@{user.username}</span>}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/account" className="cursor-pointer">
            <UserRound className="h-4 w-4 opacity-70" />
            پنل کاربری
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red focus:text-red cursor-pointer"
          disabled={loggingOut}
          onSelect={(e) => {
            e.preventDefault()
            void handleLogout()
          }}
        >
          {loggingOut ? (
            <Loader2 className="h-4 w-4 animate-spin opacity-60" />
          ) : (
            <LogOut className="h-4 w-4 opacity-70" />
          )}
          خروج
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
