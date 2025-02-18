import { CrudAppRoutes } from '@common/defs/types';

const prefix = '/dashboard/users';
const Routes: CrudAppRoutes = {
  ReadAll: prefix,
  Me: '/users/me',
  CreateOne: prefix + '/create',
  UpdateOne: prefix + '/{id}',
};

export default Routes;
