/**
 * Global MedChoices route constants. Page links and redirects MUST import from
 * here — never hard-code a route string in a page or component.
 */
export const ROUTES = {
  root: '/',
  match: '/match',
  passport: '/passport',
  providers: '/providers',
  journey: '/journey',
  payments: '/payments',
  risk: '/risk',
  architecture: '/architecture',
  copilot: '/copilot',
} as const

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]
