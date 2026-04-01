import rawTransactions from '@/data/transactions.json'
import { parseLocalDateString } from '@/lib/dateParse'

export type TransactionType = 'Payment' | 'Credit'

export type Transaction = {
  id: string
  type: TransactionType
  amount: number
  name: string
  location: string
  description: string
  date: string
  pending: boolean
  authorizedUser: string | null
  iconUrl: string
  bgColor: string
}

export type CardBalanceSnapshot = {
  limit: number
  balance: number
  available: number
}

export const transactions: Transaction[] = [...(rawTransactions as Transaction[])].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
)

export function getLatestTransactions(limit = 10): Transaction[] {
  return transactions.slice(0, limit)
}

export function getTransactionById(id: string): Transaction | undefined {
  return transactions.find((transaction) => transaction.id === id)
}

export function formatAmount(type: TransactionType, amount: number): string {
  const sign = type === 'Payment' ? '+' : '-'
  return `${sign}$${amount.toFixed(2)}`
}

export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`
}

export function formatTransactionDate(input: string): string {
  const date = parseLocalDateString(input)
  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startOfTransactionDay = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const diffDays =
    (startOfToday.getTime() - startOfTransactionDay.getTime()) / (1000 * 60 * 60 * 24)

  if (diffDays >= 0 && diffDays < 7) {
    return date.toLocaleDateString('en-US', { weekday: 'long' })
  }
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

/** Cashback label shown on each row (demo rule). */
export function cashbackPercentForAmount(amount: number): string {
  return amount > 80 ? '3%' : '2%'
}

export function getCurrentSeasonDay(date = new Date()): number {
  const month = date.getMonth()
  const year = date.getFullYear()
  let seasonStartMonth = 2

  if (month >= 2 && month <= 4) seasonStartMonth = 2
  else if (month >= 5 && month <= 7) seasonStartMonth = 5
  else if (month >= 8 && month <= 10) seasonStartMonth = 8
  else if (month === 11 || month <= 1) {
    seasonStartMonth = 11
  }

  const seasonStartYear = seasonStartMonth === 11 && month <= 1 ? year - 1 : year
  const seasonStart = new Date(seasonStartYear, seasonStartMonth, 1)
  const diffMs = date.getTime() - seasonStart.getTime()
  return Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1
}

export function calculateDailyPoints(date = new Date()): string {
  const seasonDay = getCurrentSeasonDay(date)
  if (seasonDay <= 1) return '2'
  if (seasonDay === 2) return '3'

  let twoDaysAgo = 2
  let yesterday = 3
  let today = 0

  for (let day = 3; day <= seasonDay; day += 1) {
    today = Math.round(twoDaysAgo + yesterday * 0.6)
    twoDaysAgo = yesterday
    yesterday = today
  }

  if (today >= 1000) {
    return `${Math.round(today / 1000)}K`
  }
  return `${today}`
}

export function calculateCardBalance(limit = 1500): CardBalanceSnapshot {
  const balance = Number((Math.random() * limit).toFixed(2))
  return {
    limit,
    balance,
    available: Number((limit - balance).toFixed(2)),
  }
}

let cachedWalletBalance: CardBalanceSnapshot | null = null

/** Stable snapshot for the SPA session (avoids balance flicker on re-renders / Strict Mode). */
export function getWalletBalanceSnapshot(): CardBalanceSnapshot {
  if (!cachedWalletBalance) {
    cachedWalletBalance = calculateCardBalance(1500)
  }
  return cachedWalletBalance
}

/** Date-only ISO strings: show calendar date + fixed display time for the detail screen. */
export function formatTransactionDetailSubtitle(isoDate: string): string {
  const date = parseLocalDateString(isoDate)
  date.setHours(12, 47, 0, 0)
  const datePart = date.toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: '2-digit',
  })
  const timePart = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  })
  return `${datePart}, ${timePart}`
}
