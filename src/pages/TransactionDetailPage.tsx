import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { MobileShell } from '@/components/layout/MobileShell'
import {
  formatCurrency,
  formatTransactionDetailSubtitle,
  getTransactionById,
} from '@/lib/transactions'

export function TransactionDetailPage() {
  const { id } = useParams<{ id: string }>()
  const transaction = id ? getTransactionById(id) : undefined

  if (!transaction) {
    return (
      <MobileShell className="items-center justify-center gap-4 px-3 py-10 text-center">
        <p className="text-lg text-wallet-title">Transaction not found.</p>
        <Link to="/" className="font-medium text-wallet-link underline">
          Back to wallet
        </Link>
      </MobileShell>
    )
  }

  return (
    <MobileShell className="px-3 pt-10">
      <Link
        to="/"
        className="mb-6 inline-flex items-center text-xl leading-none text-wallet-link"
        aria-label="Back to home"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </Link>

      <section className="mb-7 text-center">
        <h1 className="m-0 text-[58px] font-medium leading-none tracking-tight text-wallet-title">
          {formatCurrency(transaction.amount)}
        </h1>
        <p className="mt-2 text-xl text-wallet-muted">{transaction.name}</p>
        <p className="text-xl text-wallet-muted">{formatTransactionDetailSubtitle(transaction.date)}</p>
      </section>

      <section className="overflow-hidden rounded-xl border border-wallet-card-border bg-wallet-card">
        <div className="px-3 py-2">
          <p className="font-bold text-wallet-title">
            Status: {transaction.pending ? 'Pending' : 'Approved'}
          </p>
          <p className="text-wallet-muted">{transaction.location}</p>
        </div>
        <div className="flex items-center justify-between border-t border-wallet-divider px-3 py-2">
          <p className="font-bold text-wallet-title">Total</p>
          <p className="font-bold text-wallet-title">{formatCurrency(transaction.amount)}</p>
        </div>
      </section>
    </MobileShell>
  )
}
