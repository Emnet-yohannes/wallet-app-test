import { Link } from 'react-router-dom'
import { MobileShell } from '@/components/layout/MobileShell'

export function NotFoundPage() {
  return (
    <MobileShell className="items-center justify-center gap-3 px-3 py-16 text-center">
      <h1 className="text-2xl font-bold text-wallet-title">Page not found</h1>
      <p className="text-wallet-muted">This screen does not exist in the wallet app.</p>
      <Link to="/" className="font-medium text-wallet-link underline">
        Go home
      </Link>
    </MobileShell>
  )
}
