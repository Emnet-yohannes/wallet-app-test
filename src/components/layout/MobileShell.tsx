import type { ReactNode } from 'react'

type MobileShellProps = {
  children: ReactNode
  className?: string
}

/**
 * Constrains layout to a single mobile column (wallet is mobile-only).
 */
export function MobileShell({ children, className = '' }: MobileShellProps) {
  return (
    <div
      className={`mx-auto flex min-h-[100dvh] w-full max-w-[390px] flex-col bg-wallet-app ${className}`}
    >
      {children}
    </div>
  )
}
