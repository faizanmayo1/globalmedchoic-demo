import { PlaneTakeoff, ShieldCheck, Sparkles, Stethoscope } from 'lucide-react'

import type { CaseFile, Provider } from '@/types'
import { formatUSD, formatPercent } from '@/utils/format'
import { cn } from '@/utils/cn'

/**
 * Signature artifact — the "Care Passport": a boarding-pass-styled summary of an
 * Atlas-generated care plan (origin → accredited provider, all-in price, savings,
 * quality). The deliverable the patient and care team carry through the journey.
 */
export function CarePassport({
  caseFile,
  provider,
  className,
}: {
  caseFile: CaseFile
  provider: Provider
  className?: string
}) {
  return (
    <div
      className={cn(
        'surface-card relative overflow-hidden rounded-2xl border border-gold/30 shadow-card-lg',
        className,
      )}
    >
      <span className="gold-rule absolute inset-x-0 top-0" aria-hidden />

      {/* Header strip */}
      <div className="flex items-center justify-between gap-3 bg-teal px-5 py-3 text-white">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-gold-200" aria-hidden />
          <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-white/80">Atlas Care Passport</span>
        </div>
        <span className="rounded bg-white/15 px-2 py-0.5 font-mono text-[11px] tracking-wide">{caseFile.id}</span>
      </div>

      {/* Route */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-5 pt-5">
        <div>
          <p className="eyebrow">From</p>
          <p className="mt-0.5 font-display text-[18px] font-semibold text-ink">{caseFile.origin}</p>
          <p className="text-[11.5px] text-ink-subtle">Patient origin</p>
        </div>
        <div className="flex flex-col items-center px-1 text-gold">
          <PlaneTakeoff className="h-5 w-5" aria-hidden />
          <span className="mt-1 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
        </div>
        <div className="text-right">
          <p className="eyebrow">To</p>
          <p className="mt-0.5 font-display text-[18px] font-semibold text-ink">
            {provider.flag} {provider.city}
          </p>
          <p className="truncate text-[11.5px] text-ink-subtle">{provider.name}</p>
        </div>
      </div>

      {/* Perforation */}
      <div className="relative my-4">
        <div className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-canvas" />
        <div className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-canvas" />
        <div className="mx-5 border-t border-dashed border-hairline-strong" />
      </div>

      {/* Detail grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-4 px-5 pb-5 sm:grid-cols-4">
        <Field icon={Stethoscope} label="Procedure" value={caseFile.procedure} span />
        <Field label="All-in price" value={formatUSD(caseFile.matchedPriceUSD)} accent="teal" />
        <Field label="vs US quote" value={formatUSD(caseFile.usQuoteUSD)} strike />
        <Field label="Savings" value={formatPercent(caseFile.savingsPct)} accent="gold" />
        <Field icon={ShieldCheck} label="Quality" value={`${provider.qualityScore}/100`} accent="teal" />
        <Field label="Accreditation" value={provider.accreditation.join(' · ')} />
        <Field label="Surgeon" value={provider.surgeon} />
        <Field label="Surgical window" value={`${provider.waitDays} days`} />
      </div>
    </div>
  )
}

function Field({
  icon: Icon,
  label,
  value,
  accent,
  strike,
  span,
}: {
  icon?: typeof Stethoscope
  label: string
  value: string
  accent?: 'teal' | 'gold'
  strike?: boolean
  span?: boolean
}) {
  return (
    <div className={cn(span && 'col-span-2 sm:col-span-2')}>
      <p className="flex items-center gap-1 eyebrow">
        {Icon && <Icon className="h-3 w-3" aria-hidden />}
        {label}
      </p>
      <p
        className={cn(
          'mt-1 text-[13px] font-semibold leading-snug',
          accent === 'teal' ? 'text-teal' : accent === 'gold' ? 'text-gold-ink' : 'text-ink',
          strike && 'text-ink-subtle line-through decoration-signal-risk/50',
        )}
      >
        {value}
      </p>
    </div>
  )
}
