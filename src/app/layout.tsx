import type { Metadata } from 'next'
import { Vazirmatn, Cormorant_Garamond } from 'next/font/google'
import { AppProviders } from '@/components/providers/app-providers'
import './globals.css'

const vazir = Vazirmatn({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '900'],
  variable: '--font-vazir',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'DiGiFACE | چند کلیک تا زیبایی',
  description: 'اولین مارکت‌پلیس تخصصی آرایشی و بهداشتی ایران — DiGiFACE',
  metadataBase: new URL('https://digi-face.ir'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl" className={`${vazir.variable} ${cormorant.variable}`}>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}