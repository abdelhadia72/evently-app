import { CrudApiRoutes } from '@common/defs/types';

const prefix = '/events';
const ApiRoutes: CrudApiRoutes = {
  CreateOne: prefix,
  ReadAll: prefix,
  ReadOne: prefix + '/{id}',
  UpdateOne: prefix + '/{id}',
  DeleteOne: prefix + '/{id}',

  // Attendee routes
  Attend: prefix + '/{id}/attend',
  UpdateAttendance: prefix + '/{id}/attend',
  CancelAttendance: prefix + '/{id}/attend',
  GetAttendees: prefix + '/{id}/attendees',
};

export default ApiRoutes;
