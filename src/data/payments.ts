import type { KpiStat } from '@/types'

/** Financing & Payments headline KPIs. Illustrative demo figures. */
export const paymentsKpis: KpiStat[] = [
  { label: 'Financed YTD', value: '$41.7M', delta: '▲ 19%', deltaTone: 'positive', sub: 'across 612 care loans' },
  { label: 'In milestone escrow', value: '$54.2M', delta: 'protected', deltaTone: 'gold', sub: 'released on verified triggers' },
  { label: 'FX spread saved', value: '$1.9M', delta: '▲ 8%', deltaTone: 'positive', sub: 'vs card-network rates' },
  { label: 'On-time release rate', value: '99.4%', delta: '▲ 0.3 pts', deltaTone: 'positive', sub: 'provider settlements' },
]

export interface FinancingOption {
  id: string
  name: string
  apr: string
  term: string
  monthly: number
  highlight?: boolean
  note: string
}

/** Care-loan options offered for GMC-4471 ($27,800 principal). */
export const financingOptions: FinancingOption[] = [
  { id: 'F1', name: 'Pay in full', apr: '—', term: 'Single payment', monthly: 27800, note: '2% concierge fee waived on full prepayment.' },
  { id: 'F2', name: '0% intro · 24 mo', apr: '0% for 6 mo, then 9.9%', term: '24 months', monthly: 1290, highlight: true, note: 'Selected · soft credit check, no prepay penalty.' },
  { id: 'F3', name: 'Extended · 48 mo', apr: '12.9% APR', term: '48 months', monthly: 740, note: 'Lower monthly; higher total cost of credit.' },
]

/** Cross-border FX conversion shown on the payment rail. */
export const fxQuote = {
  from: 'USD',
  to: 'THB',
  rate: 36.4,
  amountUSD: 27800,
  amountLocal: 1011920,
  savedVsCard: 612,
}

/** Settlement rail stages (patient → escrow → provider). */
export const railStages = [
  { id: 'R1', label: 'Patient', detail: 'Care loan / card', tone: 'neutral' as const },
  { id: 'R2', label: 'GMC Escrow', detail: 'Milestone-held', tone: 'gold' as const },
  { id: 'R3', label: 'FX & compliance', detail: 'USD → THB · AML', tone: 'ai' as const },
  { id: 'R4', label: 'Provider', detail: 'On verified trigger', tone: 'positive' as const },
]
