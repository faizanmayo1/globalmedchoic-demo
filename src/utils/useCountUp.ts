import { useEffect, useRef, useState } from 'react'

/**
 * Animate a number from 0 → target once, on mount. Ease-out cubic.
 * Returns the current animated value; consumers format it.
 */
export function useCountUp(target: number, durationMs = 900) {
  const [value, setValue] = useState(0)
  const raf = useRef<number | null>(null)
  const startedAt = useRef<number | null>(null)

  useEffect(() => {
    const tick = (now: number) => {
      if (startedAt.current == null) startedAt.current = now
      const elapsed = now - startedAt.current
      const t = Math.min(1, elapsed / durationMs)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(target * eased)
      if (t < 1) raf.current = requestAnimationFrame(tick)
      else setValue(target)
    }
    raf.current = requestAnimationFrame(tick)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
      startedAt.current = null
    }
  }, [target, durationMs])

  return value
}
