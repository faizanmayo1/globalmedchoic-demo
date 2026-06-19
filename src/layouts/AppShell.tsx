import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Bell, Command, Globe2, HelpCircle, Menu, Search, Settings, Sparkles, X } from 'lucide-react'

import { CommandPalette, OPEN_COMMAND_EVENT } from '@/components/CommandPalette'
import { CareJourneyBand } from '@/components/CareJourneyBand'
import { Wordmark } from '@/components/Wordmark'
import { findRouteByPath, groupRoutesBySection } from '@/routes/registry'
import { ROUTES } from '@/routes/paths'
import { cn } from '@/utils/cn'

const openCommand = () => window.dispatchEvent(new CustomEvent(OPEN_COMMAND_EVENT))

/** Persistent reminder of the live, accredited network footprint. */
function NetworkChip() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-canvas-subtle px-2 py-0.5 text-[10.5px] font-medium text-ink-muted">
      <Globe2 className="h-3 w-3 text-teal" aria-hidden />
      41 countries · 312 providers
    </span>
  )
}

function WorkspaceBlock() {
  return (
    <div className="px-5 pb-3 pt-4">
      <p className="eyebrow">Workspace</p>
      <p className="mt-1 font-display text-[15px] font-semibold text-ink">Care Intelligence</p>
      <p className="text-xs text-ink-subtle">Global MedChoices · Atlas</p>
      <div className="mt-2">
        <NetworkChip />
      </div>
    </div>
  )
}

