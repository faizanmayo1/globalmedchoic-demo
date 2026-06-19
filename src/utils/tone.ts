import type { Tone } from '@/types'

/** Background + text utility classes per semantic tone (soft pills). */
export const toneSoft: Record<Tone, string> = {
  positive: 'bg-signal-positive-soft text-signal-positive',
  negative: 'bg-signal-risk-soft text-signal-risk',
  warning: 'bg-signal-warning-soft text-signal-warning',
  risk: 'bg-signal-risk-soft text-signal-risk',
  info: 'bg-signal-info-soft text-teal-deep',
  gold: 'bg-signal-gold-soft text-gold-ink',
  ai: 'bg-signal-ai-soft text-ai-deep',
  neutral: 'bg-signal-neutral-soft text-ink-muted',
}

/** Solid dot colour per tone (status indicators). */
export const toneDot: Record<Tone, string> = {
  positive: 'bg-signal-positive',
  negative: 'bg-signal-risk',
  warning: 'bg-signal-warning',
  risk: 'bg-signal-risk',
  info: 'bg-signal-info',
  gold: 'bg-signal-gold',
  ai: 'bg-ai',
  neutral: 'bg-signal-neutral',
}

/** Plain text colour per tone. */
export const toneText: Record<Tone, string> = {
  positive: 'text-signal-positive',
  negative: 'text-signal-risk',
  warning: 'text-signal-warning',
  risk: 'text-signal-risk',
  info: 'text-teal-deep',
  gold: 'text-gold-ink',
  ai: 'text-ai-deep',
  neutral: 'text-ink-muted',
}

/** Verdict (review outcome) → tone. */
export const verdictTone = (verdict: 'clear' | 'review' | 'block'): Tone =>
  verdict === 'clear' ? 'positive' : verdict === 'review' ? 'warning' : 'risk'
