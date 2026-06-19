import { useEffect, useState, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Loader2,
  MapPin,
  Plane,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from 'lucide-react'

import {
  AINote,
  ConfidenceBar,
  PageIntro,
  Panel,
  Pill,
  Ring,
  ScreenScaffold,
  SectionHead,
} from '@/components/blocks'
import { CarePassport } from '@/components/CarePassport'
import { WorldMap } from '@/components/WorldMap'
import { cn } from '@/utils/cn'
import { costBreakdown, heroCase, heroMatches, matchedProvider } from '@/data/case'
import { providerById, providers } from '@/data/network'
import { formatPercent, formatUSD } from '@/utils/format'

type Phase = 'idle' | 'thinking' | 'done'

const REASONING = [
  'Parsing case GMC-4471 — TKA, ASA II, BMI 28.4, cleared for long-haul travel',
  'Screening 312 providers → 41 orthopaedic centers with JCI accreditation',
  'Scoring quality × outcomes × safety × surgeon volume',
  'Modeling all-in cost vs US $48,000 baseline (incl. travel + recovery)',
  'Ranking by composite match score and confidence',
]

export function GlobalCareMatch() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [params] = useSearchParams()

  const run = () => {
    setPhase('thinking')
    window.setTimeout(() => setPhase('done'), 1700)
  }

  // Deep-link affordance: /match?auto=1 jumps straight to the generated plan.
  useEffect(() => {
    if (params.get('auto') === '1') setPhase('done')
  }, [params])

  const usTotal = costBreakdown.reduce((s, l) => s + l.usUSD, 0)
  const gmcTotal = costBreakdown.reduce((s, l) => s + l.gmcUSD, 0)

  return (
    <ScreenScaffold>
      <PageIntro
        eyebrow="Cases · Atlas"
        title="Global Care Match"
        sub="Atlas matches a patient case to accredited global providers — scored on quality, cost and travel — and assembles a portable Care Passport."
      >
        <Pill tone="gold" className="px-2.5 py-1">
          <span className="font-mono">{heroCase.id}</span>
        </Pill>
      </PageIntro>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.45fr]">
        {/* Intake */}
        <div className="flex flex-col gap-4">
          <Panel accent="teal">
            <SectionHead eyebrow="Patient case" title="Intake" icon={Stethoscope} />
            <dl className="space-y-2.5 text-[13px]">
              <Row label="Patient">{heroCase.patient} · {heroCase.age}{heroCase.sex} · {heroCase.origin}</Row>
              <Row label="Procedure">{heroCase.procedure}</Row>
              <Row label="Acuity">{heroCase.acuity}</Row>
              <Row label="US quote">
                <span className="font-mono font-semibold text-signal-risk">{formatUSD(heroCase.usQuoteUSD)}</span>
              </Row>
            </dl>
            <div className="mt-3 rounded-xl border border-hairline bg-canvas/50 p-3">
              <p className="eyebrow mb-1">Clinical summary</p>
              <p className="text-[12.5px] leading-relaxed text-ink-muted">{heroCase.clinicalSummary}</p>
            </div>
            {phase === 'idle' && (
              <button onClick={run} className="cta-ai mt-4 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-semibold text-white">
                <Sparkles className="h-4 w-4" />
                Generate matches with Atlas
              </button>
            )}
            {phase === 'thinking' && (
              <button disabled className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-ai/80 px-4 py-2.5 text-[13px] font-semibold text-white">
                <Loader2 className="h-4 w-4 animate-spin" />
                Atlas analyzing…
              </button>
            )}
            {phase === 'done' && (
              <button onClick={() => setPhase('idle')} className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-hairline bg-canvas px-4 py-2.5 text-[13px] font-semibold text-ink-muted hover:bg-canvas-subtle">
                Reset demo
              </button>
            )}
          </Panel>

          {phase !== 'idle' && (
            <Panel accent="ai" className="animate-fade-in">
              <SectionHead eyebrow="Reasoning" title="How Atlas matched" ai />
              <ol className="space-y-2">
                {REASONING.map((step, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-[12.5px] text-ink-muted animate-stream-in"
                    style={{ animationDelay: `${i * 0.22}s` }}
                  >
                    {phase === 'done' ? (
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ai" />
                    ) : (
                      <Loader2 className="mt-0.5 h-3.5 w-3.5 shrink-0 animate-spin text-ai" />
                    )}
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              {phase === 'done' && (
                <div className="mt-3">
                  <AINote title="Atlas recommendation">
                    Best match: <strong className="text-ink">{matchedProvider.name}</strong>, {matchedProvider.city}. All-in{' '}
                    <strong className="text-teal">{formatUSD(heroCase.matchedPriceUSD)}</strong> — {formatPercent(heroCase.savingsPct)} below the US
                    quote with equal-or-better outcomes. Confidence 94%.
                  </AINote>
                </div>
              )}
            </Panel>
          )}
        </div>

        {/* Results */}
        <div className="flex flex-col gap-4">
          {phase !== 'done' ? (
            <Panel className="flex min-h-[420px] flex-col items-center justify-center gap-4 text-center">
              <WorldMap className="absolute inset-0 -z-0 opacity-[0.35]" highlightId={phase === 'thinking' ? heroCase.matchedProviderId : undefined} />
              <div className="relative z-10 flex flex-col items-center gap-3">
                <span className={cn('grid h-16 w-16 place-items-center rounded-2xl bg-signal-ai-soft text-ai-deep', phase === 'thinking' && 'animate-pulse-soft')}>
                  {phase === 'thinking' ? <Loader2 className="h-7 w-7 animate-spin" /> : <Sparkles className="h-7 w-7" />}
                </span>
                <p className="max-w-xs text-sm text-ink-muted">
                  {phase === 'thinking'
                    ? 'Atlas is scoring accredited providers across the network…'
                    : 'Run Atlas to generate a ranked global care plan and Care Passport.'}
                </p>
              </div>
            </Panel>
          ) : (
            <>
              {/* Cost comparison hero */}
              <Panel accent="gold" className="animate-fade-in">
                <SectionHead eyebrow="Cost comparison" title="US vs Global — all-in" />
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                  <div className="rounded-xl border border-hairline bg-canvas/50 p-3.5 text-center">
                    <p className="eyebrow">United States</p>
                    <p className="mt-1 font-display text-[26px] font-semibold tabular text-ink line-through decoration-signal-risk/50">{formatUSD(usTotal)}</p>
                  </div>
                  <div className="flex flex-col items-center text-signal-positive">
                    <ArrowRight className="h-5 w-5" />
                    <span className="mt-1 rounded-full bg-signal-positive-soft px-2 py-0.5 font-mono text-[12px] font-semibold">−{formatPercent(heroCase.savingsPct)}</span>
                  </div>
                  <div className="rounded-xl border border-teal/30 bg-teal-soft p-3.5 text-center">
                    <p className="eyebrow text-teal-deep">{matchedProvider.flag} {matchedProvider.city}</p>
                    <p className="mt-1 font-display text-[26px] font-semibold tabular text-teal">{formatUSD(gmcTotal)}</p>
                  </div>
                </div>
                <div className="mt-4 space-y-1.5">
                  {costBreakdown.map((l) => {
                    const max = Math.max(...costBreakdown.map((x) => x.usUSD || x.gmcUSD))
                    return (
                      <div key={l.line} className="grid grid-cols-[140px_1fr_auto] items-center gap-2 text-[11.5px]">
                        <span className="truncate text-ink-muted">{l.line}</span>
                        <div className="flex items-center gap-1.5">
                          <div className="h-2 rounded-full bg-signal-risk/30" style={{ width: `${(l.usUSD / max) * 50}%` }} />
                          <div className="h-2 rounded-full bg-teal" style={{ width: `${(l.gmcUSD / max) * 50}%` }} />
                        </div>
                        <span className="text-right font-mono tabular text-ink">{formatUSD(l.gmcUSD)}</span>
                      </div>
                    )
                  })}
                </div>
              </Panel>

              {/* Ranked matches */}
              <Panel className="animate-fade-in">
                <SectionHead eyebrow="Ranked by Atlas" title="Provider matches" ai aside={<span className="font-mono text-[11.5px] text-ink-subtle">{heroMatches.length} of {providers.length}</span>} />
                <div className="space-y-2.5">
                  {heroMatches.map((m) => {
                    const p = providerById(m.providerId)
                    if (!p) return null
                    return (
                      <div
                        key={m.providerId}
                        className={cn(
                          'rounded-xl border p-3.5 transition-colors',
                          m.recommended ? 'border-gold/40 bg-signal-gold-soft/40 shadow-gold-glow' : 'border-hairline bg-canvas/40 hover:border-teal/25',
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <Ring value={m.matchScore / 100} tone={m.recommended ? 'gold' : 'teal'} size={48} />
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-display text-[14px] font-semibold text-ink">{p.flag} {p.name}</span>
                              {m.recommended && <Pill tone="gold">Recommended</Pill>}
                            </div>
                            <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11.5px] text-ink-muted">
                              <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{p.city}, {p.country}</span>
                              <span className="inline-flex items-center gap-1"><Plane className="h-3 w-3" />{m.travelHours}h</span>
                              <span className="inline-flex items-center gap-1"><ShieldCheck className="h-3 w-3" />{p.accreditation.join(' · ')}</span>
                              <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{p.waitDays}-day window</span>
                            </p>
                          </div>
                          <div className="shrink-0 text-right">
                            <p className="font-mono text-[15px] font-semibold tabular text-teal">{formatUSD(m.priceUSD)}</p>
                            <p className="font-mono text-[11.5px] font-medium text-signal-positive">−{formatPercent(m.savingsPct)}</p>
                          </div>
                        </div>
                        <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 border-t border-hairline/70 pt-2.5">
                          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[11.5px] text-ink-muted">
                            {m.rationale.slice(0, 2).map((r, i) => (
                              <li key={i} className="inline-flex items-center gap-1">
                                <span className="h-1 w-1 rounded-full bg-teal" />
                                {r}
                              </li>
                            ))}
                          </ul>
                          <ConfidenceBar value={m.confidence} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Panel>

              {/* Care Passport artifact */}
              <CarePassport caseFile={heroCase} provider={matchedProvider} className="animate-fade-in" />
            </>
          )}
        </div>
      </div>
    </ScreenScaffold>
  )
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-ink-subtle">{label}</dt>
      <dd className="text-right font-medium text-ink">{children}</dd>
    </div>
  )
}
