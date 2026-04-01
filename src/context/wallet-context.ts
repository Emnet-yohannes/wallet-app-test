import { createContext } from 'react'
import type { CardBalanceSnapshot } from '@/lib/transactions'

export const WalletContext = createContext<CardBalanceSnapshot | null>(null)
