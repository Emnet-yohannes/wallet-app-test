import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import {
  type Transaction,
  cashbackPercentForAmount,
  formatAmount,
  formatTransactionDate,
} from '@/lib/transactions'
import { MerchantIcon } from '@/components/transaction/MerchantIcon'

type TransactionRowProps = {
  transaction: Transaction
}

export function TransactionRow({ transaction }: TransactionRowProps) {
  return (
    <li>
      <Link
        to={`/transaction/${transaction.id}`}
        className="grid grid-cols-[auto_1fr_auto] items-center gap-2 bg-wallet-row px-3 py-2.5 hover:bg-wallet-row-hover"
      >
        <span className="inline-flex size-10 items-center justify-center overflow-hidden rounded-md bg-wallet-pill">
          <MerchantIcon transactionId={transaction.id} title={transaction.name} />
        </span>
        <div className="flex min-w-0 flex-col">
          <span className="text-base font-bold leading-none text-wallet-title">
            {transaction.name}
          </span>
          <span className="truncate text-sm text-wallet-muted">
            {transaction.pending ? 'Pending - ' : ''}
            {transaction.description}
          </span>
          <span className="truncate text-sm text-wallet-muted">
            {transaction.authorizedUser ? `${transaction.authorizedUser} - ` : ''}
            {formatTransactionDate(transaction.date)}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex flex-col items-center">
            <span className="text-base font-medium text-wallet-title">
              <div className="flex items-center justify-between gap-2">
                <span>{formatAmount(transaction.type, transaction.amount)}</span>
                <FontAwesomeIcon icon={faChevronRight} className="text-sm text-wallet-chevron" />
              </div>
            </span>
            <span className="rounded-md bg-wallet-pill px-1.5 py-0.5 text-xs leading-none text-wallet-muted">
              {cashbackPercentForAmount(transaction.amount)}
            </span>
          </div>
        </div>
      </Link>
    </li>
  )
}
