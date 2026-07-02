import { Navbar, Footer } from '@/components/layout/navbar-footer'
import { BigDataIndicator } from '@/components/ui'
import { AccountShell } from '@/components/account/account-shell'

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <BigDataIndicator />
      <AccountShell>{children}</AccountShell>
      {/* <Footer /> */}
    </>
  )
}