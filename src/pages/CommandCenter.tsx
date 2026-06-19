import { Link } from 'react-router-dom'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  Activity,
  ArrowUpRight,
  Banknote,
  Globe2,
  HeartPulse,
  Sparkles,
  TrendingDown,
  Users,
} from 'lucide-react'

import { PageIntro, Panel, ScreenScaffold, SectionHead, StatCard } from '@/components/blocks'
import { WorldMap } from '@/components/WorldMap'
import { cn } from '@/utils/cn'
import {
  attentionItems,
  commandKpis,
  outcomeIndex,
  recentCases,
  regionMix,
  savingsSeries,
} from '@/data/metrics'
import { heroCase, matchedProvider } from '@/data/case'
import { networkStats } from '@/data/network'
import { formatNumber, formatPercent, formatUSDCompact } from '@/utils/format'
import { toneSoft } from '@/utils/tone'

const KPI_ICONS = [TrendingDown, Banknote, Users, Activity]
const KPI_ACCENT = ['teal', 'gold', 'teal', 'gold'] as const
// Raw targets + formatters so the hero KPIs count up on load (parallel to commandKpis).
const KPI_NUM: Array<{ countTo: number; format: (n: number) => string }> = [
  { countTo: 0.41, format: formatPercent },
  { countTo: 86_400_000, format: formatUSDCompact },
  { countTo: 1284, format: formatNumber },
  { countTo: 54_200_000, format: formatUSDCompact },
]

