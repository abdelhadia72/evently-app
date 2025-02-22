import Auth from '@modules/auth/defs/api-routes';
import Users from '@modules/users/defs/api-routes';
import Uploads from '@modules/uploads/defs/api-routes';
import Posts from '@modules/posts/defs/api-routes';
import Events from '@modules/events/defs/api-routes';
import TicketsRoutes from '@modules/tickets/defs/api-routes';

const ApiRoutes = {
  Auth,
  Users,
  Uploads,
  Events: {
    ...Events,
    search: '/events/search',
  },
  Tickets: TicketsRoutes,
  Posts,
};

export default ApiRoutes;
