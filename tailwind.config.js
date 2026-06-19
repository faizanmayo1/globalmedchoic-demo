import animate from 'tailwindcss-animate'

/**
 * Global MedChoices — AI Care Intelligence Platform.
 *
 * Premium-concierge aesthetic: warm ivory canvas, editorial serif headlines,
 * deep clinical TEAL as the structural/brand spine, champagne GOLD as the
 * premium accent, and an aurora IRIS reserved STRICTLY for Atlas (the AI layer)
 * — enrichment, matches, reasoning, confidence. The iris is deliberately a
 * dusty, calm violet so AI provenance reads instantly and never blurs into the
 * teal/gold brand chrome. RED is risk only; GREEN signals savings/outcomes.
 */

// Deep clinical teal — structure, primary actions, the trust spine
const teal = {
  DEFAULT: '#0E5B52',
  deep: '#0B463F',
  ink: '#0A312C',
  soft: 'rgba(14, 91, 82, 0.10)',
  50: '#ECF6F3',
  100: '#D2EAE4',
  200: '#A6D4C9',
  300: '#6FB7A9',
  400: '#3F9486',
  500: '#0E5B52',
  600: '#0C4D45',
  700: '#0B3F39',
  800: '#0A312C',
  900: '#072622',
}

// Champagne gold — premium accent (concierge highlights, savings emphasis)
const gold = {
  DEFAULT: '#C2A24C',
  deep: '#A8862F',
  ink: '#7A6020',
  soft: 'rgba(194, 162, 76, 0.14)',
  50: '#FBF6E9',
  100: '#F5EBCC',
  200: '#EAD79B',
  300: '#DCBE78',
  400: '#CBAB5C',
  500: '#C2A24C',
}

// Aurora iris — AI ONLY (Atlas matches, reasoning, confidence, generation)
const ai = {
  DEFAULT: '#7C72D6',
  glow: '#9C93E6',
  deep: '#5A4FB0',
  ink: '#3F3680',
  soft: 'rgba(124, 114, 214, 0.13)',
  50: '#F1EFFB',
  100: '#E3E0F6',
  200: '#C8C2EE',
  300: '#A9A1E2',
  400: '#8E84DA',
  500: '#7C72D6',
}

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: { center: true, padding: '2rem', screens: { '2xl': '1440px' } },
    extend: {
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        // shadcn-style semantic tokens (HSL channels via CSS vars)
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },

        // ── Global MedChoices palette ───────────────────────────
        canvas: { DEFAULT: '#FBF8F3', subtle: '#F4EEE3', raised: '#FFFFFF' },
        ink: { DEFAULT: '#16241F', muted: '#566962', subtle: '#85948D', faint: '#AFBAB3' },
        hairline: { DEFAULT: '#E8E0D2', strong: '#D8CDBA' },

        teal,
        gold,
        ai,
        // alias so `brand-*` reads naturally in markup
        brand: teal,

        signal: {
          positive: '#1E8F5B',
          'positive-soft': '#DCF1E5',
          warning: '#C68A2E',
          'warning-soft': '#F8ECD4',
          risk: '#C0453B',
          'risk-soft': '#F7E2DF',
          info: '#0E5B52',
          'info-soft': '#DCEAE6',
          gold: '#C2A24C',
          'gold-soft': '#F4EBCF',
          ai: '#7C72D6',
          'ai-soft': '#E7E3F7',
          neutral: '#7C8A83',
          'neutral-soft': '#EEEAE0',
        },
      },
      borderRadius: { lg: 'var(--radius)', md: 'calc(var(--radius) - 2px)', sm: 'calc(var(--radius) - 4px)' },
      boxShadow: {
        'card-sm': '0 1px 2px rgba(22, 36, 31, 0.04), 0 1px 1px rgba(22, 36, 31, 0.03)',
        card: '0 1px 3px rgba(22, 36, 31, 0.06), 0 1px 2px rgba(22, 36, 31, 0.04)',
        'card-md': '0 4px 16px rgba(22, 36, 31, 0.07), 0 2px 4px rgba(22, 36, 31, 0.04)',
        'card-lg': '0 16px 40px rgba(22, 36, 31, 0.13), 0 4px 12px rgba(22, 36, 31, 0.06)',
        inset: 'inset 0 0 0 1px rgba(22, 36, 31, 0.05)',
        'ai-glow': '0 0 0 1px rgba(124, 114, 214, 0.30), 0 8px 26px -8px rgba(124, 114, 214, 0.38)',
        'gold-glow': '0 0 0 1px rgba(194, 162, 76, 0.30), 0 8px 26px -8px rgba(194, 162, 76, 0.34)',
        cta: '0 8px 20px -8px rgba(14, 91, 82, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.22)',
      },
      letterSpacing: { 'tight-bank': '-0.014em', 'wide-eyebrow': '0.18em' },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        'fade-in': { from: { opacity: '0', transform: 'translateY(4px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        'fade-in-up': { from: { opacity: '0', transform: 'translateY(10px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        'scan-sweep': { '0%': { transform: 'translateY(-120%)' }, '100%': { transform: 'translateY(460%)' } },
        'pulse-soft': { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.4' } },
        'stream-in': { from: { opacity: '0', transform: 'translateY(-6px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        'dash-draw': { to: { strokeDashoffset: '0' } },
        'route-dash': { to: { strokeDashoffset: '-24' } },
        'ping-soft': { '0%': { transform: 'scale(1)', opacity: '0.6' }, '100%': { transform: 'scale(2.4)', opacity: '0' } },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.4s ease-out both',
        'fade-in-up': 'fade-in-up 0.5s ease-out both',
        shimmer: 'shimmer 2.4s linear infinite',
        'scan-sweep': 'scan-sweep 1.8s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'stream-in': 'stream-in 0.45s ease-out both',
        'dash-draw': 'dash-draw 1.6s ease-out forwards',
        'route-dash': 'route-dash 0.9s linear infinite',
        'ping-soft': 'ping-soft 2.4s ease-out infinite',
      },
    },
  },
  plugins: [animate],
}
