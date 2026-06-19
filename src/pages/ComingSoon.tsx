import { useLocation } from 'react-router-dom'
import { ArrowUpRight, Sparkles } from 'lucide-react'

import { PageIntro, Panel, ScreenScaffold } from '@/components/blocks'
import { findRouteByPath } from '@/routes/registry'

/** Intentional placeholder for screens queued in the build sequence. */
export function ComingSoon() {
  const { pathname } = useLocation()
  const route = findRouteByPath(pathname)
  const Icon = route?.icon ?? Sparkles

  return (
    <ScreenScaffold>
      <PageIntro eyebrow={route?.eyebrow ?? 'Module'} title={route?.label ?? 'Module'} sub={route?.description} />
      <Panel accent="teal" className="flex flex-col items-center gap-4 py-16 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-2xl bg-teal-soft text-teal">
          <Icon className="h-7 w-7" />
        </span>
        <div className="max-w-md">
          <h3 className="font-display text-[19px] font-semibold text-ink">Next in the build sequence</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            This module is part of the Care Intelligence platform and is being built out screen by screen. The
            Command Center and Atlas Global Care Match are live now — explore those to see the full experience.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-signal-ai-soft px-3 py-1 text-[12px] font-medium text-ai-deep">
          <Sparkles className="h-3.5 w-3.5" />
          Powered by Atlas
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </Panel>
    </ScreenScaffold>
  )
}
