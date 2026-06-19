/**
 * Global MedChoices formatters — USD-first (the platform prices care in USD and
 * compares US vs global all-in cost). Numerics render tabular throughout.
 */

const LOCALE = 'en-US'

const usdFull = new Intl.NumberFormat(LOCALE, {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const usdCompact = new Intl.NumberFormat(LOCALE, {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 1,
})

const numberFull = new Intl.NumberFormat(LOCALE, { maximumFractionDigits: 0 })
const numberCompact = new Intl.NumberFormat(LOCALE, { notation: 'compact', maximumFractionDigits: 1 })
const percentWhole = new Intl.NumberFormat(LOCALE, { style: 'percent', maximumFractionDigits: 0 })
const percentOne = new Intl.NumberFormat(LOCALE, { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 })

/** $27,800 — full grouped USD */
export const formatUSD = (value: number) => usdFull.format(value)
/** $1.2M — compact USD for KPI tiles */
export const formatUSDCompact = (value: number) => usdCompact.format(value)
/** 1,842 — grouped integer */
export const formatNumber = (value: number) => numberFull.format(value)
/** 12.3K — compact numeric */
export const formatCompact = (value: number) => numberCompact.format(value)
/** 42% — whole-number percent (input decimal 0.42) */
export const formatPercent = (value: number) => percentWhole.format(value)
/** 94.3% — one-decimal percent (input decimal) */
export const formatPercent1 = (value: number) => percentOne.format(value)
/** 87 — integer 0–100 score */
export const formatScore = (value: number) => `${Math.round(value)}`

/** Signed delta with arrow, e.g. ▲ 6 pts / ▼ 3%. Consumer picks colour. */
export const formatDelta = (value: number, variant: 'percent' | 'pts' | 'number' = 'percent') => {
  const arrow = value > 0 ? '▲' : value < 0 ? '▼' : '·'
  const abs = Math.abs(value)
  switch (variant) {
    case 'pts':
      return `${arrow} ${numberFull.format(abs)} pts`
    case 'number':
      return `${arrow} ${numberCompact.format(abs)}`
    case 'percent':
    default:
      return `${arrow} ${percentWhole.format(abs)}`
  }
}
