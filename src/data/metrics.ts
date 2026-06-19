import type { KpiStat } from '@/types'

/** Command-center headline KPIs. Illustrative demo figures. */
export const commandKpis: KpiStat[] = [
  { label: 'Avg. cost reduction', value: '41%', delta: '▲ 3 pts', deltaTone: 'positive', sub: 'vs US baseline · mission 40%' },
  { label: 'Savings delivered YTD', value: '$86.4M', delta: '▲ 18%', deltaTone: 'positive', sub: 'across 1,284 cases' },
  { label: 'Active cases', value: '1,284', delta: '▲ 142', deltaTone: 'positive', sub: 'in care journey now' },
  { label: 'Escrow protected', value: '$54.2M', delta: 'held', deltaTone: 'gold', sub: 'milestone-released funds' },
]

/** Care-outcomes index (mission: +20% access / quality / safety). */
export const outcomeIndex = [
  { label: 'Access', value: 22, target: 20 },
  { label: 'Quality', value: 24, target: 20 },
  { label: 'Safety', value: 21, target: 20 },
]

/** Monthly savings delivered ($M) — area chart. */
export const savingsSeries = [
  { month: 'Jan', savings: 9.2, cases: 132 },
  { month: 'Feb', savings: 10.8, cases: 158 },
  { month: 'Mar', savings: 12.1, cases: 171 },
  { month: 'Apr', savings: 13.6, cases: 196 },
  { month: 'May', savings: 18.9, cases: 241 },
  { month: 'Jun', savings: 21.8, cases: 286 },
]

/** Case distribution by destination region (donut / bars). */
export const regionMix = [
  { region: 'Southeast Asia', cases: 412, color: '#0E5B52' },
  { region: 'Latin America', cases: 338, color: '#3F9486' },
  { region: 'Türkiye & EMEA', cases: 246, color: '#C2A24C' },
  { region: 'South Asia', cases: 188, color: '#DCBE78' },
  { region: 'East Asia', cases: 100, color: '#7C72D6' },
]

/** Live case feed for the command center. */
export const recentCases = [
  { id: 'GMC-4471', patient: 'Robert H.', procedure: 'Total knee replacement', dest: 'Bangkok 🇹🇭', savings: 0.42, stage: 'Finance', tone: 'ai' as const, hero: true },
  { id: 'GMC-4468', patient: 'Dana W.', procedure: 'Spinal fusion (L4–L5)', dest: 'New Delhi 🇮🇳', savings: 0.58, stage: 'Travel', tone: 'info' as const },
  { id: 'GMC-4465', patient: 'Miguel A.', procedure: 'Bariatric sleeve', dest: 'Monterrey 🇲🇽', savings: 0.54, stage: 'Recovery', tone: 'positive' as const },
  { id: 'GMC-4462', patient: 'Susan T.', procedure: 'Hip resurfacing', dest: 'Istanbul 🇹🇷', savings: 0.47, stage: 'Surgery', tone: 'warning' as const },
  { id: 'GMC-4459', patient: 'James K.', procedure: 'Cardiac valve repair', dest: 'Singapore 🇸🇬', savings: 0.31, stage: 'Consult', tone: 'neutral' as const },
]

/** Atlas attention items surfaced on the command center. */
export const attentionItems = [
  { id: 'A1', tone: 'ai' as const, title: 'GMC-4471 ready for escrow milestone 3', detail: 'Pre-op clearance verified — admission funds queued for release.' },
  { id: 'A2', tone: 'warning' as const, title: '2 payments flagged for review', detail: 'Provider invoice variance > 8% vs agreed package on GMC-4451, -4438.' },
  { id: 'A3', tone: 'positive' as const, title: 'Network expansion: +6 JCI providers', detail: 'Atlas onboarded new accredited orthopaedic centers this month.' },
]
