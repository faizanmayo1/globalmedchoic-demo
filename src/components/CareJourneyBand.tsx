import { Stethoscope, Globe2, Wallet, Plane, Activity, HeartPulse, type LucideIcon } from 'lucide-react'

import type { JourneyStage } from '@/types'
import { heroCase, journeySteps } from '@/data/case'
import { cn } from '@/utils/cn'

const ICONS: Record<JourneyStage, LucideIcon> = {
  consult: Stethoscope,
  match: Globe2,
  finance: Wallet,
  travel: Plane,
  surgery: Activity,
  recovery: HeartPulse,
}

/**
 * Signature persistent spine — the six-stage medical-tourism care journey, with
 * the hero case (GMC-4471) plotted on it. Always visible in the shell so every
 * screen reads as one continuous patient journey.
 */
export function CareJourneyBand({ active }: { active?: JourneyStage }) {
  const current = active ?? heroCase.stage
  const activeIdx = journeySteps.findIndex((s) => s.key === current)

  return (
    <div className="flex items-center gap-3 overflow-x-auto">
      <span className="hidden shrink-0 items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-wide-eyebrow text-ink-subtle sm:flex">
        <span className="rounded bg-teal-soft px-1.5 py-0.5 font-semibold text-teal">{heroCase.id}</span>
        Care journey
      </span>
      <ol className="flex flex-1 items-center gap-1">
        {journeySteps.map((step, i) => {
          const Icon = ICONS[step.key]
          const done = i < activeIdx
          const isActive = i === activeIdx
          return (
            <li key={step.key} className="flex flex-1 items-center gap-1">
              <div
                className={cn(
                  'flex items-center gap-1.5 rounded-full border px-2 py-1 transition-colors',
                  isActive
                    ? 'border-gold/40 bg-signal-gold-soft text-gold-ink shadow-gold-glow'
                    : done
                      ? 'border-teal/25 bg-teal-soft text-teal'
                      : 'border-hairline bg-canvas text-ink-subtle',
                )}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span className="hidden text-[11px] font-medium md:inline">{step.label}</span>
              </div>
              {i < journeySteps.length - 1 && (
                <span
                  className={cn('h-px flex-1 min-w-3', done ? 'bg-teal/40' : 'bg-hairline')}
                  aria-hidden
                />
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
