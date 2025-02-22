import { CrudApiRoutes } from '@common/defs/types';

interface TicketApiRoutes extends CrudApiRoutes {
  ListUserTickets: string;
  ListEventTickets: string;
  BookEventTicket: string;
  CancelEventTicket: string;
  VerifyTicket: string;
  CheckInTicket: string;
}

const prefix = '/tickets';

export const ApiRoutes: TicketApiRoutes = {
  CreateOne: prefix,
  ReadAll: prefix,
  ReadOne: prefix + '/{id}',
  UpdateOne: prefix + '/{id}',
  DeleteOne: prefix + '/{id}',

  ListUserTickets: '/auth/tickets',
  ListEventTickets: '/events/{eventId}/tickets',
  BookEventTicket: '/events/{eventId}/tickets',
  CancelEventTicket: '/events/{eventId}/tickets',
  VerifyTicket: prefix + '/{ticketId}/verify',
  CheckInTicket: '/check-in/tickets',
};

export { ApiRoutes as Tickets };
export default ApiRoutes;
