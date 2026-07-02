import { toast } from 'sonner'

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

type ToastAction = {
  label: string
  onClick: () => void
}

type ApiFetchOptions = RequestInit & {
  toastOnError?: boolean
  fallbackError?: string
  toastAction?: ToastAction
}

export async function apiFetch<T>(input: RequestInfo | URL, init?: ApiFetchOptions): Promise<T> {
  const { toastOnError = true, fallbackError, toastAction, ...fetchInit } = init ?? {}

  let res: Response
  try {
    res = await fetch(input, fetchInit)
  } catch {
    const message = fallbackError ?? 'خطا در ارتباط با سرور'
    if (toastOnError) toast.error(message)
    throw new ApiError(message, 0)
  }

  const data = (await res.json().catch(() => ({}))) as T & { error?: string }

  if (!res.ok) {
    const message = data.error ?? fallbackError ?? 'خطایی رخ داد'
    if (toastOnError) {
      if (toastAction) {
        toast.error(message, { action: toastAction })
      } else {
        toast.error(message)
      }
    }
    throw new ApiError(message, res.status)
  }

  return data
}
