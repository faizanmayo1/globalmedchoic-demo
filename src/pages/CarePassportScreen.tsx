import type { ReactNode } from 'react'
import {
  CheckCircle2,
  Clock,
  Download,
  FileText,
  HeartPulse,
  MapPin,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  User,
} from 'lucide-react'

import {
  AINote,
  ConfidenceBar,
  PageIntro,
  Panel,
  Pill,
  ProvenanceTag,
  ScoreMeter,
  ScreenScaffold,
  SectionHead,
  VerdictBadge,
} from '@/components/blocks'
import { CarePassport } from '@/components/CarePassport'
import { cn } from '@/utils/cn'
import {
  caseDocuments,
  clinicalProfile,
  eligibilityReasoning,
  escrowSchedule,
  heroCase,
  matchedProvider,
  type DocStatus,
} from '@/data/case'
import { formatUSD } from '@/utils/format'

const DOC_TONE: Record<DocStatus, { label: string; tone: 'positive' | 'warning' | 'risk' }> = {
  verified: { label: 'Verified', tone: 'positive' },
  pending: { label: 'Pending', tone: 'warning' },
  flagged: { label: 'Flagged', tone: 'risk' },
}

export function CarePassportScreen() {
  const verifiedDocs = caseDocuments.filter((d) => d.status === 'verified').length

  return (
    <ScreenScaffold>
      <PageIntro
        eyebrow="Cases · Atlas"
        title="Care Passport"
        sub="The patient case file — Atlas-assembled clinical profile, eligibility review and the portable care plan that travels with the patient."
      >
        <Pill tone="gold" className="px-2.5 py-1">
          <span className="font-mono">{heroCase.id}</span>
        </Pill>
        <button className="cta-teal inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[13px] font-semibold text-white">
          <Download className="h-3.5 w-3.5" />
          Export
        </button>
      </PageIntro>

      {/* Identity strip */}
      <Panel accent="teal" className="mb-4">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-teal text-[15px] font-semibold text-white">RH</span>
            <div>
              <p className="font-display text-[18px] font-semibold text-ink">{heroCase.patient}</p>
              <p className="text-[12.5px] text-ink-muted">
                {heroCase.age}{heroCase.sex} · <MapPin className="inline h-3 w-3" /> {heroCase.origin}
              </p>
            </div>
          </div>
          <Divider />
          <Meta label="Procedure" value={heroCase.procedure} />
          <Divider />
          <Meta label="Eligibility" value={<VerdictBadge verdict={heroCase.eligibility} />} />
          <Divider />
          <Meta label="Journey stage" value={<Pill tone="gold">Finance</Pill>} />
          <div className="ml-auto text-right">
            <p className="eyebrow">All-in</p>
            <p className="font-display text-[20px] font-semibold text-teal">{formatUSD(heroCase.matchedPriceUSD)}</p>
          </div>
        </div>
      </Panel>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.1fr]">
        {/* Left: clinical + eligibility + docs */}
        <div className="flex flex-col gap-4">
          <Panel>
            <SectionHead eyebrow="Clinical profile" title="Patient record" icon={Stethoscope} />
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {clinicalProfile.map((f) => (
                <div key={f.label} className="border-b border-hairline/60 pb-2">
                  <div className="flex items-center justify-between">
                    <p className="eyebrow">{f.label}</p>
                    <ProvenanceTag provenance={f.provenance} />
                  </div>
                  <p className="mt-1 text-[13.5px] font-medium text-ink">{f.value}</p>
                  {f.confidence != null && (
                    <div className="mt-1">
                      <ConfidenceBar value={f.confidence} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Panel>

          <Panel accent="ai">
            <SectionHead eyebrow="Atlas review" title="Eligibility & safety" ai aside={<VerdictBadge verdict={heroCase.eligibility} />} />
            <ol className="space-y-2">
              {eligibilityReasoning.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-[12.5px] text-ink-muted">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ai" />
                  <span>{r}</span>
                </li>
              ))}
            </ol>
            {heroCase.flags.length > 0 && (
              <div className="mt-3">
                <AINote title="Open items before admission">
                  <ul className="space-y-1">
                    {heroCase.flags.map((f, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <Clock className="mt-0.5 h-3 w-3 shrink-0 text-signal-warning" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </AINote>
              </div>
            )}
          </Panel>

          <Panel>
            <SectionHead
              eyebrow="Document vault"
              title="Records & clearances"
              icon={FileText}
              aside={<span className="font-mono text-[11.5px] text-ink-subtle">{verifiedDocs}/{caseDocuments.length} verified</span>}
            />
            <ul className="space-y-1.5">
              {caseDocuments.map((d) => {
                const meta = DOC_TONE[d.status]
                return (
                  <li key={d.name} className="flex items-center gap-3 rounded-lg border border-hairline/70 bg-canvas/40 px-3 py-2">
                    <FileText className="h-4 w-4 shrink-0 text-ink-subtle" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-medium text-ink">{d.name}</p>
                      <p className="text-[11px] text-ink-subtle">{d.date}</p>
                    </div>
                    <ProvenanceTag provenance={d.provenance} />
                    <Pill tone={meta.tone}>{meta.label}</Pill>
                  </li>
                )
              })}
            </ul>
          </Panel>
        </div>

        {/* Right: passport + provider + escrow */}
        <div className="flex flex-col gap-4">
          <CarePassport caseFile={heroCase} provider={matchedProvider} />

          <Panel>
            <SectionHead
              eyebrow="Matched provider"
              title={matchedProvider.name}
              icon={ShieldCheck}
              aside={<span className="text-[12px] text-ink-muted">{matchedProvider.flag} {matchedProvider.city}</span>}
            />
            <div className="grid grid-cols-3 gap-4">
              <ScoreMeter label="Quality" value={matchedProvider.qualityScore} tone="teal" />
              <ScoreMeter label="Outcomes" value={matchedProvider.outcomesScore} tone="teal" />
              <ScoreMeter label="Safety" value={matchedProvider.safetyScore} tone="teal" />
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {matchedProvider.accreditation.map((a) => (
                <Pill key={a} tone="info">
                  <ShieldCheck className="h-3 w-3" />
                  {a}
                </Pill>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-lg border border-hairline/70 bg-canvas/40 px-3 py-2">
              <User className="h-4 w-4 text-teal" />
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-ink">{matchedProvider.surgeon}</p>
                <p className="text-[11.5px] text-ink-subtle">{matchedProvider.surgeonCreds}</p>
              </div>
            </div>
          </Panel>

          <Panel>
            <SectionHead eyebrow="Cross-border escrow" title="Milestone schedule" icon={HeartPulse} />
            <ol className="relative space-y-3 pl-5">
              <span className="absolute bottom-2 left-[7px] top-2 w-px bg-hairline" aria-hidden />
              {escrowSchedule.map((m) => (
                <li key={m.id} className="relative">
                  <span
                    className={cn(
                      'absolute -left-5 top-0.5 grid h-3.5 w-3.5 place-items-center rounded-full ring-2 ring-card',
                      m.status === 'released' ? 'bg-signal-positive' : m.status === 'held' ? 'bg-gold' : 'bg-hairline-strong',
                    )}
                  >
                    {m.status === 'released' && <CheckCircle2 className="h-3 w-3 text-white" />}
                  </span>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[13px] font-medium text-ink">{m.label}</p>
                    <span className="font-mono text-[12.5px] tabular text-ink">{formatUSD(m.amountUSD)}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[11.5px] text-ink-muted">{m.trigger}</p>
                    <span
                      className={cn(
                        'shrink-0 text-[11px] font-medium capitalize',
                        m.status === 'released' ? 'text-signal-positive' : m.status === 'held' ? 'text-gold-ink' : 'text-ink-subtle',
                      )}
                    >
                      {m.status} · {m.date}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-signal-ai-soft/50 px-3 py-2 text-[12px] text-ai-deep">
              <Sparkles className="h-3.5 w-3.5" />
              Atlas releases each milestone only when its trigger is verified — protecting the patient's funds.
            </div>
          </Panel>
        </div>
      </div>
    </ScreenScaffold>
  )
}

function Meta({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <p className="eyebrow">{label}</p>
      <div className="mt-0.5 text-[13.5px] font-medium text-ink">{value}</div>
    </div>
  )
}

function Divider() {
  return <span className="hidden h-9 w-px bg-hairline sm:block" aria-hidden />
}
