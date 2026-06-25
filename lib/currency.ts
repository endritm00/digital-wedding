export type Currency = 'eur' | 'usd'

// All ISO 3166-1 alpha-2 codes for North America, Central America, the
// Caribbean, and South America.
const AMERICAS = new Set([
  'AG','AI','AR','AW','BB','BL','BM','BO','BQ','BR','BS','BZ',
  'CA','CL','CO','CR','CU','CW','DM','DO','EC','FK','GD','GF',
  'GL','GP','GT','GY','HN','HT','JM','KN','KY','LC','MF','MQ',
  'MS','MX','NI','PA','PE','PM','PR','PY','SR','SV','SX','TC',
  'TT','UM','US','UY','VC','VE','VG','VI',
])

export function detectCurrency(countryCode: string | null | undefined): Currency {
  if (!countryCode) return 'eur'
  return AMERICAS.has(countryCode.toUpperCase()) ? 'usd' : 'eur'
}

// Fixed 9% markup on EUR → USD, rounded to the nearest whole dollar.
// Keeps prices clean ($21, $43, $75) without live FX rate dependency.
const USD_FACTOR = 1.09

export function convertCents(eurCents: number, currency: Currency): number {
  if (currency === 'eur') return eurCents
  return Math.round((eurCents * USD_FACTOR) / 100) * 100
}

export function formatPrice(cents: number, currency: Currency | string): string {
  const v = cents / 100
  const s = Number.isInteger(v) ? String(v) : v.toFixed(2)
  return currency === 'usd' ? `$${s}` : `€${s}`
}

// Marketing "from" string — matches the cheapest plan in each currency.
export function fromPrice(currency: Currency): string {
  return currency === 'usd' ? 'From $21' : 'From €19.99'
}
