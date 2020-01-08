import { RouteComponentProps, RouteProps } from 'react-router-dom'
import { Dashboard, Home, Login, Profile } from '../pages'

export const PAGES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  LOGIN: '/login',
  PROFILE: '/profile',
}

export interface IRoute extends RouteProps {
  component: React.ComponentType<RouteComponentProps>
  protected?: boolean
}

export const ROUTES: IRoute[] = [
  {
    path: PAGES.HOME,
    component: Home,
    exact: true,
  },
  {
    path: PAGES.DASHBOARD,
    component: Dashboard,
    protected: true,
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
