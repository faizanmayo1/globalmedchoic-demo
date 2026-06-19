import {
  Banknote,
  Globe2,
  Layers,
  LayoutDashboard,
  type LucideIcon,
  MessageSquareText,
  Route,
  ShieldAlert,
  Stethoscope,
} from 'lucide-react'

import { ROUTES, type RoutePath } from './paths'

export type RouteSection = 'Overview' | 'Cases' | 'Network' | 'Financial' | 'Atlas' | 'Platform'

export interface RouteEntry {
  path: RoutePath
  label: string
  eyebrow: string
  description: string
  icon: LucideIcon
  section: RouteSection
  badge?: { text: string; tone?: 'ai' | 'gold' | 'soon' }
  end?: boolean
  ready?: boolean // built in this pass
}

export const routeRegistry: RouteEntry[] = [
  {
    path: ROUTES.root,
    label: 'Command Center',
    eyebrow: 'Overview',
    description: 'Global savings delivered, accredited-provider network map and active care journeys at a glance.',
    icon: LayoutDashboard,
    section: 'Overview',
    end: true,
    ready: true,
  },
  {
    path: ROUTES.match,
    label: 'Global Care Match',
    eyebrow: 'Cases',
    description: 'Atlas matches a patient case to accredited global providers — quality × cost × travel, with a Care Passport.',
    icon: Globe2,
    section: 'Cases',
    badge: { text: 'AI', tone: 'ai' },
    ready: true,
  },
  {
    path: ROUTES.passport,
    label: 'Care Passport',
    eyebrow: 'Cases',
    description: 'The patient case file: Atlas-built clinical profile, eligibility and the portable care plan.',
    icon: Stethoscope,
    section: 'Cases',
    badge: { text: 'AI', tone: 'ai' },
    ready: true,
  },
  {
    path: ROUTES.providers,
    label: 'Provider Intelligence',
    eyebrow: 'Network',
    description: 'Accredited network with Atlas quality, outcomes and safety scoring — JCI, surgeon volume, complication rates.',
    icon: ShieldAlert,
    section: 'Network',
    badge: { text: 'AI', tone: 'ai' },
    ready: true,
  },
  {
    path: ROUTES.journey,
    label: 'Care Journey',
    eyebrow: 'Network',
    description: 'Travel, consults, procedure and post-op recovery — orchestrated end to end with smart automation.',
    icon: Route,
    section: 'Network',
    ready: true,
  },
  {
    path: ROUTES.payments,
    label: 'Financing & Payments',
    eyebrow: 'Financial',
    description: 'Surgery financing, cross-border payment orchestration and milestone escrow with transparent costs.',
    icon: Banknote,
    section: 'Financial',
    badge: { text: 'Fintech', tone: 'gold' },
    ready: true,
  },
  {
    path: ROUTES.risk,
    label: 'Fraud & Risk Engine',
    eyebrow: 'Financial',
    description: 'Atlas fraud detection, billing-anomaly checks and risk scoring across payments and claims.',
    icon: ShieldAlert,
    section: 'Financial',
    badge: { text: 'AI', tone: 'ai' },
    ready: true,
  },
  {
    path: ROUTES.copilot,
    label: 'Atlas Copilot',
    eyebrow: 'Atlas',
    description: 'Ask Atlas across cases, providers and payments — with reasoning and a full decision-audit trail.',
    icon: MessageSquareText,
    section: 'Atlas',
    badge: { text: 'AI', tone: 'ai' },
    ready: true,
  },
  {
    path: ROUTES.architecture,
    label: 'Data & Intelligence',
    eyebrow: 'Platform',
    description: 'Scalable data pipelines, decision systems and AI layers — structured early so new sources and products plug in without a rebuild.',
    icon: Layers,
    section: 'Platform',
    ready: true,
  },
]

export const sectionOrder: RouteSection[] = ['Overview', 'Cases', 'Network', 'Financial', 'Atlas', 'Platform']

export function findRouteByPath(pathname: string): RouteEntry | undefined {
  return routeRegistry.find((entry) => entry.path === pathname)
}

export function groupRoutesBySection(): Array<{ section: RouteSection; entries: RouteEntry[] }> {
  return sectionOrder.map((section) => ({
    section,
    entries: routeRegistry.filter((entry) => entry.section === section),
  }))
}
