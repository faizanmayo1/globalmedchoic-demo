import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { CheckCircle2, X } from 'lucide-react'

import { cn } from '@/utils/cn'

interface ToastItem {
  id: number
  title: string
  detail?: string
  tone?: 'ai' | 'positive' | 'gold'
}

interface ToastCtx {
  push: (t: Omit<ToastItem, 'id'>) => void
}

const Ctx = createContext<ToastCtx | null>(null)

export function useToast() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

let nextId = 1

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])

  const push = useCallback((t: Omit<ToastItem, 'id'>) => {
    const id = nextId++
    setItems((cur) => [...cur, { ...t, id }])
    window.setTimeout(() => setItems((cur) => cur.filter((i) => i.id !== id)), 4200)
  }, [])

  const dismiss = (id: number) => setItems((cur) => cur.filter((i) => i.id !== id))

  return (
    <Ctx.Provider value={{ push }}>
      {children}
      <div className="pointer-events-none fixed bottom-5 right-5 z-[100] flex w-[340px] flex-col gap-2">
        {items.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto flex items-start gap-3 rounded-xl border border-hairline bg-card p-3.5 shadow-card-lg animate-stream-in"
          >
            <span
              className={cn(
                'mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg',
                t.tone === 'ai'
                  ? 'bg-signal-ai-soft text-ai-deep'
                  : t.tone === 'gold'
                    ? 'bg-signal-gold-soft text-gold-ink'
                    : 'bg-signal-positive-soft text-signal-positive',
              )}
            >
              <CheckCircle2 className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-ink">{t.title}</p>
              {t.detail && <p className="mt-0.5 text-xs text-ink-muted">{t.detail}</p>}
            </div>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              className="grid h-6 w-6 place-items-center rounded-md text-ink-subtle hover:bg-canvas-subtle hover:text-ink"
              aria-label="Dismiss"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </Ctx.Provider>
  )
}
