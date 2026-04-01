import { CardSummaryGrid } from '@/components/dashboard/CardSummaryGrid'
import { MobileShell } from '@/components/layout/MobileShell'
import { TransactionList } from '@/components/transaction/TransactionList'
import { useWallet } from '@/hooks/useWallet'
import { getLatestTransactions } from '@/lib/transactions'

export function HomePage() {
  const balance = useWallet()
  const transactions = getLatestTransactions(10)

  return (
    <MobileShell className="h-screen max-h-screen gap-3 overflow-hidden px-3 py-4">
      <CardSummaryGrid balance={balance} />
      <TransactionList transactions={transactions} />
    </MobileShell>
  )
}
