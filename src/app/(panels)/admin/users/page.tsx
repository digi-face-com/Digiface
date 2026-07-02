'use client'

import { useCallback, useEffect, useState } from 'react'
import type { Role } from '@prisma/client'
import { Search, Users, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { Pill } from '@/components/ui'
import { apiFetch } from '@/lib/api-client'
import { roleLabels, rolePillColor } from '@/lib/auth/role-labels'

type AdminUser = {
  id: string
  phone: string
  username: string | null
  fullName: string | null
  role: Role
  isActive: boolean
  score: number
  tier: string
  createdAt: string
}

type UsersResponse = {
  users: AdminUser[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

const roleFilters: { key: string; label: string }[] = [
  { key: '', label: 'همه' },
  { key: 'CUSTOMER', label: 'مشتری' },
  { key: 'SHOP', label: 'فروشگاه' },
  { key: 'PICK', label: 'پیک' },
  { key: 'ADMIN', label: 'ادمین' },
  { key: 'SUPER_ADMIN', label: 'مدیر اصلی' },
]

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function AdminUsersPage() {
  const [data, setData] = useState<UsersResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')
  const [role, setRole] = useState('')
  const [page, setPage] = useState(1)

  const fetchUsers = useCallback(async () => {
    setLoading(true)

    const params = new URLSearchParams({ page: String(page) })
    if (q) params.set('q', q)
    if (role) params.set('role', role)

    try {
      const json = await apiFetch<UsersResponse>(`/api/admin/users?${params}`, {
        credentials: 'include',
        fallbackError: 'خطا در دریافت لیست کاربران',
      })
      setData(json)
    } catch {
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [page, q, role])

  useEffect(() => {
    void fetchUsers()
  }, [fetchUsers])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
    void fetchUsers()
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold flex items-center gap-2">
          <Users className="h-7 w-7 text-red" />
          کاربران
        </h1>
        <p className="text-sm text-muted mt-1">
          {data ? `${data.total.toLocaleString('fa-IR')} کاربر ثبت‌شده` : 'مدیریت کاربران پلتفرم'}
        </p>
      </div>

      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
        <div className="flex flex-1 items-center gap-2 bg-card2 border border-border rounded-xl px-3 py-2 focus-within:border-red/30 transition-colors">
          <Search className="h-4 w-4 text-muted shrink-0" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="جستجو با نام، یوزرنیم یا موبایل..."
            className="bg-transparent border-none outline-none flex-1 text-sm text-text placeholder:text-muted2"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 rounded-xl text-[13px] font-semibold bg-red/15 text-red border border-red/25 hover:bg-red/20 transition-colors"
        >
          جستجو
        </button>
      </form>

      <div className="flex gap-2 flex-wrap">
        {roleFilters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => {
              setRole(f.key)
              setPage(1)
            }}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold border transition-all ${
              role === f.key ? 'bg-red text-white border-red' : 'border-border text-muted hover:text-text'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-muted">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : !data?.users.length ? (
          <div className="text-center py-16 text-sm text-muted">کاربری یافت نشد.</div>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="border-b border-border bg-card2/50">
                    <th className="text-right p-3 text-muted font-semibold">نام / یوزرنیم</th>
                    <th className="text-right p-3 text-muted font-semibold">موبایل</th>
                    <th className="text-right p-3 text-muted font-semibold">نقش</th>
                    <th className="text-right p-3 text-muted font-semibold">امتیاز</th>
                    <th className="text-right p-3 text-muted font-semibold">وضعیت</th>
                    <th className="text-right p-3 text-muted font-semibold">تاریخ عضویت</th>
                  </tr>
                </thead>
                <tbody>
                  {data.users.map((user) => (
                    <tr key={user.id} className="border-b border-purple/5 last:border-none hover:bg-red/3">
                      <td className="p-3">
                        <div className="font-semibold">{user.fullName || '—'}</div>
                        {user.username && (
                          <div className="text-[10px] text-muted2" dir="ltr">@{user.username}</div>
                        )}
                      </td>
                      <td className="p-3 text-muted" dir="ltr">{user.phone}</td>
                      <td className="p-3">
                        <Pill color={rolePillColor[user.role]}>{roleLabels[user.role]}</Pill>
                      </td>
                      <td className="p-3">{user.score.toLocaleString('fa-IR')}</td>
                      <td className="p-3">
                        <Pill color={user.isActive ? 'green' : 'red'}>
                          {user.isActive ? 'فعال' : 'غیرفعال'}
                        </Pill>
                      </td>
                      <td className="p-3 text-muted">{formatDate(user.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden divide-y divide-purple/5">
              {data.users.map((user) => (
                <div key={user.id} className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="text-[13px] font-semibold">{user.fullName || user.username || 'بدون نام'}</div>
                      {user.username && user.fullName && (
                        <div className="text-[10px] text-muted2" dir="ltr">@{user.username}</div>
                      )}
                    </div>
                    <Pill color={rolePillColor[user.role]}>{roleLabels[user.role]}</Pill>
                  </div>
                  <div className="text-[11px] text-muted flex flex-wrap gap-x-3 gap-y-1">
                    <span dir="ltr">{user.phone}</span>
                    <span>امتیاز: {user.score.toLocaleString('fa-IR')}</span>
                    <span>{formatDate(user.createdAt)}</span>
                    <Pill color={user.isActive ? 'green' : 'red'}>
                      {user.isActive ? 'فعال' : 'غیرفعال'}
                    </Pill>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {data && data.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <span className="text-[12px] text-muted">
            صفحه {data.page.toLocaleString('fa-IR')} از {data.totalPages.toLocaleString('fa-IR')}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={page <= 1 || loading}
              onClick={() => setPage((p) => p - 1)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[12px] border border-border text-muted hover:text-text disabled:opacity-40 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
              قبلی
            </button>
            <button
              type="button"
              disabled={page >= data.totalPages || loading}
              onClick={() => setPage((p) => p + 1)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[12px] border border-border text-muted hover:text-text disabled:opacity-40 transition-colors"
            >
              بعدی
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
