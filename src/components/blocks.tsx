import type { ComponentType, ReactNode } from 'react'
import { Sparkles, type LucideIcon } from 'lucide-react'

import type { Provenance, Tone, Verdict } from '@/types'
import { toneSoft } from '@/utils/tone'
import { cn } from '@/utils/cn'
import { useCountUp } from '@/utils/useCountUp'

/* ── Animated numeric value (count-up) ─────────────────────────────── */

function AnimatedValue({ target, format }: { target: number; format: (n: number) => string }) {
  const v = useCountUp(target, 1100)
  return <>{format(v)}</>
}

/* ── Panel ─────────────────────────────────────────────────────────── */

export function Panel({
  children,
  className,
  accent,
  padded = true,
}: {
  children: ReactNode
  className?: string
  accent?: 'teal' | 'gold' | 'ai'
  padded?: boolean
}) {
  return (
    <section
      className={cn(
        'surface-card edge-top relative overflow-hidden rounded-2xl border shadow-card-md',
        accent === 'ai' ? 'border-ai/25' : accent === 'gold' ? 'border-gold/30' : 'border-hairline',
        padded && 'p-5',
        className,
      )}
    >
      {accent === 'ai' && <span className="ai-sheen absolute inset-x-0 top-0 h-[2px]" aria-hidden />}
      {accent === 'teal' && <span className="teal-rule absolute inset-x-0 top-0" aria-hidden />}
      {accent === 'gold' && <span className="gold-rule absolute inset-x-0 top-0" aria-hidden />}
      {children}
    </section>
  )
}

/* ── Section heading ───────────────────────────────────────────────── */

export function SectionHead({
  eyebrow,
  title,
  icon: Icon,
  aside,
  ai,
}: {
  eyebrow?: string
  title: string
  icon?: LucideIcon
  aside?: ReactNode
  ai?: boolean
}) {
  return (
    <div className="mb-4 flex items-start justify-between gap-4">
      <div className="flex items-start gap-2.5">
        {Icon && (
          <span
            className={cn(
              'mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg',
              ai ? 'bg-signal-ai-soft text-ai-deep' : 'bg-teal-soft text-teal',
            )}
          >
            <Icon className="h-4 w-4" />
          </span>
        )}
        <div>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h3 className="font-display text-[16px] font-semibold leading-tight text-ink">{title}</h3>
        </div>
      </div>
      {aside}
    </div>
  )
}

/* ── Page intro ────────────────────────────────────────────────────── */

