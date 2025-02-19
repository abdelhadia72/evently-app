import Auth from '@modules/auth/defs/routes';
import Users from '@modules/users/defs/routes';
import Events from '@modules/events/defs/routes';

import Permissions from '@modules/permissions/defs/routes';
import { ROLE } from '@modules/permissions/defs/types';

const Common = {
  Landing: '/',
  Home: '/dashboard',
  Dashboard: '/dashboard',
  overview: '/dashboard/overview',
  events: '/dashboard/events',
  users: '/dashboard/users',
  NotFound: '/404',
};

interface RouteConfig {
  allowedRoles: ROLE[];
  redirectTo: string;
}

const baseRoutes = {
  Common,
  Auth,
  Permissions,
  Users,
  Events,
};

const dashboardRoutes: RouteConfig = {
  allowedRoles: [ROLE.ADMIN, ROLE.ORGANIZER],
  redirectTo: baseRoutes.Common.Home,
};

const eventsRoutes: RouteConfig = {
  allowedRoles: [ROLE.ADMIN, ROLE.ORGANIZER],
  redirectTo: baseRoutes.Common.Home,
};

const Routes = {
  ...baseRoutes,
  dashboardRoutes,
  eventsRoutes,
};

export default Routes;
