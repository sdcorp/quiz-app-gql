import { RouteProps } from 'react-router-dom'
import { Dashboard, Home, Login, Profile } from '../pages'

export const PAGES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  LOGIN: '/login',
  PROFILE: '/profile',
}

interface IRoutes extends RouteProps {
  protected?: boolean
}

export const ROUTES: IRoutes[] = [
  {
    path: PAGES.HOME,
    component: Home,
    exact: true,
  },
  {
    path: PAGES.DASHBOARD,
    component: Dashboard,
  },
  {
    path: PAGES.LOGIN,
    component: Login,
  },
  {
    path: PAGES.PROFILE,
    component: Profile,
  },
]
