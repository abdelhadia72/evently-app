import Auth from '@modules/auth/defs/routes';
import Users from '@modules/users/defs/routes';
import Permissions from '@modules/permissions/defs/routes';
import { CrudAppRoutes } from './types';

const Common = {
  Landing: '/',
  Home: '/dashboard',
  overview: '/dashboard/overview',
  events: '/dashboard/events',
  users: '/dashboard/users',
  NotFound: '/404',
};

const Events: CrudAppRoutes = {
  List: '/dashboard/events',
  Create: '/dashboard/events/create',
  Edit: '/dashboard/events/:id/edit',
  Delete: '/dashboard/events/:id',
};

const Routes = {
  Common,
  Auth,
  Permissions,
  Users,
  Events,
};

export default Routes;
