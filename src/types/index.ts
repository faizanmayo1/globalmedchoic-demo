/** Shared domain types for the Global MedChoices — AI Care Intelligence demo. */

export type Tone = 'positive' | 'negative' | 'neutral' | 'warning' | 'risk' | 'gold' | 'ai' | 'info'

/** The six-stage medical-tourism care journey — the signature spine. */
export type JourneyStage = 'consult' | 'match' | 'finance' | 'travel' | 'surgery' | 'recovery'

/** Atlas review outcome (clinical eligibility, payment, provider). */
export type Verdict = 'clear' | 'review' | 'block'

/** Provenance of a structured field. */
export type Provenance = 'intake' | 'ehr' | 'atlas' | 'provider'

export interface KpiStat {
  label: string
  value: string
  delta?: string
  deltaTone?: Tone
  sub?: string
}

/** Geo coordinate (lat/lng) used for the world map + route arcs. */
export interface GeoPoint {
  lat: number
  lng: number
}

/** An accredited global provider in the network. */
export interface Provider {
  id: string
  name: string
  city: string
  country: string
  flag: string
  coords: GeoPoint
  accreditation: string[] // e.g. ['JCI', 'ISO 9001']
  specialties: string[]
  qualityScore: number // 0..100 (Atlas composite)
  outcomesScore: number // 0..100
  safetyScore: number // 0..100
  complicationRate: number // 0..1
  volumeAnnual: number // procedures/yr for the matched specialty
  surgeon: string
  surgeonCreds: string
  priceUSD: number // all-in package for the matched procedure
  savingsPct: number // vs US baseline, 0..1
  waitDays: number
  riskTier: 'low' | 'moderate' | 'elevated'
  hero?: boolean
}

/** Escrow milestone in the cross-border payment schedule. */
export interface EscrowMilestone {
  id: string
  label: string
  trigger: string
  amountUSD: number
  status: 'released' | 'held' | 'scheduled'
  date: string
}

/** A patient case file (the hero entity, GMC-4471). */
export interface CaseFile {
  id: string
  patient: string
  age: number
  sex: 'M' | 'F'
  origin: string // city, region
  originCoords: GeoPoint
  procedure: string
  specialty: string
  acuity: 'elective' | 'semi-urgent' | 'urgent'
  usQuoteUSD: number
  matchedProviderId: string
  matchedPriceUSD: number
  savingsPct: number
  stage: JourneyStage
  eligibility: Verdict
  clinicalSummary: string
  flags: string[]
  financingPlan?: string
  hero?: boolean
}

/** A ranked Atlas match line (provider + scoring rationale). */
export interface MatchResult {
  providerId: string
  matchScore: number // 0..100 composite
  rationale: string[]
  priceUSD: number
  savingsPct: number
  qualityScore: number
  travelHours: number
  confidence: number // 0..1
  recommended?: boolean
}

/** A fraud / risk signal raised by Atlas on a transaction or claim. */
export interface RiskSignal {
  id: string
  entity: string // provider, transaction, claim ref
  verdict: Verdict
  category: 'Payment fraud' | 'Billing anomaly' | 'Identity' | 'Provider integrity' | 'Coverage'
  title: string
  detail: string
  amountUSD?: number
  score: number // 0..100 risk score
  confidence: number // 0..1
  detectedAt: string
}

/** Atlas Copilot conversation turn with reasoning + audit trail. */
export interface CopilotTurn {
  id: string
  question: string
  answer: string
  reasoning: string[]
  citations: string[]
}
