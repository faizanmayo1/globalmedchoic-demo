import { BedDouble, Car, CheckCircle2, Loader2, Plane, Sparkles, UserPlus, type LucideIcon } from 'lucide-react'

import { PageIntro, Panel, Pill, ScreenScaffold, SectionHead, StatCard } from '@/components/blocks'
import { cn } from '@/utils/cn'
import { journeyEvents, journeyKpis, logistics, type EventStatus, type Owner } from '@/data/journey'
import { heroCase } from '@/data/case'

const OWNER_TONE: Record<Owner, string> = {
  Patient: 'bg-signal-neutral-soft text-ink-muted',
  Atlas: 'bg-signal-ai-soft text-ai-deep',
  Provider: 'bg-signal-gold-soft text-gold-ink',
  Concierge: 'bg-teal-soft text-teal',
}

const DOT: Record<EventStatus, string> = {
  done: 'bg-signal-positive',
  active: 'bg-gold',
  upcoming: 'bg-hairline-strong',
}

export function CareJourney() {
  return (
    <ScreenScaffold>
      <PageIntro
        eyebrow="Network · Orchestration"
        title="Care Journey"
        sub="One orchestrated thread from consult to recovery — consults, financing, travel, surgery and follow-up — with Atlas automating the steps that don't need a human."
      >
        <Pill tone="gold" className="px-2.5 py-1"><span className="font-mono">{heroCase.id}</span></Pill>
      </PageIntro>

      <div className="reveal grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Days to surgery" value={`${journeyKpis.daysToSurgery}`} sub="on schedule" icon={Plane} accent="gold" />
        <StatCard label="Steps automated by Atlas" value={`${journeyKpis.automatedSteps}/${journeyKpis.totalSteps}`} delta="55%" deltaTone="ai" icon={Sparkles} accent="ai" />
        <StatCard label="Journey status" value="On track" delta="▲ ahead" deltaTone="positive" icon={CheckCircle2} />
        <StatCard label="All-in cost locked" value="$27.8K" sub="escrow protected" icon={CheckCircle2} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
        {/* Timeline */}
        <Panel>
          <SectionHead eyebrow="End to end" title="Orchestrated timeline" />
          <ol className="relative space-y-4 pl-6">
            <span className="absolute bottom-2 left-[9px] top-2 w-px bg-hairline" aria-hidden />
            {journeyEvents.map((e) => (
              <li key={e.id} className="relative">
                <span className={cn('absolute -left-6 top-0.5 grid h-4 w-4 place-items-center rounded-full ring-2 ring-card', DOT[e.status])}>
                  {e.status === 'done' && <CheckCircle2 className="h-3 w-3 text-white" />}
                  {e.status === 'active' && <Loader2 className="h-2.5 w-2.5 animate-spin text-white" />}
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <p className={cn('text-[13.5px] font-semibold', e.status === 'upcoming' ? 'text-ink-muted' : 'text-ink')}>{e.title}</p>
                  <span className={cn('rounded-full px-1.5 py-0.5 text-[10px] font-medium', OWNER_TONE[e.owner])}>{e.owner}</span>
                  {e.automated && (
                    <span className="inline-flex items-center gap-0.5 rounded-full bg-signal-ai-soft px-1.5 py-0.5 text-[10px] font-medium text-ai-deep">
                      <Sparkles className="h-2.5 w-2.5" />Auto
                    </span>
                  )}
                  <span className="ml-auto font-mono text-[11.5px] text-ink-subtle">{e.date}</span>
                </div>
                <p className="mt-0.5 text-[12.5px] leading-relaxed text-ink-muted">{e.detail}</p>
              </li>
            ))}
          </ol>
        </Panel>

        {/* Logistics */}
        <div className="flex flex-col gap-4">
          <Panel accent="teal">
            <SectionHead eyebrow="Travel & stay" title="Concierge logistics" icon={Plane} />
            <div className="space-y-2.5">
              <Logi icon={Plane} title={logistics.flight.route} detail={logistics.flight.detail} date={logistics.flight.date} />
              <Logi icon={BedDouble} title={logistics.stay.name} detail={logistics.stay.detail} date={logistics.stay.date} />
              <Logi icon={Car} title={logistics.transfers.name} detail={logistics.transfers.detail} date={logistics.transfers.date} />
              <Logi icon={UserPlus} title={logistics.companion.name} detail={logistics.companion.detail} date={logistics.companion.date} />
            </div>
          </Panel>

          <Panel accent="ai">
            <SectionHead eyebrow="Atlas" title="Smart automation" ai />
            <p className="text-[13px] leading-relaxed text-ink-muted">
              Atlas handles the repetitive coordination — building the clinical profile, generating matches, opening
              escrow, preparing the medical visa and running daily recovery check-ins — so the human team focuses on
              the patient. <strong className="text-ink">6 of 11</strong> steps are fully automated.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-[12px]">
              <Mini label="Profile build" />
              <Mini label="Global match" />
              <Mini label="Escrow open" />
              <Mini label="Visa prep" />
              <Mini label="Milestone release" />
              <Mini label="Recovery check-ins" />
            </div>
          </Panel>
        </div>
      </div>
    </ScreenScaffold>
  )
}

function Logi({ icon: Icon, title, detail, date }: { icon: LucideIcon; title: string; detail: string; date: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-hairline/70 bg-canvas/40 px-3 py-2.5">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-teal-soft text-teal">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-medium text-ink">{title}</p>
        <p className="truncate text-[11.5px] text-ink-subtle">{detail}</p>
      </div>
      <span className="shrink-0 font-mono text-[11.5px] text-ink-muted">{date}</span>
    </div>
  )
}

function Mini({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg bg-signal-ai-soft/50 px-2.5 py-1.5 text-ai-deep">
      <Sparkles className="h-3 w-3" />
      {label}
    </span>
  )
}
