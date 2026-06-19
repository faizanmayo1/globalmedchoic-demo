import type { CopilotTurn } from '@/types'

/** Atlas Copilot conversation — reasoning + citations for the audit trail. */
export const copilotTurns: CopilotTurn[] = [
  {
    id: 'C1',
    question: 'Why was Bangkok recommended over New Delhi for GMC-4471?',
    answer:
      'Both clear quality thresholds, but Bangkok scores higher on the composite (94 vs 91). New Delhi is cheaper ($19.2k vs $27.8k) yet recommends a longer 10-night recovery stay and a 19-hour routing; Bangkok balances a 1.1% complication rate, a 12-day surgical window and a direct-friendly route — netting a better risk-adjusted outcome for an elective TKA.',
    reasoning: [
      'Composite = 0.4·quality + 0.25·outcomes + 0.2·cost-fit + 0.15·travel-burden',
      'Bangkok complication rate 1.1% vs Delhi 1.3%; both JCI',
      'Travel burden lower for Bangkok despite higher fare (shorter recovery stay)',
    ],
    citations: ['PRV-BKK-01 outcomes registry', 'PRV-DEL-06 outcomes registry', 'Case GMC-4471 clinical profile'],
  },
  {
    id: 'C2',
    question: 'What is left before we can release the admission escrow milestone?',
    answer:
      'One open item: the cardiac clearance letter (provider-supplied) is still pending. Labs and the anesthesia questionnaire are verified. Once the letter is uploaded and Atlas verifies it against ASA II criteria, milestone 3 ($8,340) auto-queues for release on admission.',
    reasoning: [
      'Milestone 3 trigger = pre-anesthesia sign-off + admission',
      'Document vault: 4/6 verified; cardiac letter pending',
      'No risk flags on the payment rail for this case',
    ],
    citations: ['Escrow schedule ESC-3', 'GMC-4471 document vault', 'Risk engine · case clean'],
  },
  {
    id: 'C3',
    question: 'How much have we saved patients this year, and against what baseline?',
    answer:
      '$86.4M year-to-date across 1,284 cases — an average 41% reduction versus US all-in quotes (incl. travel and recovery). That tracks just above the 40% mission target, driven by Southeast Asia and Latin America corridors.',
    reasoning: [
      'Savings = Σ(US all-in quote − GMC all-in) per closed/active case',
      'Average reduction 41% vs 40% mission target',
      'Top corridors: SE Asia (412 cases), LatAm (338)',
    ],
    citations: ['Savings ledger YTD', 'Region mix', 'Mission KPI · cost reduction'],
  },
]

export const suggestedPrompts = [
  'Summarize GMC-4471 for the care team',
  'Which providers can take a TKA within 14 days?',
  'Flag any payments needing review today',
  'Compare all-in cost: Bangkok vs Istanbul',
]
