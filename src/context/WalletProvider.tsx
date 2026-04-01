import { useMemo, type ReactNode } from 'react'
import { getWalletBalanceSnapshot } from '@/lib/transactions'
import { WalletContext } from '@/context/wallet-context'

export function WalletProvider({ children }: { children: ReactNode }) {
  const value = useMemo(() => getWalletBalanceSnapshot(), [])
  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}
