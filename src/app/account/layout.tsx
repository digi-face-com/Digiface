import { Navbar, Footer } from '@/components/layout/navbar-footer'
import { BigDataIndicator } from '@/components/ui'

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <BigDataIndicator />
      <div className="pt-24 px-6 md:px-10 max-w-[1100px] mx-auto pb-20 min-h-screen">
        {children}
      </div>
      <Footer />
    </>
  )
}