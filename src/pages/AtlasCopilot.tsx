import { useState } from 'react'
import { ArrowUp, FileSearch, Quote, ShieldCheck, Sparkles, User } from 'lucide-react'

import { PageIntro, Panel, ScreenScaffold, SectionHead } from '@/components/blocks'
import { cn } from '@/utils/cn'
import { copilotTurns, suggestedPrompts } from '@/data/copilot'

export function AtlasCopilot() {
  const [draft, setDraft] = useState('')

  return (
    <ScreenScaffold>
      <PageIntro
        eyebrow="Atlas"
        title="Atlas Copilot & Decision Audit"
        sub="Ask Atlas across cases, providers and payments. Every answer carries its reasoning and a full citation trail — the audit layer that makes AI decisions defensible."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.55fr_1fr]">
        {/* Conversation */}
        <Panel padded={false} className="flex flex-col">
          <div className="border-b border-hairline px-5 py-3">
            <SectionHead eyebrow="Conversation" title="Ask Atlas" ai />
          </div>
          <div className="flex-1 space-y-5 overflow-y-auto p-5">
            {copilotTurns.map((t) => (
              <div key={t.id} className="space-y-3">
                {/* Question */}
                <div className="flex items-start justify-end gap-2.5">
                  <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-teal px-3.5 py-2.5 text-[13px] text-white">
                    {t.question}
                  </div>
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-teal-soft text-teal">
                    <User className="h-3.5 w-3.5" />
                  </span>
                </div>
                {/* Answer */}
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-signal-ai-soft text-ai-deep">
                    <Sparkles className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0 max-w-[88%] space-y-2.5">
                    <div className="rounded-2xl rounded-tl-sm border border-ai/20 bg-signal-ai-soft/40 px-3.5 py-2.5 text-[13px] leading-relaxed text-ink">
                      {t.answer}
                    </div>
                    <details className="group rounded-xl border border-hairline bg-canvas/50 px-3 py-2">
                      <summary className="flex cursor-pointer list-none items-center gap-1.5 text-[11.5px] font-medium text-ink-muted">
                        <FileSearch className="h-3.5 w-3.5 text-ai-deep" />
                        Reasoning & {t.citations.length} sources
                        <span className="ml-auto text-ink-subtle transition-transform group-open:rotate-180">⌄</span>
                      </summary>
                      <ol className="mt-2 space-y-1 border-t border-hairline/60 pt-2 text-[12px] text-ink-muted">
                        {t.reasoning.map((r, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ai" />
                            {r}
                          </li>
                        ))}
                      </ol>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {t.citations.map((c) => (
                          <span key={c} className="inline-flex items-center gap-1 rounded-full bg-card px-2 py-0.5 text-[10.5px] text-ink-muted ring-1 ring-hairline">
                            <Quote className="h-2.5 w-2.5 text-ai-deep" />
                            {c}
                          </span>
                        ))}
                      </div>
                    </details>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Composer */}
          <div className="border-t border-hairline p-3">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {suggestedPrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => setDraft(p)}
                  className="rounded-full border border-hairline bg-canvas px-2.5 py-1 text-[11.5px] text-ink-muted transition-colors hover:border-ai/40 hover:text-ai-deep"
                >
                  {p}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-hairline bg-card px-3 py-2 focus-within:border-ai/40">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Ask Atlas about a case, provider or payment…"
                className="flex-1 bg-transparent text-[13px] text-ink outline-none placeholder:text-ink-faint"
              />
              <button className="cta-ai grid h-8 w-8 place-items-center rounded-lg text-white" aria-label="Send">
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Panel>

        {/* Audit trail */}
        <div className="flex flex-col gap-4">
          <Panel accent="teal">
            <SectionHead eyebrow="Governance" title="Decision audit trail" icon={ShieldCheck} />
            <ul className="space-y-2.5">
              {[
                { t: '18:24', who: 'Atlas', what: 'Match recommendation issued · GMC-4471', tone: 'ai' },
                { t: '18:24', who: 'System', what: 'Sources logged: 3 registries, 1 clinical profile', tone: 'neutral' },
                { t: '14:02', who: 'Atlas', what: 'Escrow milestone 2 released on verified labs', tone: 'positive' },
                { t: '09:41', who: 'Risk engine', what: 'Invoice INV-4451-03 held — 11% variance', tone: 'warning' },
                { t: '09:41', who: 'C. Childress', what: 'Acknowledged hold; routed to review', tone: 'neutral' },
              ].map((e, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-1 font-mono text-[10.5px] text-ink-subtle">{e.t}</span>
                  <span
                    className={cn(
                      'mt-1 h-2 w-2 shrink-0 rounded-full',
                      e.tone === 'ai' ? 'bg-ai' : e.tone === 'positive' ? 'bg-signal-positive' : e.tone === 'warning' ? 'bg-signal-warning' : 'bg-ink-faint',
                    )}
                  />
                  <div className="min-w-0">
                    <p className="text-[12.5px] font-medium text-ink">{e.what}</p>
                    <p className="text-[11px] text-ink-subtle">{e.who}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel accent="ai">
            <SectionHead eyebrow="Why it matters" title="Defensible AI" ai />
            <p className="text-[13px] leading-relaxed text-ink-muted">
              For a healthcare × payments platform, every AI decision must be explainable and auditable. Atlas logs the
              inputs, the reasoning and the sources behind each recommendation and money movement — ready for clinical
              governance, payment compliance and patient transparency.
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px]">
              <Tag label="Explainable" />
              <Tag label="Sourced" />
              <Tag label="Logged" />
            </div>
          </Panel>
        </div>
      </div>
    </ScreenScaffold>
  )
}

function Tag({ label }: { label: string }) {
  return (
    <span className="rounded-lg bg-signal-ai-soft/50 px-2 py-1.5 font-medium text-ai-deep">{label}</span>
  )
}