export function CommandCenter() {
  return (
    <ScreenScaffold>
      <PageIntro
        eyebrow="Overview · Live"
        title="Care Command Center"
        sub="One layer over the global network — savings delivered against the 40% mission, accredited providers worldwide, and every patient journey in flight."
      >
        <Link
          to="/match"
          className="cta-teal inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[13px] font-semibold text-white"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Open Atlas Match
        </Link>
      </PageIntro>

      {/* KPIs */}
      <div className="reveal grid grid-cols-2 gap-3 lg:grid-cols-4">
        {commandKpis.map((k, i) => (
          <StatCard
            key={k.label}
            label={k.label}
            countTo={KPI_NUM[i].countTo}
            format={KPI_NUM[i].format}
            delta={k.delta}
            deltaTone={k.deltaTone}
            sub={k.sub}
            icon={KPI_ICONS[i]}
            accent={KPI_ACCENT[i]}
          />
        ))}
      </div>

      {/* Map + right column */}
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1.55fr_1fr]">
        <Panel accent="teal" padded={false} className="overflow-hidden">
          <div className="flex items-start justify-between gap-4 px-5 pt-5">
            <SectionHead
              eyebrow="Accredited network"
              title="Global care routing"
              icon={Globe2}
              aside={undefined}
            />
            <span className="hidden items-center gap-1.5 rounded-full bg-signal-gold-soft px-2.5 py-1 text-[11px] font-medium text-gold-ink sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-soft" />
              {heroCase.id} · {matchedProvider.city}
            </span>
          </div>
          <WorldMap highlightId={heroCase.matchedProviderId} className="h-[340px] w-full rounded-none border-x-0 border-b-0" />
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-5 py-3.5 text-[11.5px] text-ink-muted">
            <Legend dot="bg-ink" label="Patient origin" />
            <Legend dot="bg-teal" label="Accredited provider" />
            <Legend dot="bg-gold" label={`Matched route · ${formatPercent(heroCase.savingsPct)} saved`} />
            <span className="ml-auto font-mono text-[11px] text-ink-subtle">
              {networkStats.providers} providers · {networkStats.countries} countries · {networkStats.jciAccredited} JCI
            </span>
          </div>
        </Panel>

        <div className="flex flex-col gap-4">
          {/* Outcomes index */}
          <Panel>
            <SectionHead eyebrow="Mission · +20% target" title="Care outcomes index" icon={HeartPulse} />
            <div className="space-y-3.5">
              {outcomeIndex.map((o) => (
                <div key={o.label}>
                  <div className="flex items-center justify-between text-[12.5px]">
                    <span className="font-medium text-ink">{o.label}</span>
                    <span className="font-mono font-semibold tabular text-signal-positive">+{o.value}%</span>
                  </div>
                  <div className="relative mt-1.5 h-2 overflow-hidden rounded-full bg-canvas-subtle">
                    <div className="h-full rounded-full bg-gradient-to-r from-teal to-teal-400" style={{ width: `${Math.min(100, (o.value / 30) * 100)}%` }} />
                    <span
                      className="absolute top-1/2 h-3 w-0.5 -translate-y-1/2 rounded bg-gold"
                      style={{ left: `${(o.target / 30) * 100}%` }}
                      title={`Target +${o.target}%`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11.5px] text-ink-subtle">Gold marker = +20% mission target. All three exceeding.</p>
          </Panel>

          {/* Region mix */}
          <Panel>
            <SectionHead eyebrow="Active cases" title="Where care is routed" />
            <div className="space-y-2">
              {regionMix.map((r) => {
                const max = Math.max(...regionMix.map((x) => x.cases))
                return (
                  <div key={r.region} className="flex items-center gap-2.5">
                    <span className="w-28 shrink-0 truncate text-[12px] text-ink-muted">{r.region}</span>
                    <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-canvas-subtle">
                      <div className="h-full rounded-full" style={{ width: `${(r.cases / max) * 100}%`, backgroundColor: r.color }} />
                    </div>
                    <span className="w-9 text-right font-mono text-[11.5px] tabular text-ink">{r.cases}</span>
                  </div>
                )
              })}
            </div>
          </Panel>
        </div>
      </div>

      {/* Savings chart + cases + attention */}
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1fr_1fr]">
        <Panel>
          <SectionHead eyebrow="Year to date" title="Savings delivered" icon={Banknote} aside={<span className="font-mono text-[12px] font-semibold text-teal">$86.4M</span>} />
          <ResponsiveContainer width="100%" height={188}>
            <AreaChart data={savingsSeries} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
              <defs>
                <linearGradient id="savFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0E5B52" stopOpacity={0.32} />
                  <stop offset="100%" stopColor="#0E5B52" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E0D2" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#85948D' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#85948D' }} axisLine={false} tickLine={false} width={42} tickFormatter={(v) => `$${v}M`} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: '1px solid #E8E0D2', fontSize: 12, boxShadow: '0 8px 24px rgba(22,36,31,0.12)' }}
                formatter={(v) => [`$${v}M`, 'Savings']}
              />
              <Area type="monotone" dataKey="savings" stroke="#0E5B52" strokeWidth={2.2} fill="url(#savFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>

        <Panel>
          <SectionHead eyebrow="Atlas" title="Needs attention" ai />
          <ul className="space-y-2">
            {attentionItems.map((a) => (
              <li key={a.id} className={cn('flex items-start gap-2.5 rounded-xl border p-3', a.tone === 'ai' ? 'border-ai/20 bg-signal-ai-soft/40' : 'border-hairline bg-canvas/40')}>
                <span className={cn('mt-0.5 h-2 w-2 shrink-0 rounded-full', a.tone === 'ai' ? 'bg-ai' : a.tone === 'warning' ? 'bg-signal-warning' : 'bg-signal-positive')} />
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-ink">{a.title}</p>
                  <p className="mt-0.5 text-[12px] leading-relaxed text-ink-muted">{a.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {/* Recent cases */}
      <Panel className="mt-4" padded={false}>
        <div className="flex items-start justify-between px-5 pt-5">
          <SectionHead eyebrow="In care journey" title="Active patient cases" icon={Users} />
          <Link to="/match" className="inline-flex items-center gap-1 text-[12.5px] font-medium text-teal hover:text-teal-deep">
            Open matcher <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-[13px]">
            <thead>
              <tr className="border-y border-hairline text-[11px] uppercase tracking-wide text-ink-subtle">
                <th className="px-5 py-2 font-medium">Case</th>
                <th className="px-3 py-2 font-medium">Procedure</th>
                <th className="px-3 py-2 font-medium">Destination</th>
                <th className="px-3 py-2 font-medium">Savings</th>
                <th className="px-3 py-2 font-medium">Stage</th>
              </tr>
            </thead>
            <tbody>
              {recentCases.map((c) => (
                <tr key={c.id} className={cn('border-b border-hairline/70 transition-colors hover:bg-canvas-subtle/50', c.hero && 'bg-signal-gold-soft/30')}>
                  <td className="px-5 py-2.5">
                    <span className="font-mono text-[12px] font-medium text-ink">{c.id}</span>
                    <span className="ml-2 text-ink-muted">{c.patient}</span>
                  </td>
                  <td className="px-3 py-2.5 text-ink-muted">{c.procedure}</td>
                  <td className="px-3 py-2.5 text-ink">{c.dest}</td>
                  <td className="px-3 py-2.5 font-mono font-medium tabular text-signal-positive">{formatPercent(c.savings)}</td>
                  <td className="px-3 py-2.5">
                    <span className={cn('rounded-full px-2 py-0.5 text-[11px] font-medium', toneSoft[c.tone])}>{c.stage}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </ScreenScaffold>
  )
}

function Legend({ dot, label }: { dot: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={cn('h-2.5 w-2.5 rounded-full', dot)} />
      {label}
    </span>
  )
}
