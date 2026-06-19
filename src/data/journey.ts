import type { JourneyStage } from '@/types'

export type EventStatus = 'done' | 'active' | 'upcoming'
export type Owner = 'Patient' | 'Atlas' | 'Provider' | 'Concierge'

export interface JourneyEvent {
  id: string
  stage: JourneyStage
  title: string
  detail: string
  date: string
  owner: Owner
  status: EventStatus
  automated?: boolean
}

/** End-to-end orchestrated journey for GMC-4471. */
export const journeyEvents: JourneyEvent[] = [
  { id: 'J1', stage: 'consult', title: 'Tele-consult with US care navigator', detail: 'Candidacy confirmed; records requested from referring ortho.', date: 'May 18', owner: 'Concierge', status: 'done' },
  { id: 'J2', stage: 'consult', title: 'Records ingested & profile built', detail: 'Atlas assembled clinical profile and ran eligibility (ASA II, cleared).', date: 'May 22', owner: 'Atlas', status: 'done', automated: true },
  { id: 'J3', stage: 'match', title: 'Global match generated', detail: '4 accredited providers ranked; Bangkok recommended at 42% savings.', date: 'May 25', owner: 'Atlas', status: 'done', automated: true },
  { id: 'J4', stage: 'match', title: 'Provider accepted case', detail: 'Sukhumvit Advanced Surgical Institute confirmed surgeon + window.', date: 'May 27', owner: 'Provider', status: 'done' },
  { id: 'J5', stage: 'finance', title: 'Care loan approved & escrow opened', detail: '0% intro · 24-month plan; $27.8k placed in milestone escrow.', date: 'May 28', owner: 'Atlas', status: 'done', automated: true },
  { id: 'J6', stage: 'finance', title: 'Pre-op clearance verified', detail: 'Labs + anesthesia questionnaire verified; milestone 2 released.', date: 'Jun 09', owner: 'Atlas', status: 'active', automated: true },
  { id: 'J7', stage: 'travel', title: 'Flights & recovery stay booked', detail: 'MEM→BKK + companion; 8-night recovery suite + airport transfers.', date: 'Jun 20', owner: 'Concierge', status: 'upcoming' },
  { id: 'J8', stage: 'travel', title: 'Medical visa issued', detail: 'Thai medical visa auto-prepared from passport; provider invite letter attached.', date: 'Jun 21', owner: 'Atlas', status: 'upcoming', automated: true },
  { id: 'J9', stage: 'surgery', title: 'Admission & procedure', detail: 'Pre-anesthesia sign-off → TKA; milestones 3–4 release on triggers.', date: 'Jun 24', owner: 'Provider', status: 'upcoming' },
  { id: 'J10', stage: 'recovery', title: 'In-country recovery & physio', detail: '8-night supervised recovery; daily Atlas check-ins to care team.', date: 'Jun 26', owner: 'Concierge', status: 'upcoming' },
  { id: 'J11', stage: 'recovery', title: '30-day outcome check', detail: 'Remote follow-up; final escrow milestone releases on cleared outcome.', date: 'Jul 26', owner: 'Atlas', status: 'upcoming', automated: true },
]

export const journeyKpis = {
  daysToSurgery: 5,
  automatedSteps: 6,
  totalSteps: 11,
  onTrack: true,
}

/** Travel logistics summary for the journey screen. */
export const logistics = {
  flight: { route: 'MEM → BKK', detail: '1 stop · 22h · patient + companion', date: 'Jun 20' },
  stay: { name: 'Recovery suite · 8 nights', detail: 'Provider-adjacent · nurse check-ins', date: 'Jun 24–Jul 02' },
  transfers: { name: 'Airport & clinic transfers', detail: 'Private, wheelchair-ready', date: 'Included' },
  companion: { name: 'Companion care', detail: '1 traveler · concierge support', date: 'Confirmed' },
}
