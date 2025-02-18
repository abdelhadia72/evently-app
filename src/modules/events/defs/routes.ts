import { CrudAppRoutes } from '@common/defs/types';

const prefix = '/dashboard/events';
const Routes: CrudAppRoutes = {
  ReadAll: prefix,
  CreateOne: prefix + '/create',
  UpdateOne: prefix + '/{id}',
  ReadOne: '/{id}',
  DeleteOne: '/{id}',
  Detail: '/{id}',
};

export default Routes;
