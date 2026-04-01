import { useContext } from 'react'
import { WalletContext } from '@/context/wallet-context'
import type { CardBalanceSnapshot } from '@/lib/transactions'

export function useWallet(): CardBalanceSnapshot {
  const value = useContext(WalletContext)
  if (!value) {
    throw new Error('useWallet must be used within WalletProvider')
  }
  return value
}
