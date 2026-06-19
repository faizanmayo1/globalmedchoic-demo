import { ArrowRight, Boxes, Database, Layers, Network, Sparkles, Workflow } from 'lucide-react'

import { AINote, PageIntro, Panel, Pill, ScreenScaffold, SectionHead, StatCard } from '@/components/blocks'
import { cn } from '@/utils/cn'
import {
  archLayers,
  architectureKpis,
  decisionServices,
  pipelineStages,
  scalePrinciples,
  type ServiceStatus,
} from '@/data/architecture'
import type { Tone } from '@/types'

const KPI_ICONS = [Database, Network, Workflow, Boxes]
const KPI_ACCENT = ['teal', 'teal', 'ai', 'gold'] as const

const LAYER_TONE: Record<'teal' | 'gold' | 'ai', string> = {
  teal: 'border-teal/30 bg-teal-soft/50',
  gold: 'border-gold/35 bg-signal-gold-soft/50',
  ai: 'border-ai/30 bg-signal-ai-soft/50',
}
const CHIP_TONE: Record<'teal' | 'gold' | 'ai', string> = {
  teal: 'bg-teal text-white',
  gold: 'bg-gold text-white',
  ai: 'bg-ai text-white',
}

const SERVICE_STATUS: Record<ServiceStatus, { label: string; tone: Tone }> = {
  live: { label: 'Live', tone: 'positive' },
  scaling: { label: 'Scaling', tone: 'ai' },
  planned: { label: 'Planned', tone: 'neutral' },
}

export function DataArchitecture() {
  return (
    <ScreenScaffold>
      <PageIntro
        eyebrow="Platform · Architecture"
        title="Data & Intelligence Architecture"
        sub="The scalable data pipelines, decision systems and AI layers — structured once, early, so new sources, products and partners plug in without a rebuild."
      />

      <div className="reveal grid grid-cols-2 gap-3 lg:grid-cols-4">
        {architectureKpis.map((k, i) => (
          <StatCard key={k.label} label={k.label} value={k.value} delta={k.delta} deltaTone={k.deltaTone} sub={k.sub} icon={KPI_ICONS[i]} accent={KPI_ACCENT[i]} />
        ))}
      </div>

      {/* Pipeline flow */}
      <Panel accent="teal" className="mt-4">
        <SectionHead eyebrow="Data flow" title="Ingest → decide → surface" icon={Workflow} />
        <div className="flex flex-col items-stretch gap-2 md:flex-row md:items-center">
          {pipelineStages.map((s, i) => (
            <div key={s.id} className="flex flex-1 items-center gap-2">
              <div
                className={cn(
                  'flex-1 rounded-xl border p-3 text-center',
                  s.tone === 'ai' ? 'border-ai/30 bg-signal-ai-soft/50' : s.tone === 'gold' ? 'border-gold/35 bg-signal-gold-soft/50' : 'border-hairline bg-canvas/50',
                )}
              >
                <p className="text-[13px] font-semibold text-ink">{s.label}</p>
                <p className="mt-0.5 text-[11px] text-ink-muted">{s.detail}</p>
              </div>
              {i < pipelineStages.length - 1 && <ArrowRight className="hidden h-4 w-4 shrink-0 text-ink-subtle md:block" />}
            </div>
          ))}
        </div>
      </Panel>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
        {/* Layered stack */}
        <Panel>
          <SectionHead eyebrow="Platform stack" title="Layered, reusable, durable" icon={Layers} />
          <div className="space-y-2.5">
            {archLayers.map((l) => (
              <div key={l.id} className={cn('rounded-xl border p-3.5', LAYER_TONE[l.tone])}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={cn('rounded-md px-2 py-0.5 font-mono text-[10.5px] font-semibold', CHIP_TONE[l.tone])}>{l.tier}</span>
                  <p className="font-display text-[14.5px] font-semibold text-ink">{l.title}</p>
                  {l.tone === 'ai' && <Pill tone="ai">Atlas</Pill>}
                </div>
                <p className="mt-1 text-[12px] leading-relaxed text-ink-muted">{l.blurb}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {l.items.map((it) => (
                    <span key={it} className="rounded-md bg-card px-2 py-0.5 text-[11px] text-ink-muted ring-1 ring-hairline">{it}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-[11.5px] text-ink-subtle">
            <Sparkles className="h-3.5 w-3.5 text-ai-deep" />
            Each layer reads the one below — add a source or surface without touching the intelligence.
          </p>
        </Panel>

        {/* Decision services + principles */}
        <div className="flex flex-col gap-4">
          <Panel accent="ai">
            <SectionHead eyebrow="Intelligence layer" title="Decision services" icon={Network} ai />
            <ul className="space-y-2">
              {decisionServices.map((s) => {
                const meta = SERVICE_STATUS[s.status]
                return (
                  <li key={s.name} className="flex items-center gap-3 rounded-lg border border-hairline/70 bg-canvas/40 px-3 py-2">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-medium text-ink">{s.name}</p>
                      <p className="truncate text-[11.5px] text-ink-subtle">{s.purpose}</p>
                    </div>
                    <span className="font-mono text-[11px] text-ink-muted">{s.latency}</span>
                    <Pill tone={meta.tone}>{meta.label}</Pill>
                  </li>
                )
              })}
            </ul>
          </Panel>

          <Panel accent="gold">
            <SectionHead eyebrow="Built to scale" title="Why it won't need a rebuild" />
            <ul className="space-y-2.5">
              {scalePrinciples.map((p) => (
                <li key={p.title}>
                  <p className="text-[13px] font-semibold text-ink">{p.title}</p>
                  <p className="mt-0.5 text-[12px] leading-relaxed text-ink-muted">{p.detail}</p>
                </li>
              ))}
            </ul>
            <div className="mt-3">
              <AINote title="Strategic note">
                Structuring the data fabric and decision services early is what lets Global MedChoices add new corridors,
                payers and products later — compounding on one platform instead of rebuilding per initiative.
              </AINote>
            </div>
          </Panel>
        </div>
      </div>
    </ScreenScaffold>
  )
}
