import { cn } from '@/utils/cn'

/**
 * Global MedChoices wordmark — a teal globe with a champagne route-node (the
 * Atlas AI layer charting a path across the meridians). Serif display lockup.
 */
export function Wordmark({
  size = 'md',
  variant = 'full',
}: {
  size?: 'sm' | 'md'
  variant?: 'full' | 'mark'
}) {
  const dim = size === 'sm' ? 30 : 34
  return (
    <div className="flex items-center gap-2.5">
      <span
        className="grid shrink-0 place-items-center rounded-[10px] bg-teal text-white shadow-card-sm"
        style={{ width: dim, height: dim }}
        aria-hidden
      >
        <svg width={dim * 0.66} height={dim * 0.66} viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="9.2" stroke="white" strokeWidth="1.5" opacity="0.6" />
          <path
            d="M6.8 16h18.4M16 6.8c3.2 2.7 3.2 15.7 0 18.4M16 6.8c-3.2 2.7-3.2 15.7 0 18.4"
            stroke="white"
            strokeWidth="1.2"
            opacity="0.55"
          />
          <path
            d="M8.5 21.8C12.4 17 19.6 13.2 24 10.6"
            stroke="#DCBE78"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeDasharray="0.2 3.6"
          />
          <circle cx="24" cy="10.6" r="2.7" fill="#DCBE78" />
        </svg>
      </span>
      {variant === 'full' && (
        <div className="leading-none">
          <p
            className={cn(
              'font-display font-semibold tracking-tight-bank text-ink',
              size === 'sm' ? 'text-[16px]' : 'text-[18px]',
            )}
          >
            Global<span className="text-teal">MedChoices</span>
          </p>
          <p className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.24em] text-gold-ink">Care Intelligence</p>
        </div>
      )}
    </div>
  )
}
