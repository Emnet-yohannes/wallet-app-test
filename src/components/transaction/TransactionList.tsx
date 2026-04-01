import type { Transaction } from '@/lib/transactions'
import { TransactionRow } from '@/components/transaction/TransactionRow'

type TransactionListProps = {
  transactions: Transaction[]
  title?: string
}

export function TransactionList({ transactions, title = 'Latest Transactions' }: TransactionListProps) {
  return (
    <section className="flex min-h-0 flex-1 flex-col">
      <p className="mb-2 px-1 text-xl font-bold leading-none text-wallet-title">{title}</p>
      <ul className="min-h-0 flex-1 divide-y divide-wallet-divider overflow-y-auto rounded-xl bg-white">
        {transactions.map((transaction) => (
          <TransactionRow key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </section>
  )
}