export function PageIntro({
  eyebrow,
  title,
  sub,
  children,
}: {
  eyebrow: string
  title: string
  sub?: string
  children?: ReactNode
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        <p className="eyebrow flex items-center gap-2">
          <span className="h-px w-6 bg-gradient-to-r from-gold to-gold/0" aria-hidden />
          {eyebrow}
        </p>
        <h1 className="mt-2 text-balance font-display text-[27px] font-semibold leading-[1.04] tracking-tight-bank text-ink lg:text-[34px]">
          {title}
        </h1>
        {sub && <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-ink-muted">{sub}</p>}
      </div>
      {children && <div className="flex shrink-0 items-center gap-2">{children}</div>}
    </div>
  )
}

/* ── Tone pill ─────────────────────────────────────────────────────── */

export function Pill({ tone = 'neutral', children, className }: { tone?: Tone; children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium tabular',
        toneSoft[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

/* ── AI (Atlas) badge / note ───────────────────────────────────────── */

export function AIBadge({ children = 'Atlas', className }: { children?: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full bg-signal-ai-soft px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wide text-ai-deep',
        className,
      )}
    >
      <Sparkles className="h-3 w-3" aria-hidden />
      {children}
    </span>
  )
}

export function AINote({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <div className="rounded-xl border border-ai/25 bg-signal-ai-soft/55 p-3.5">
      <div className="mb-1 flex items-center gap-1.5">
        <Sparkles className="h-3.5 w-3.5 text-ai-deep" aria-hidden />
        <span className="text-[11px] font-semibold uppercase tracking-wide text-ai-deep">{title ?? 'Atlas'}</span>
      </div>
      <div className="text-[13px] leading-relaxed text-ink-muted">{children}</div>
    </div>
  )
}

/* ── Stat card ─────────────────────────────────────────────────────── */

export function StatCard({
  label,
  value,
  countTo,
  format,
  delta,
  deltaTone = 'neutral',
  sub,
  icon: Icon,
  accent = 'teal',
}: {
  label: string
  value?: ReactNode
  /** When provided (with `format`), the value animates 0 → countTo on mount. */
  countTo?: number
  format?: (n: number) => string
  delta?: string
  deltaTone?: Tone
  sub?: string
  icon?: LucideIcon
  accent?: 'teal' | 'gold' | 'ai'
}) {
  const iconWrap =
    accent === 'ai'
      ? 'bg-signal-ai-soft text-ai-deep group-hover:bg-ai group-hover:text-white'
      : accent === 'gold'
        ? 'bg-signal-gold-soft text-gold-ink group-hover:bg-gold group-hover:text-white'
        : 'bg-teal-soft text-teal group-hover:bg-teal group-hover:text-white'
  const accentRule = accent === 'ai' ? 'before:bg-ai/70' : accent === 'gold' ? 'before:bg-gold/80' : 'before:bg-teal/70'
  return (
    <div
      className={cn(
        'surface-card edge-top card-lift group relative overflow-hidden rounded-2xl border border-hairline p-4 shadow-card-md transition-shadow hover:border-teal/20 hover:shadow-card-lg',
        'before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:origin-left before:scale-x-0 before:rounded-full before:opacity-0 before:transition-all before:duration-300 group-hover:before:scale-x-100 group-hover:before:opacity-100',
        accentRule,
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-medium text-ink-muted">{label}</p>
        {Icon && (
          <span className={cn('grid h-7 w-7 place-items-center rounded-lg transition-colors', iconWrap)}>
            <Icon className="h-3.5 w-3.5" aria-hidden />
          </span>
        )}
      </div>
      <p className="mt-2.5 font-display text-[28px] font-semibold leading-none tracking-tight-bank text-ink tabular">
        {countTo != null && format ? <AnimatedValue target={countTo} format={format} /> : value}
      </p>
      <div className="mt-2.5 flex items-center gap-2">
        {delta && <span className={cn('rounded-full px-1.5 py-0.5 text-[11.5px] font-medium tabular', toneSoft[deltaTone])}>{delta}</span>}
        {sub && <span className="truncate text-[11.5px] text-ink-subtle">{sub}</span>}
      </div>
    </div>
  )
}

/* ── Verdict badge (Atlas review outcome) ──────────────────────────── */

const verdictMeta: Record<Verdict, { label: string; tone: Tone }> = {
  clear: { label: 'Cleared', tone: 'positive' },
  review: { label: 'Review', tone: 'warning' },
  block: { label: 'Hold', tone: 'risk' },
}

export function VerdictBadge({ verdict, className }: { verdict: Verdict; className?: string }) {
  const m = verdictMeta[verdict]
  return (
    <Pill tone={m.tone} className={cn('uppercase tracking-wide', className)}>
      <span className={cn('h-1.5 w-1.5 rounded-full', verdict === 'clear' ? 'bg-signal-positive' : verdict === 'review' ? 'bg-signal-warning' : 'bg-signal-risk')} />
      {m.label}
    </Pill>
  )
}

/* ── Provenance tag ────────────────────────────────────────────────── */

const provenanceMeta: Record<Provenance, { label: string; tone: Tone }> = {
  intake: { label: 'Intake', tone: 'info' },
  ehr: { label: 'EHR', tone: 'neutral' },
  atlas: { label: 'Atlas', tone: 'ai' },
  provider: { label: 'Provider', tone: 'gold' },
}

export function ProvenanceTag({ provenance }: { provenance: Provenance }) {
  const m = provenanceMeta[provenance]
  return (
    <span className={cn('inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium', toneSoft[m.tone])}>
      {provenance === 'atlas' && <Sparkles className="h-2.5 w-2.5" aria-hidden />}
      {m.label}
    </span>
  )
}

/* ── Score ring ────────────────────────────────────────────────────── */

export function Ring({
  value,
  size = 56,
  tone = 'teal',
  label,
  suffix,
}: {
  value: number // 0..1
  size?: number
  tone?: 'teal' | 'ai' | 'gold'
  label?: string
  suffix?: string
}) {
  const stroke = 5
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const pct = Math.max(0, Math.min(1, value))
  const color = tone === 'ai' ? '#7C72D6' : tone === 'gold' ? '#C2A24C' : '#0E5B52'
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E8E0D2" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
        />
      </svg>
      <span className="absolute font-display text-[13px] font-semibold tabular text-ink">
        {label ?? `${Math.round(pct * 100)}`}
        {suffix}
      </span>
    </div>
  )
}

/* ── Confidence bar (Atlas) ────────────────────────────────────────── */

export function ConfidenceBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-signal-ai-soft">
        <div className="h-full rounded-full bg-ai" style={{ width: `${Math.round(value * 100)}%` }} />
      </div>
      <span className="font-mono text-[10.5px] text-ai-deep tabular">{Math.round(value * 100)}%</span>
    </div>
  )
}

/* ── Score meter (horizontal, labelled) ────────────────────────────── */

export function ScoreMeter({ label, value, tone = 'teal' }: { label: string; value: number; tone?: 'teal' | 'ai' | 'gold' }) {
  const color = tone === 'ai' ? 'bg-ai' : tone === 'gold' ? 'bg-gold' : 'bg-teal'
  return (
    <div>
      <div className="flex items-center justify-between text-[11.5px]">
        <span className="text-ink-muted">{label}</span>
        <span className="font-mono font-medium tabular text-ink">{Math.round(value)}</span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-canvas-subtle">
        <div className={cn('h-full rounded-full', color)} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
      </div>
    </div>
  )
}

/* ── Screen scaffold ───────────────────────────────────────────────── */

export function ScreenScaffold({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-[1320px] animate-fade-in">{children}</div>
}

/* ── Icon tile (decorative) ────────────────────────────────────────── */

export function IconTile({ icon: Icon, tone = 'teal' }: { icon: ComponentType<{ className?: string }>; tone?: 'teal' | 'ai' | 'gold' | 'risk' }) {
  return (
    <span
      className={cn(
        'grid h-9 w-9 shrink-0 place-items-center rounded-lg',
        tone === 'ai'
          ? 'bg-signal-ai-soft text-ai-deep'
          : tone === 'gold'
            ? 'bg-signal-gold-soft text-gold-ink'
            : tone === 'risk'
              ? 'bg-signal-risk-soft text-signal-risk'
              : 'bg-teal-soft text-teal',
      )}
    >
      <Icon className="h-4 w-4" />
    </span>
  )
}
