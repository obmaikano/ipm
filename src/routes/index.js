// All components mapping with path for internal routes

import { lazy } from 'react'

const Dashboard = lazy(() => import('../pages/protected/Dashboard'))
const Welcome = lazy(() => import('../pages/protected/Welcome'))
const Page404 = lazy(() => import('../pages/protected/404'))
const Blank = lazy(() => import('../pages/protected/Blank'))
const Charts = lazy(() => import('../pages/protected/Charts'))
const Leads = lazy(() => import('../pages/protected/Leads'))
const Integration = lazy(() => import('../pages/protected/Integration'))
const Calendar = lazy(() => import('../pages/protected/Calendar'))
const Team = lazy(() => import('../pages/protected/Team'))
const Transactions = lazy(() => import('../pages/protected/Transactions'))
const Bills = lazy(() => import('../pages/protected/Bills'))
const ProfileSettings = lazy(() => import('../pages/protected/ProfileSettings'))
const GettingStarted = lazy(() => import('../pages/GettingStarted'))
const DocFeatures = lazy(() => import('../pages/DocFeatures'))
const DocComponents = lazy(() => import('../pages/DocComponents'))
const Customers = lazy(() => import('../pages/protected/Customers'))
const CustomerCategories = lazy(() => import('../pages/protected/CustomerCategories'))
const Policies = lazy(() => import('../pages/protected/Policies'))
const PolicyDetails = lazy(() => import('../pages/protected/PolicyDetails'))
const Employers = lazy(() => import('../pages/protected/Employers'))
const EmployerDetails = lazy(() => import('../pages/protected/EmployerDetails'))
const Schemes = lazy(() => import('../pages/protected/Schemes'))
const SchemeDetails = lazy(() => import('../pages/protected/SchemeDetails'))

const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/welcome', // the url
    component: Welcome, // view rendered
  },
  {
    path: '/leads',
    component: Leads,
  },
  {
    path: '/settings-team',
    component: Team,
  },
  {
    path: '/calendar',
    component: Calendar,
  },
  {
    path: '/transactions',
    component: Transactions,
  },
  {
    path: '/settings-profile',
    component: ProfileSettings,
  },
  {
    path: '/settings-billing',
    component: Bills,
  },
  {
    path: '/getting-started',
    component: GettingStarted,
  },
  {
    path: '/features',
    component: DocFeatures,
  },
  {
    path: '/components',
    component: DocComponents,
  },
  {
    path: '/integration',
    component: Integration,
  },
  {
    path: '/charts',
    component: Charts,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
  {
    path: '/customers',
    component: Customers
  },
  {
    path: '/customercategories',
    component: CustomerCategories
  },
  {
    path: '/policies',
    component: Policies
  },
  {
    path: '/policies/:id',
    component: PolicyDetails
  },
  {
    path: '/employers',
    component: Employers
  },
  {
    path: '/employers/:id',
    component: EmployerDetails
  },
  {
    path: '/schemes',
    component: Schemes
  },
  {
    path: '/schemes/:id',
    component: SchemeDetails
  },
]

export default routes
