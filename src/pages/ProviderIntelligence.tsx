import { useState } from 'react'
import { Award, ShieldCheck, Sparkles, Stethoscope, TrendingUp } from 'lucide-react'

import {
  AINote,
  PageIntro,
  Panel,
  Pill,
  Ring,
  ScoreMeter,
  ScreenScaffold,
  SectionHead,
  StatCard,
} from '@/components/blocks'
import { cn } from '@/utils/cn'
import { providers } from '@/data/network'
import { formatPercent, formatPercent1, formatUSD } from '@/utils/format'
import type { Tone } from '@/types'

const RISK_TONE: Record<string, Tone> = { low: 'positive', moderate: 'warning', elevated: 'risk' }

export function ProviderIntelligence() {
  const [selectedId, setSelectedId] = useState(providers[0].id)
  const selected = providers.find((p) => p.id === selectedId)!
  const avgQuality = Math.round(providers.reduce((s, p) => s + p.qualityScore, 0) / providers.length)
  const avgComplication = providers.reduce((s, p) => s + p.complicationRate, 0) / providers.length

  return (
    <ScreenScaffold>
      <PageIntro
        eyebrow="Network · Atlas"
        title="Provider Intelligence"
        sub="Every accredited provider scored by Atlas on quality, outcomes and safety — JCI accreditation, surgeon volume and complication rates — so matches improve quality and safety, not just cost."
      />

      <div className="reveal grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Accredited providers" value="312" sub="41 countries" icon={ShieldCheck} />
        <StatCard label="JCI-accredited" value="248" sub="79% of network" icon={Award} accent="gold" />
        <StatCard label="Avg. quality score" value={`${avgQuality}/100`} delta="▲ 2 pts" deltaTone="positive" icon={TrendingUp} />
        <StatCard label="Avg. complication rate" value={formatPercent1(avgComplication)} delta="▼ 0.2 pts" deltaTone="positive" sub="below US benchmark" icon={Stethoscope} accent="ai" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1.5fr_1fr]">
        {/* Provider list */}
        <Panel padded={false}>
          <div className="p-5 pb-3">
            <SectionHead eyebrow="Accredited network" title="Provider scorecards" icon={ShieldCheck} />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-[13px]">
              <thead>
                <tr className="border-y border-hairline text-[11px] uppercase tracking-wide text-ink-subtle">
                  <th className="px-5 py-2 font-medium">Provider</th>
                  <th className="px-3 py-2 font-medium">Quality</th>
                  <th className="px-3 py-2 font-medium">Complication</th>
                  <th className="px-3 py-2 font-medium">All-in</th>
                  <th className="px-3 py-2 font-medium">Risk</th>
                </tr>
              </thead>
              <tbody>
                {providers.map((p) => (
                  <tr
                    key={p.id}
                    onClick={() => setSelectedId(p.id)}
                    className={cn(
                      'cursor-pointer border-b border-hairline/70 transition-colors hover:bg-canvas-subtle/60',
                      p.id === selectedId && 'bg-teal-soft/60',
                    )}
                  >
                    <td className="px-5 py-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[15px]">{p.flag}</span>
                        <div className="min-w-0">
                          <p className="truncate font-medium text-ink">{p.city}</p>
                          <p className="truncate text-[11px] text-ink-subtle">{p.accreditation.join(' · ')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="font-mono font-semibold tabular text-teal">{p.qualityScore}</span>
                    </td>
                    <td className="px-3 py-2.5 font-mono tabular text-ink-muted">{formatPercent1(p.complicationRate)}</td>
                    <td className="px-3 py-2.5">
                      <span className="font-mono tabular text-ink">{formatUSD(p.priceUSD)}</span>
                      <span className="ml-1.5 font-mono text-[11px] text-signal-positive">−{formatPercent(p.savingsPct)}</span>
                    </td>
                    <td className="px-3 py-2.5">
                      <Pill tone={RISK_TONE[p.riskTier]} className="capitalize">{p.riskTier}</Pill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        {/* Spotlight + methodology */}
        <div className="flex flex-col gap-4">
          <Panel accent="teal">
            <SectionHead eyebrow="Spotlight" title={selected.city} icon={Award} aside={<span className="text-[15px]">{selected.flag}</span>} />
            <p className="-mt-2 mb-3 text-[12.5px] text-ink-muted">{selected.name}</p>
            <div className="mb-4 flex items-center gap-4">
              <Ring value={selected.qualityScore / 100} tone="teal" size={66} suffix="" />
              <div className="flex-1 space-y-2.5">
                <ScoreMeter label="Outcomes" value={selected.outcomesScore} tone="teal" />
                <ScoreMeter label="Safety" value={selected.safetyScore} tone="teal" />
              </div>
            </div>
            <dl className="grid grid-cols-2 gap-3 text-[12.5px]">
              <Fact label="Volume / yr" value={selected.volumeAnnual.toLocaleString()} />
              <Fact label="Complication" value={formatPercent1(selected.complicationRate)} />
              <Fact label="Surgical window" value={`${selected.waitDays} days`} />
              <Fact label="All-in" value={formatUSD(selected.priceUSD)} />
            </dl>
            <div className="mt-3 flex items-center gap-2 rounded-lg border border-hairline/70 bg-canvas/40 px-3 py-2">
              <Stethoscope className="h-4 w-4 text-teal" />
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-ink">{selected.surgeon}</p>
                <p className="text-[11.5px] text-ink-subtle">{selected.surgeonCreds}</p>
              </div>
            </div>
          </Panel>

          <Panel accent="ai">
            <SectionHead eyebrow="Methodology" title="How Atlas scores" ai />
            <AINote title="Composite quality score">
              A 0–100 score blending accreditation depth, risk-adjusted outcomes, procedure-specific volume,
              complication and readmission rates, and patient-reported recovery — refreshed against each provider's
              outcomes registry.
            </AINote>
            <ul className="mt-3 space-y-1.5 text-[12.5px] text-ink-muted">
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-ai" />Accreditation & re-verification (JCI, ISO, national)</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-ai" />Risk-adjusted outcomes + complication/readmission</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-ai" />Procedure-specific surgeon volume</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-ai" />Patient-reported recovery & satisfaction</li>
            </ul>
            <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-signal-gold-soft/60 px-3 py-2 text-[12px] text-gold-ink">
              <Sparkles className="h-3.5 w-3.5" />
              Mission impact: network-wide quality, safety and access all tracking above the +20% target.
            </div>
          </Panel>
        </div>
      </div>
    </ScreenScaffold>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-hairline/60 bg-canvas/40 px-3 py-2">
      <p className="eyebrow">{label}</p>
      <p className="mt-0.5 font-mono text-[14px] font-semibold tabular text-ink">{value}</p>
    </div>
  )
}
