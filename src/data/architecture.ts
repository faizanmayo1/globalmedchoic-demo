import type { KpiStat } from '@/types'

/** Platform scale KPIs. Illustrative demo figures. */
export const architectureKpis: KpiStat[] = [
  { label: 'Records unified', value: '12.4M', delta: '▲ 9%', deltaTone: 'positive', sub: 'across all sources' },
  { label: 'Connected systems', value: '38', delta: '▲ 4', deltaTone: 'positive', sub: 'EHR · payments · identity' },
  { label: 'Events / day', value: '1.8M', delta: 'real-time', deltaTone: 'ai', sub: 'streamed to Atlas' },
  { label: 'Platform uptime', value: '99.98%', delta: 'SLA met', deltaTone: 'positive', sub: 'trailing 90 days' },
]

export interface ArchLayer {
  id: string
  tier: string
  title: string
  blurb: string
  tone: 'teal' | 'gold' | 'ai'
  items: string[]
}

/** The layered platform stack — built once, scales without a rebuild. */
export const archLayers: ArchLayer[] = [
  {
    id: 'L4',
    tier: 'Layer 4',
    title: 'Experience & APIs',
    blurb: 'The surfaces patients, care teams and partners touch — all reading one source of truth.',
    tone: 'gold',
    items: ['Care team console', 'Patient app', 'Partner / payer APIs', 'Embeddable widgets'],
  },
  {
    id: 'L3',
    tier: 'Layer 3',
    title: 'Atlas intelligence & decision systems',
    blurb: 'The reusable AI services every screen calls — matching, scoring, risk, eligibility, copilot.',
    tone: 'ai',
    items: ['Care-match engine', 'Provider scoring', 'Fraud & risk', 'Eligibility', 'FX & compliance', 'Copilot + audit'],
  },
  {
    id: 'L2',
    tier: 'Layer 2',
    title: 'Unified data fabric',
    blurb: 'FHIR-normalized, entity-resolved and provenance-tagged — the canonical model the AI builds on.',
    tone: 'teal',
    items: ['FHIR normalization', 'Entity resolution', 'Provenance & lineage', 'Feature store'],
  },
  {
    id: 'L1',
    tier: 'Layer 1',
    title: 'Ingestion & sources',
    blurb: 'Streaming + batch connectors to every upstream system, with schema contracts.',
    tone: 'teal',
    items: ['EHR / FHIR', 'Provider systems', 'Payment rails', 'Identity / KYC', 'Outcomes registries'],
  },
]

export type ServiceStatus = 'live' | 'scaling' | 'planned'

export interface DecisionService {
  name: string
  purpose: string
  status: ServiceStatus
  latency: string
}

/** Reusable AI decision services in the intelligence layer. */
export const decisionServices: DecisionService[] = [
  { name: 'Care-match engine', purpose: 'Quality × cost × travel ranking', status: 'live', latency: '~1.4s' },
  { name: 'Provider scoring', purpose: 'Composite quality / outcomes / safety', status: 'live', latency: 'nightly' },
  { name: 'Fraud & risk', purpose: 'Payment + billing anomaly scoring', status: 'live', latency: '~120ms' },
  { name: 'Eligibility review', purpose: 'Clinical candidacy + travel fitness', status: 'live', latency: '~2.1s' },
  { name: 'FX & compliance', purpose: 'Cross-border settlement + AML', status: 'live', latency: '~300ms' },
  { name: 'Outcomes prediction', purpose: 'Risk-adjusted recovery modeling', status: 'scaling', latency: 'beta' },
]

/** Pipeline flow stages, left → right. */
export const pipelineStages = [
  { id: 'P1', label: 'Ingest', detail: 'Stream + batch', tone: 'teal' as const },
  { id: 'P2', label: 'Normalize', detail: 'FHIR + resolve', tone: 'teal' as const },
  { id: 'P3', label: 'Enrich', detail: 'Features + provenance', tone: 'teal' as const },
  { id: 'P4', label: 'Decide', detail: 'Atlas services', tone: 'ai' as const },
  { id: 'P5', label: 'Surface', detail: 'Apps + APIs', tone: 'gold' as const },
]

/** Principles that make the layer durable (no rebuild later). */
export const scalePrinciples = [
  { title: 'Source-agnostic ingestion', detail: 'New EHR, payer or provider system plugs in via a schema contract — no downstream rewrites.' },
  { title: 'One canonical model', detail: 'Every screen and AI service reads the same FHIR-normalized truth, so features compound instead of fragmenting.' },
  { title: 'Reusable decision services', detail: 'Matching, scoring and risk are shared APIs — add a product surface without rebuilding the intelligence.' },
  { title: 'Governed & auditable by default', detail: 'Provenance, lineage and decision logs are built in, not bolted on — ready for clinical and payment compliance.' },
]
