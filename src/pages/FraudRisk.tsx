import { AlertTriangle, Banknote, Fingerprint, Search, ShieldAlert, ShieldCheck } from 'lucide-react'

import {
  AINote,
  ConfidenceBar,
  PageIntro,
  Panel,
  ScreenScaffold,
  SectionHead,
  StatCard,
  VerdictBadge,
} from '@/components/blocks'
import { cn } from '@/utils/cn'
import { detectionFactors, riskDistribution, riskKpis, riskSignals } from '@/data/risk'
import { formatNumber, formatUSD } from '@/utils/format'

const KPI_ICONS = [Search, AlertTriangle, Banknote, ShieldCheck]

export function FraudRisk() {
  const total = riskDistribution.reduce((s, b) => s + b.count, 0)

  return (
    <ScreenScaffold>
      <PageIntro
        eyebrow="Financial · Atlas"
        title="Fraud & Risk Engine"
        sub="Atlas screens every payment and claim — billing anomalies, payment fraud, identity and provider integrity — and scores risk before money moves."
      />

      <div className="reveal grid grid-cols-2 gap-3 lg:grid-cols-4">
        {riskKpis.map((k, i) => (
          <StatCard
            key={k.label}
            label={k.label}
            value={k.value}
            delta={k.delta}
            deltaTone={k.deltaTone}
            sub={k.sub}
            icon={KPI_ICONS[i]}
            accent={i === 2 ? 'gold' : i === 3 ? 'ai' : 'teal'}
          />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1.5fr_1fr]">
        {/* Signals */}
        <Panel padded={false}>
          <div className="flex items-center justify-between p-5 pb-3">
            <SectionHead eyebrow="Live" title="Risk signals" icon={ShieldAlert} ai />
            <span className="font-mono text-[11.5px] text-ink-subtle">{riskSignals.length} active</span>
          </div>
          <ul className="divide-y divide-hairline/70">
            {riskSignals.map((s) => (
              <li key={s.id} className="px-5 py-3 transition-colors hover:bg-canvas-subtle/50">
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      'mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg',
                      s.verdict === 'block' ? 'bg-signal-risk-soft text-signal-risk' : s.verdict === 'review' ? 'bg-signal-warning-soft text-signal-warning' : 'bg-signal-positive-soft text-signal-positive',
                    )}
                  >
                    {s.category === 'Identity' ? <Fingerprint className="h-4 w-4" /> : s.category === 'Payment fraud' ? <ShieldAlert className="h-4 w-4" /> : <Banknote className="h-4 w-4" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-[13.5px] font-semibold text-ink">{s.title}</p>
                      <VerdictBadge verdict={s.verdict} />
                    </div>
                    <p className="mt-0.5 text-[12px] leading-relaxed text-ink-muted">{s.detail}</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-ink-subtle">
                      <span className="font-mono">{s.entity}</span>
                      <span>{s.category}</span>
                      {s.amountUSD != null && <span className="font-mono text-ink-muted">{formatUSD(s.amountUSD)}</span>}
                      <span className="ml-auto">{s.detectedAt}</span>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1.5">
                    <div className="flex items-baseline gap-1">
                      <span className={cn('font-mono text-[18px] font-semibold tabular', s.verdict === 'block' ? 'text-signal-risk' : s.verdict === 'review' ? 'text-signal-warning' : 'text-signal-positive')}>{s.score}</span>
                      <span className="text-[10px] text-ink-subtle">/100</span>
                    </div>
                    <ConfidenceBar value={s.confidence} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        {/* Distribution + factors */}
        <div className="flex flex-col gap-4">
          <Panel>
            <SectionHead eyebrow="Last 30 days" title="Risk-score distribution" />
            <div className="space-y-2.5">
              {riskDistribution.map((b) => (
                <div key={b.band}>
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-ink-muted">{b.band}</span>
                    <span className="font-mono tabular text-ink">{formatNumber(b.count)}</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-canvas-subtle">
                    <div className="h-full rounded-full" style={{ width: `${(b.count / total) * 100}%`, backgroundColor: b.color }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11.5px] text-ink-subtle">96.3% of activity clears automatically; only high-score items reach a human.</p>
          </Panel>

          <Panel accent="ai">
            <SectionHead eyebrow="How Atlas scores risk" title="Detection signals" ai />
            <ul className="space-y-1.5 text-[12.5px] text-ink-muted">
              {detectionFactors.map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ai" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-3">
              <AINote title="Tie-in to escrow">
                Every milestone release is gated by this engine — a flagged invoice or payment auto-holds the relevant
                escrow milestone until it clears, so fraud is caught <em>before</em> funds move.
              </AINote>
            </div>
          </Panel>
        </div>
      </div>
    </ScreenScaffold>
  )
}
