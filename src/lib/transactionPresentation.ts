import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faBagShopping,
  faBowlFood,
  faBuildingColumns,
  faCartShopping,
  faCreditCard,
  faGift,
  faStore,
  faWallet,
} from '@fortawesome/free-solid-svg-icons'

const DARK_BACKGROUNDS = [
  '#1e293b',
  '#312e81',
  '#1f2937',
  '#334155',
  '#422006',
  '#14532d',
  '#374151',
  '#581c87',
] as const

const ICONS: IconDefinition[] = [
  faStore,
  faBagShopping,
  faCreditCard,
  faCartShopping,
  faWallet,
  faBuildingColumns,
  faBowlFood,
  faGift,
]

function stableHash(id: string): number {
  let h = 0
  for (let i = 0; i < id.length; i += 1) {
    h = (Math.imul(31, h) + id.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

/** Stable icon + dark background per transaction (ignores JSON iconUrl). */
export function getTransactionPresentation(id: string): {
  icon: IconDefinition
  backgroundColor: string
} {
  const h = stableHash(id)
  return {
    backgroundColor: DARK_BACKGROUNDS[h % DARK_BACKGROUNDS.length]!,
    icon: ICONS[h % ICONS.length]!,
  }
}
