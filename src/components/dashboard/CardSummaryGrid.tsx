import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { calculateDailyPoints, formatCurrency } from '@/lib/transactions'
import type { CardBalanceSnapshot } from '@/lib/transactions'

type CardSummaryGridProps = {
  balance: CardBalanceSnapshot
}

export function CardSummaryGrid({ balance }: CardSummaryGridProps) {
  return (
    <section className="grid grid-cols-2 grid-rows-2 gap-2">
      <article className="rounded-xl border border-wallet-card-border bg-wallet-card p-3">
        <p className="mb-0.5 text-sm font-medium text-wallet-title opacity-75">Card Balance</p>
        <h1 className="m-0 text-2xl font-bold leading-none opacity-75">{formatCurrency(balance.balance)}</h1>
        <p className="mt-1 text-sm text-wallet-muted">{formatCurrency(balance.available)} Available</p>
      </article>

      <article className="row-span-2 flex flex-col justify-between rounded-xl border border-wallet-card-border bg-wallet-card p-3">
        <div>
          <p className="mb-0.5 text-sm font-medium opacity-75 ">No Payment Due</p>
          <p className="max-w-[130px] text-[13px] leading-4 text-wallet-muted">
            You&apos;ve paid your balance.
          </p>
        </div>
        <span
          className="ml-auto inline-flex h-[60px] w-[60px] items-center justify-center rounded-full bg-wallet-pill text-wallet-strong"
          aria-label="Balance paid"
        >
          <FontAwesomeIcon icon={faCheck} className="text-3xl" aria-hidden />
        </span>
      </article>

      <article className="flex flex-col justify-center rounded-xl border border-wallet-card-border bg-wallet-card p-3">
        <p className="mb-0.5 text-sm font-semibold text-black opacity-75">Daily Points</p>
        <p className="text-sm font-medium text-wallet-muted">{calculateDailyPoints()}</p>
      </article>
    </section>
  )
}
