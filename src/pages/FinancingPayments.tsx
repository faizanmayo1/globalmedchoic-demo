import { ArrowRight, Banknote, CheckCircle2, Landmark, Lock, Repeat, Sparkles } from 'lucide-react'

import { AINote, PageIntro, Panel, Pill, ScreenScaffold, SectionHead, StatCard } from '@/components/blocks'
import { cn } from '@/utils/cn'
import { paymentsKpis, financingOptions, fxQuote, railStages } from '@/data/payments'
import { costBreakdown, escrowSchedule, heroCase } from '@/data/case'
import { formatNumber, formatUSD } from '@/utils/format'

const KPI_ICONS = [Banknote, Lock, Repeat, CheckCircle2]
const KPI_ACCENT = ['teal', 'gold', 'ai', 'teal'] as const

export function FinancingPayments() {
  const gmcTotal = costBreakdown.reduce((s, l) => s + l.gmcUSD, 0)

  return (
    <ScreenScaffold>
      <PageIntro
        eyebrow="Financial · Fintech"
        title="Financing & Payments"
        sub="The money layer: care financing, cross-border payment orchestration and milestone escrow — every dollar transparent and released only on a verified trigger."
      >
        <Pill tone="gold" className="px-2.5 py-1"><span className="font-mono">{heroCase.id}</span></Pill>
      </PageIntro>

      <div className="reveal grid grid-cols-2 gap-3 lg:grid-cols-4">
        {paymentsKpis.map((k, i) => (
          <StatCard key={k.label} label={k.label} value={k.value} delta={k.delta} deltaTone={k.deltaTone} sub={k.sub} icon={KPI_ICONS[i]} accent={KPI_ACCENT[i]} />
        ))}
      </div>

      {/* Settlement rail */}
      <Panel accent="gold" className="mt-4">
        <SectionHead eyebrow="Cross-border rail" title="Payment orchestration" icon={Landmark} />
        <div className="flex flex-col items-stretch gap-2 md:flex-row md:items-center">
          {railStages.map((s, i) => (
            <div key={s.id} className="flex flex-1 items-center gap-2">
              <div
                className={cn(
                  'flex-1 rounded-xl border p-3 text-center',
                  s.tone === 'gold' ? 'border-gold/40 bg-signal-gold-soft/50' : s.tone === 'ai' ? 'border-ai/30 bg-signal-ai-soft/50' : s.tone === 'positive' ? 'border-signal-positive/30 bg-signal-positive-soft/60' : 'border-hairline bg-canvas/50',
                )}
              >
                <p className="text-[13px] font-semibold text-ink">{s.label}</p>
                <p className="mt-0.5 text-[11px] text-ink-muted">{s.detail}</p>
              </div>
              {i < railStages.length - 1 && <ArrowRight className="hidden h-4 w-4 shrink-0 text-ink-subtle md:block" />}
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-signal-ai-soft/50 px-3 py-2 text-[12px] text-ai-deep">
          <Sparkles className="h-3.5 w-3.5" />
          Funds never sit with the provider until Atlas verifies each milestone trigger — patient money is protected end to end.
        </div>
      </Panel>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr]">
        {/* Financing options */}
        <Panel>
          <SectionHead eyebrow="Care financing" title={`Options for ${formatUSD(heroCase.matchedPriceUSD)}`} icon={Banknote} />
          <div className="space-y-2.5">
            {financingOptions.map((o) => (
              <div
                key={o.id}
                className={cn(
                  'rounded-xl border p-3.5',
                  o.highlight ? 'border-teal/40 bg-teal-soft/50 shadow-card' : 'border-hairline bg-canvas/40',
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <p className="font-display text-[14px] font-semibold text-ink">{o.name}</p>
                    {o.highlight && <Pill tone="positive">Selected</Pill>}
                  </div>
                  <p className="font-mono text-[15px] font-semibold tabular text-teal">
                    {o.monthly === heroCase.matchedPriceUSD ? formatUSD(o.monthly) : `${formatUSD(o.monthly)}/mo`}
                  </p>
                </div>
                <div className="mt-1.5 flex flex-wrap items-center justify-between gap-2 text-[11.5px] text-ink-muted">
                  <span>{o.term} · APR {o.apr}</span>
                  <span>{o.note}</span>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        {/* FX + transparent cost */}
        <div className="flex flex-col gap-4">
          <Panel accent="ai">
            <SectionHead eyebrow="Cross-border FX" title="USD → THB settlement" icon={Repeat} ai />
            <div className="flex items-center justify-between rounded-xl border border-hairline bg-canvas/40 p-3.5">
              <div>
                <p className="eyebrow">Sending</p>
                <p className="font-display text-[20px] font-semibold tabular text-ink">{formatUSD(fxQuote.amountUSD)}</p>
              </div>
              <div className="flex flex-col items-center text-ink-subtle">
                <span className="font-mono text-[11px]">@ {fxQuote.rate}</span>
                <ArrowRight className="h-4 w-4" />
              </div>
              <div className="text-right">
                <p className="eyebrow">Provider receives</p>
                <p className="font-display text-[20px] font-semibold tabular text-teal">฿{formatNumber(fxQuote.amountLocal)}</p>
              </div>
            </div>
            <AINote title="FX & compliance">
              Atlas routes at interbank-grade rates and runs AML/sanctions screening inline — saving{' '}
              <strong className="text-ink">{formatUSD(fxQuote.savedVsCard)}</strong> versus card-network FX on this transfer.
            </AINote>
          </Panel>

          <Panel>
            <SectionHead eyebrow="Transparent cost" title="Itemized all-in" aside={<span className="font-mono text-[13px] font-semibold text-teal">{formatUSD(gmcTotal)}</span>} />
            <ul className="space-y-1.5">
              {costBreakdown.map((l) => (
                <li key={l.line} className="flex items-center justify-between border-b border-hairline/50 pb-1.5 text-[12.5px]">
                  <span className="text-ink-muted">{l.line}</span>
                  <span className="font-mono tabular text-ink">{formatUSD(l.gmcUSD)}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>

      {/* Escrow schedule */}
      <Panel className="mt-4">
        <SectionHead eyebrow="Milestone escrow" title="Release schedule" icon={Lock} />
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-5">
          {escrowSchedule.map((m, i) => (
            <div key={m.id} className="relative rounded-xl border border-hairline bg-canvas/40 p-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10.5px] text-ink-subtle">{i + 1}</span>
                <span
                  className={cn(
                    'h-2 w-2 rounded-full',
                    m.status === 'released' ? 'bg-signal-positive' : m.status === 'held' ? 'bg-gold' : 'bg-hairline-strong',
                  )}
                />
              </div>
              <p className="mt-1 text-[12.5px] font-semibold text-ink">{m.label}</p>
              <p className="mt-0.5 font-mono text-[13px] tabular text-teal">{formatUSD(m.amountUSD)}</p>
              <p className={cn('mt-1 text-[10.5px] font-medium capitalize', m.status === 'released' ? 'text-signal-positive' : m.status === 'held' ? 'text-gold-ink' : 'text-ink-subtle')}>
                {m.status} · {m.date}
              </p>
            </div>
          ))}
        </div>
      </Panel>
    </ScreenScaffold>
  )
}
