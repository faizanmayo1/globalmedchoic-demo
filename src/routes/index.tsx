import { Navigate, type RouteObject } from 'react-router-dom'

import { AppShell } from '@/layouts/AppShell'
import { CommandCenter } from '@/pages/CommandCenter'
import { GlobalCareMatch } from '@/pages/GlobalCareMatch'
import { CarePassportScreen } from '@/pages/CarePassportScreen'
import { ProviderIntelligence } from '@/pages/ProviderIntelligence'
import { CareJourney } from '@/pages/CareJourney'
import { FinancingPayments } from '@/pages/FinancingPayments'
import { FraudRisk } from '@/pages/FraudRisk'
import { AtlasCopilot } from '@/pages/AtlasCopilot'
import { DataArchitecture } from '@/pages/DataArchitecture'
import { ROUTES } from '@/routes/paths'

export const routes: RouteObject[] = [
  {
    path: ROUTES.root,
    element: <AppShell />,
    children: [
      { index: true, element: <CommandCenter /> },
      { path: ROUTES.match.slice(1), element: <GlobalCareMatch /> },
      { path: ROUTES.passport.slice(1), element: <CarePassportScreen /> },
      { path: ROUTES.providers.slice(1), element: <ProviderIntelligence /> },
      { path: ROUTES.journey.slice(1), element: <CareJourney /> },
      { path: ROUTES.payments.slice(1), element: <FinancingPayments /> },
      { path: ROUTES.risk.slice(1), element: <FraudRisk /> },
      { path: ROUTES.architecture.slice(1), element: <DataArchitecture /> },
      { path: ROUTES.copilot.slice(1), element: <AtlasCopilot /> },
      { path: '*', element: <Navigate to={ROUTES.root} replace /> },
    ],
  },
]
