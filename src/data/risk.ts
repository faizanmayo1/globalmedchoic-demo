import type { KpiStat, RiskSignal } from '@/types'

/** Fraud & Risk Engine headline KPIs. Illustrative demo figures. */
export const riskKpis: KpiStat[] = [
  { label: 'Transactions screened', value: '38,402', delta: '▲ 6%', deltaTone: 'positive', sub: 'last 30 days' },
  { label: 'Flagged for review', value: '146', delta: '0.38%', deltaTone: 'warning', sub: 'rate within target' },
  { label: 'Fraud prevented YTD', value: '$2.4M', delta: '▲ 22%', deltaTone: 'positive', sub: 'blocked + recovered' },
  { label: 'Avg. risk score', value: '12 / 100', delta: '▼ 3 pts', deltaTone: 'positive', sub: 'portfolio average' },
]

/** Atlas-raised fraud / risk signals across payments and claims. */
export const riskSignals: RiskSignal[] = [
  {
    id: 'RSK-2207',
    entity: 'INV-4451-03 · Valle Health Surgical',
    verdict: 'review',
    category: 'Billing anomaly',
    title: 'Provider invoice 11% above agreed package',
    detail: 'Implant line itemized separately despite all-in bundle. Atlas matched to contract and flagged variance before escrow release.',
    amountUSD: 2380,
    score: 64,
    confidence: 0.91,
    detectedAt: '2h ago',
  },
  {
    id: 'RSK-2206',
    entity: 'TXN-88241 · card ****4417',
    verdict: 'block',
    category: 'Payment fraud',
    title: 'Velocity + geo mismatch on deposit',
    detail: '3 attempts in 4 min from 2 countries; device fingerprint unseen. Auto-held pending step-up verification.',
    amountUSD: 4170,
    score: 88,
    confidence: 0.96,
    detectedAt: '5h ago',
  },
  {
    id: 'RSK-2205',
    entity: 'CASE GMC-4438 · claim',
    verdict: 'review',
    category: 'Coverage',
    title: 'Secondary insurer coordination gap',
    detail: 'Claim submitted to both primary and secondary for same line. Atlas suggests re-sequencing to avoid duplicate recovery.',
    amountUSD: 1890,
    score: 52,
    confidence: 0.84,
    detectedAt: '1d ago',
  },
  {
    id: 'RSK-2204',
    entity: 'PRV-MTY-04 · onboarding',
    verdict: 'clear',
    category: 'Provider integrity',
    title: 'License + accreditation re-verified',
    detail: 'Annual JCI + CSG re-check passed; sanction-list screen clean across 14 registries.',
    score: 8,
    confidence: 0.99,
    detectedAt: '1d ago',
  },
  {
    id: 'RSK-2203',
    entity: 'TXN-88102 · patient identity',
    verdict: 'review',
    category: 'Identity',
    title: 'Document-to-selfie match below threshold',
    detail: 'Passport liveness 0.78 (threshold 0.85). Routed to manual KYC review; funds not held.',
    score: 41,
    confidence: 0.79,
    detectedAt: '2d ago',
  },
]

/** Risk-score distribution buckets for the engine overview. */
export const riskDistribution = [
  { band: '0–20 (clear)', count: 36980, color: '#1E8F5B' },
  { band: '21–50 (watch)', count: 1142, color: '#C68A2E' },
  { band: '51–75 (review)', count: 134, color: '#C2A24C' },
  { band: '76–100 (block)', count: 146, color: '#C0453B' },
]

/** Detection signals Atlas combines into a score. */
export const detectionFactors = [
  'Contract & bundle matching (invoice vs agreed package)',
  'Device, velocity and geo-IP fingerprinting',
  'Sanction-list & provider-license screening (14 registries)',
  'Identity / liveness and document forensics',
  'Cross-claim duplicate & coordination-of-benefits checks',
]
