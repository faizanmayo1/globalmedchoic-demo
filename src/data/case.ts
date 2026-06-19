import type { CaseFile, EscrowMilestone, MatchResult, Provenance } from '@/types'
import { ORIGIN, providers } from './network'

/**
 * Hero case GMC-4471 — the spine threaded across every screen. A total knee
 * replacement (specialty orthopaedics) matched from Memphis to an accredited
 * Bangkok provider at ~42% all-in savings.
 */
export const heroCase: CaseFile = {
  id: 'GMC-4471',
  patient: 'Robert H.',
  age: 58,
  sex: 'M',
  origin: ORIGIN.city,
  originCoords: ORIGIN.coords,
  procedure: 'Total Knee Replacement (unilateral)',
  specialty: 'Orthopaedics',
  acuity: 'elective',
  usQuoteUSD: 48000,
  matchedProviderId: 'PRV-BKK-01',
  matchedPriceUSD: 27800,
  savingsPct: 0.42,
  stage: 'finance',
  eligibility: 'clear',
  clinicalSummary:
    'End-stage medial compartment osteoarthritis, right knee. BMI 28.4, HbA1c 5.6%, no anticoagulants. ASA II — cleared for elective arthroplasty and long-haul travel with standard VTE prophylaxis.',
  flags: ['Confirm cardiac clearance letter (routine)', 'Travel window: avoid monsoon peak'],
  financingPlan: '0% intro · 24-month care loan',
  hero: true,
}

/** Atlas-ranked matches for GMC-4471 (subset of the network, scored for TKA). */
export const heroMatches: MatchResult[] = [
  {
    providerId: 'PRV-BKK-01',
    matchScore: 94,
    rationale: [
      'JCI + GHA accredited; 2,140 arthroplasties/yr',
      'All-in $27,800 — 42% below US quote, includes 8-night recovery',
      'Surgeon volume 3,400+ joint replacements; complication rate 1.1%',
      'Direct routing MEM→BKK; 12-day surgical window',
    ],
    priceUSD: 27800,
    savingsPct: 0.42,
    qualityScore: 96,
    travelHours: 22,
    confidence: 0.94,
    recommended: true,
  },
  {
    providerId: 'PRV-DEL-06',
    matchScore: 91,
    rationale: [
      'Highest savings (60%) at $19,200 all-in',
      'Very high volume (3,120/yr); JCI + NABH',
      'Longer recovery-stay recommendation (10 nights)',
    ],
    priceUSD: 19200,
    savingsPct: 0.6,
    qualityScore: 94,
    travelHours: 19,
    confidence: 0.9,
  },
  {
    providerId: 'PRV-IST-02',
    matchScore: 89,
    rationale: [
      'Shortest travel from US East corridor (9-day window)',
      'EBOT-certified surgeon; 49% savings at $24,300',
      'Strong post-op physio program',
    ],
    priceUSD: 24300,
    savingsPct: 0.49,
    qualityScore: 93,
    travelHours: 13,
    confidence: 0.88,
  },
  {
    providerId: 'PRV-ICN-07',
    matchScore: 84,
    rationale: [
      'Computer-navigated TKA; outcomes 96/100',
      'Lower savings (29%) at $34,100',
      'Premium tier — best for complex revisions',
    ],
    priceUSD: 34100,
    savingsPct: 0.29,
    qualityScore: 97,
    travelHours: 16,
    confidence: 0.82,
  },
]

/** US baseline vs matched provider — itemized all-in cost comparison. */
export const costBreakdown: Array<{ line: string; usUSD: number; gmcUSD: number }> = [
  { line: 'Surgeon & anesthesia', usUSD: 19500, gmcUSD: 9800 },
  { line: 'Hospital & implant', usUSD: 21000, gmcUSD: 11200 },
  { line: 'Pre-op workup & imaging', usUSD: 3200, gmcUSD: 1100 },
  { line: 'Recovery stay (8 nights)', usUSD: 0, gmcUSD: 2400 },
  { line: 'Flights (patient + companion)', usUSD: 0, gmcUSD: 2200 },
  { line: 'Concierge, transfers & physio', usUSD: 4300, gmcUSD: 1100 },
]