function NavSections({ onNavigate }: { onNavigate?: () => void }) {
  const sections = groupRoutesBySection()
  return (
    <nav className="flex-1 overflow-y-auto px-3 pb-2">
      {sections.map(({ section, entries }) => {
        if (entries.length === 0) return null
        return (
          <div key={section} className="mt-3 first:mt-1">
            <p className="px-2 pb-1.5 pt-1 eyebrow">{section}</p>
            <ul className="space-y-0.5">
              {entries.map((entry) => (
                <li key={entry.path}>
                  <NavLink
                    to={entry.path}
                    end={entry.end}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      cn(
                        'group relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-all',
                        isActive
                          ? 'bg-gradient-to-r from-teal/12 via-teal/[0.06] to-transparent font-semibold text-teal shadow-[inset_0_0_0_1px_rgba(14,91,82,0.10)]'
                          : 'text-ink-muted hover:bg-canvas-subtle hover:text-ink',
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={cn(
                            'absolute -left-3 bottom-1.5 top-1.5 w-0.5 rounded-r-full transition-colors',
                            isActive ? 'bg-gold' : 'bg-transparent',
                          )}
                          aria-hidden
                        />
                        <entry.icon className={cn('h-4 w-4 shrink-0', isActive ? 'text-teal' : 'text-ink-subtle group-hover:text-ink-muted')} />
                        <span className="flex-1 truncate">{entry.label}</span>
                        {entry.badge && (
                          <span
                            className={cn(
                              'ml-1 rounded px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-wide',
                              entry.badge.tone === 'ai'
                                ? 'bg-signal-ai-soft text-ai-deep'
                                : entry.badge.tone === 'gold'
                                  ? 'bg-signal-gold-soft text-gold-ink'
                                  : 'bg-canvas-subtle text-ink-subtle',
                            )}
                          >
                            {entry.badge.text}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </nav>
  )
}

function UserCard() {
  return (
    <div className="border-t border-hairline px-3 py-3">
      <button type="button" className="flex w-full items-center gap-2.5 rounded-md p-1.5 text-left transition-colors hover:bg-canvas-subtle">
        <div className="grid h-8 w-8 place-items-center rounded-full bg-teal text-xs font-semibold tabular text-white">CC</div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-ink">Collin J. Childress</p>
          <p className="truncate text-xs text-ink-subtle">Chairman & CEO</p>
        </div>
      </button>
    </div>
  )
}

export function AppShell() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const current = findRouteByPath(pathname)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    setMobileNavOpen(false)
  }, [pathname])

  return (
    <div className="flex min-h-screen bg-canvas text-ink">
      {/* Desktop sidebar */}
      <aside className="surface-card sticky top-0 hidden h-screen w-[256px] shrink-0 flex-col border-r border-hairline lg:flex">
        <div className="flex h-16 items-center px-5">
          <Wordmark size="md" />
        </div>
        <div className="divider-hairline mx-5" />
        <WorkspaceBlock />
        <NavSections />
        <UserCard />
      </aside>

      {/* Mobile drawer */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" aria-label="Close menu" className="absolute inset-0 bg-ink/30 backdrop-blur-[2px] animate-fade-in" onClick={() => setMobileNavOpen(false)} />
          <aside className="absolute left-0 top-0 flex h-full w-[280px] flex-col border-r border-hairline bg-card shadow-card-lg animate-fade-in">
            <div className="flex h-16 items-center justify-between px-5">
              <Wordmark size="md" />
              <button type="button" onClick={() => setMobileNavOpen(false)} className="grid h-8 w-8 place-items-center rounded-md text-ink-muted hover:bg-canvas-subtle hover:text-ink" aria-label="Close menu">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="divider-hairline mx-5" />
            <WorkspaceBlock />
            <NavSections onNavigate={() => setMobileNavOpen(false)} />
            <UserCard />
          </aside>
        </div>
      )}

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-hairline/80 bg-card/75 px-4 backdrop-blur-xl lg:px-6">
          <button type="button" onClick={() => setMobileNavOpen(true)} className="grid h-9 w-9 shrink-0 place-items-center rounded-md text-ink-muted hover:bg-canvas-subtle hover:text-ink lg:hidden" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>

          <div className="lg:hidden">
            <Wordmark size="sm" variant="mark" />
          </div>

          <div className="hidden min-w-0 flex-col lg:flex">
            <p className="eyebrow truncate">{current?.eyebrow ?? 'Global MedChoices'}</p>
            <h1 className="truncate font-display text-[15px] font-semibold leading-tight text-ink">{current?.label ?? 'Care Intelligence'}</h1>
          </div>

          <button
            type="button"
            onClick={openCommand}
            className="group ml-auto flex w-full max-w-[380px] items-center gap-2 rounded-md border border-hairline bg-canvas px-3 py-1.5 text-sm text-ink-subtle transition-colors hover:border-hairline-strong"
          >
            <Search className="h-4 w-4" aria-hidden />
            <span className="flex-1 text-left text-ink-faint group-hover:text-ink-subtle">Search cases, providers, payments…</span>
            <kbd className="hidden items-center gap-0.5 rounded border border-hairline bg-card px-1.5 py-0.5 font-mono text-[10px] text-ink-subtle sm:inline-flex">
              <Command className="h-3 w-3" />K
            </kbd>
          </button>

          <button
            type="button"
            onClick={() => navigate(ROUTES.copilot)}
            className="cta-ai inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-2 text-[13px] font-semibold text-white"
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            <span className="hidden sm:inline">Ask Atlas</span>
          </button>

          <div className="flex items-center gap-1">
            <button type="button" className="hidden h-9 w-9 place-items-center rounded-md text-ink-muted hover:bg-canvas-subtle hover:text-ink sm:grid" aria-label="Help">
              <HelpCircle className="h-4 w-4" />
            </button>
            <button type="button" className="relative grid h-9 w-9 place-items-center rounded-md text-ink-muted hover:bg-canvas-subtle hover:text-ink" aria-label="Notifications">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-signal-risk ring-2 ring-card" />
            </button>
            <button type="button" className="hidden h-9 w-9 place-items-center rounded-md text-ink-muted hover:bg-canvas-subtle hover:text-ink sm:grid" aria-label="Settings">
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* Signature care-journey spine — always visible */}
        <div className="sticky top-16 z-20 border-b border-hairline bg-gradient-to-b from-card/85 to-canvas/65 px-4 py-2.5 backdrop-blur-xl lg:px-6">
          <CareJourneyBand
            active={
              current?.path === ROUTES.match
                ? 'match'
                : current?.path === ROUTES.journey
                  ? 'travel'
                  : current?.path === ROUTES.payments
                    ? 'finance'
                    : undefined
            }
          />
        </div>

        <main className="flex-1 px-5 py-6 lg:px-8 lg:py-7">
          <Outlet />
        </main>
      </div>

      <CommandPalette />
    </div>
  )
}
