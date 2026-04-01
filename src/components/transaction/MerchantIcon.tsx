import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getTransactionPresentation } from '@/lib/transactionPresentation'

type MerchantIconProps = {
  transactionId: string
  title: string
  size?: number
  className?: string
}

/**
 * Font Awesome icon on a stable random dark background (does not use iconUrl).
 */
export function MerchantIcon({ transactionId, title, size = 40, className = '' }: MerchantIconProps) {
  const { icon, backgroundColor } = getTransactionPresentation(transactionId)
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-md text-white ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor,
        fontSize: Math.round(size * 0.42),
      }}
      aria-label={`${title} icon`}
    >
      <FontAwesomeIcon icon={icon} />
    </span>
  )
}
