import { Navbar, Footer } from '@/components/layout/navbar-footer'
import { BigDataIndicator } from '@/components/ui'
import { AccountShell } from '@/components/account/account-shell'
import { AccountAuthGuard } from '@/components/account/account-auth-guard'

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <BigDataIndicator />
      <AccountAuthGuard>
        <AccountShell>{children}</AccountShell>
      </AccountAuthGuard>
      {/* <Footer /> */}
    </>
  )
}