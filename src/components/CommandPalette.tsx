import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CornerDownLeft, Search, Sparkles } from 'lucide-react'

import { routeRegistry } from '@/routes/registry'
import { cn } from '@/utils/cn'

export const OPEN_COMMAND_EVENT = 'gmc:open-command'

export function CommandPalette() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)

  useEffect(() => {
    const openHandler = () => setOpen(true)
    window.addEventListener(OPEN_COMMAND_EVENT, openHandler)
    const key = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', key)
    return () => {
      window.removeEventListener(OPEN_COMMAND_EVENT, openHandler)
      window.removeEventListener('keydown', key)
    }
  }, [])

  useEffect(() => {
    if (!open) {
      setQuery('')
      setActive(0)
    }
  }, [open])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return routeRegistry
    return routeRegistry.filter(
      (r) => r.label.toLowerCase().includes(q) || r.description.toLowerCase().includes(q) || r.section.toLowerCase().includes(q),
    )
  }, [query])

  if (!open) return null

  const go = (path: string) => {
    navigate(path)
    setOpen(false)
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh]">
      <button type="button" aria-label="Close" className="absolute inset-0 bg-ink/30 backdrop-blur-[2px] animate-fade-in" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-[560px] overflow-hidden rounded-2xl border border-hairline bg-card shadow-card-lg animate-fade-in">
        <div className="flex items-center gap-2.5 border-b border-hairline px-4 py-3">
          <Search className="h-4 w-4 text-ink-subtle" />
          <input
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActive(0)
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault()
                setActive((a) => Math.min(a + 1, results.length - 1))
              }
              if (e.key === 'ArrowUp') {
                e.preventDefault()
                setActive((a) => Math.max(a - 1, 0))
              }
              if (e.key === 'Enter' && results[active]) go(results[active].path)
            }}
            placeholder="Search screens, cases, providers, payments…"
            className="flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
          />
          <kbd className="rounded border border-hairline bg-canvas px-1.5 py-0.5 font-mono text-[10px] text-ink-subtle">ESC</kbd>
        </div>
        <ul className="max-h-[320px] overflow-y-auto p-2">
          {results.map((r, i) => (
            <li key={r.path}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => go(r.path)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left',
                  i === active ? 'bg-teal-soft' : 'hover:bg-canvas-subtle',
                )}
              >
                <span className={cn('grid h-8 w-8 shrink-0 place-items-center rounded-lg', r.badge?.tone === 'ai' ? 'bg-signal-ai-soft text-ai-deep' : 'bg-teal-soft text-teal')}>
                  <r.icon className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5 text-[13px] font-medium text-ink">
                    {r.label}
                    {r.badge?.tone === 'ai' && <Sparkles className="h-3 w-3 text-ai-deep" />}
                  </span>
                  <span className="block truncate text-[11.5px] text-ink-subtle">{r.description}</span>
                </span>
                {i === active && <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-ink-faint" />}
              </button>
            </li>
          ))}
          {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-ink-subtle">No matches</li>}
        </ul>
      </div>
    </div>
  )
}
