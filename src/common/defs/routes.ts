import Auth from '@modules/auth/defs/routes';
import Users from '@modules/users/defs/routes';
import Permissions from '@modules/permissions/defs/routes';

const Common = {
  Landing: '/',
  // Dashboard: '/dashboard',
  Home: '/dashboard',
  overview: '/dashboard/overview',
  events: '/dashboard/events',
  users: '/dashboard/users',
  NotFound: '/404',
};

const Routes = {
  Common,
  Auth,
  Permissions,
  Users,
};

export default Routes;
