import { CrudAppRoutes } from '@common/defs/types';

const prefix = '/dashboard/users';
const Routes: CrudAppRoutes = {
  ReadAll: prefix,
  Me: '/me',
  CreateOne: prefix + '/create',
  UpdateOne: prefix + '/{id}',
};

export default Routes;