/** Cross-border milestone escrow schedule for GMC-4471. */
export const escrowSchedule: EscrowMilestone[] = [
  { id: 'ESC-1', label: 'Booking deposit', trigger: 'Case confirmed · provider accepts', amountUSD: 4170, status: 'released', date: 'May 28' },
  { id: 'ESC-2', label: 'Pre-op clearance', trigger: 'Labs + cardiac letter verified by Atlas', amountUSD: 5560, status: 'released', date: 'Jun 09' },
  { id: 'ESC-3', label: 'Admission', trigger: 'Patient checked in · pre-anesthesia sign-off', amountUSD: 8340, status: 'held', date: 'Jun 24' },
  { id: 'ESC-4', label: 'Procedure complete', trigger: 'Op note + discharge summary filed', amountUSD: 6950, status: 'scheduled', date: 'Jun 26' },
  { id: 'ESC-5', label: 'Post-op verified', trigger: '30-day outcome check cleared', amountUSD: 2780, status: 'scheduled', date: 'Jul 26' },
]

/** The six-stage journey labels + current position for GMC-4471. */
export const journeySteps = [
  { key: 'consult', label: 'Consult' },
  { key: 'match', label: 'Match' },
  { key: 'finance', label: 'Finance' },
  { key: 'travel', label: 'Travel' },
  { key: 'surgery', label: 'Surgery' },
  { key: 'recovery', label: 'Recovery' },
] as const

export const matchedProvider = providers.find((p) => p.id === heroCase.matchedProviderId)!

/** Atlas-assembled clinical profile for GMC-4471 (with field provenance). */
export const clinicalProfile: Array<{ label: string; value: string; provenance: Provenance; confidence?: number }> = [
  { label: 'Diagnosis', value: 'End-stage medial OA, right knee', provenance: 'ehr' },
  { label: 'Laterality', value: 'Right · unilateral', provenance: 'intake' },
  { label: 'BMI', value: '28.4', provenance: 'ehr' },
  { label: 'HbA1c', value: '5.6%', provenance: 'ehr' },
  { label: 'ASA class', value: 'II', provenance: 'atlas', confidence: 0.96 },
  { label: 'Anticoagulants', value: 'None', provenance: 'intake' },
  { label: 'VTE prophylaxis', value: 'Standard LMWH', provenance: 'atlas', confidence: 0.93 },
  { label: 'Travel fitness', value: 'Cleared, long-haul', provenance: 'atlas', confidence: 0.95 },
]

/** Atlas eligibility reasoning for GMC-4471. */
export const eligibilityReasoning = [
  'Elective unilateral TKA — standard arthroplasty pathway, no contraindications',
  'Metabolic markers in range (BMI < 30, HbA1c < 6.5%); ASA II',
  'No anticoagulation; standard VTE prophylaxis sufficient for long-haul travel',
  'Recovery window (8 nights) supports safe return travel at day 9',
]

export type DocStatus = 'verified' | 'pending' | 'flagged'

/** Case document vault for GMC-4471. */
export const caseDocuments: Array<{ name: string; status: DocStatus; provenance: Provenance; date: string }> = [
  { name: 'Knee MRI + weight-bearing X-rays', status: 'verified', provenance: 'ehr', date: 'May 22' },
  { name: 'Pre-op labs (CBC, CMP, coag)', status: 'verified', provenance: 'ehr', date: 'Jun 06' },
  { name: 'Cardiac clearance letter', status: 'pending', provenance: 'provider', date: '—' },
  { name: 'Passport & Thai medical visa', status: 'verified', provenance: 'intake', date: 'Jun 02' },
  { name: 'Informed consent (TKA)', status: 'pending', provenance: 'atlas', date: 'Drafted' },
  { name: 'Anesthesia questionnaire', status: 'verified', provenance: 'intake', date: 'Jun 06' },
]
