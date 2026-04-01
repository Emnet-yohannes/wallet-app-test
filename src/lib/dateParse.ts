/** Parse `YYYY-MM-DD` in local calendar (avoid UTC midnight shifting the day). */
export function parseLocalDateString(input: string): Date {
  const parts = input.split('-').map(Number)
  if (parts.length === 3 && parts.every((n) => !Number.isNaN(n))) {
    const [y, m, d] = parts
    return new Date(y!, m! - 1, d!)
  }
  return new Date(input)
}
