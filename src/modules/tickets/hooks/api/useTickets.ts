import ApiRoutes from '@common/defs/api-routes';
import useItems, { UseItems, UseItemsOptions, defaultOptions } from '@common/hooks/useItems';
import { Ticket, CreateTicketInput, UpdateTicketInput } from '@modules/tickets/defs/types';
import useApi from '@common/hooks/useApi';

const useTickets: UseItems<Ticket, CreateTicketInput, UpdateTicketInput> = (
  opts: UseItemsOptions = defaultOptions
) => {
  const apiRoutes = ApiRoutes.Tickets;
  const fetchApi = useApi();
  const { mutate: mutateTickets, ...rest } = useItems<Ticket, CreateTicketInput, UpdateTicketInput>(
    apiRoutes,
    opts
  );

  const getUserTickets = async () => {
    try {
      console.log('Getting user tickets from:', apiRoutes.ListUserTickets);
      const response = await fetchApi(apiRoutes.ListUserTickets, {
        method: 'GET',
        displayProgress: true,
        displaySuccess: false,
      });
      console.log('User tickets response:', response);
      return response;
    } catch (error) {
      console.error('Error fetching user tickets:', error);
      return { success: false, message: 'Failed to fetch user tickets' };
    }
  };

  const getEventTickets = async (eventId: string) => {
    try {
      const response = await fetchApi(apiRoutes.ListEventTickets.replace('{eventId}', eventId), {
        method: 'GET',
        displayProgress: true,
        displaySuccess: false,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching event tickets:', error);
      return { success: false, message: 'Failed to fetch event tickets' };
    }
  };

  const bookTicket = async (eventId: string) => {
    try {
      const response = await fetchApi(apiRoutes.BookEventTicket.replace('{eventId}', eventId), {
        method: 'POST',
        displayProgress: true,
        displaySuccess: true,
      });
      if (response.success) {
        mutateTickets();
      }
      return response;
    } catch (error) {
      return { success: false, message: 'Failed to book ticket' };
    }
  };

  const cancelTicket = async (eventId: string) => {
    try {
      const response = await fetchApi(apiRoutes.CancelEventTicket.replace('{eventId}', eventId), {
        method: 'DELETE',
        displayProgress: true,
        displaySuccess: true,
      });
      if (response.success) {
        mutateTickets();
      }
      return response;
    } catch (error) {
      return { success: false, message: 'Failed to cancel ticket' };
    }
  };

  const verifyTicket = async (ticketId: string) => {
    try {
      return await fetchApi(apiRoutes.VerifyTicket.replace('{ticketId}', ticketId), {
        method: 'POST',
        displayProgress: true,
        displaySuccess: true,
      });
    } catch (error) {
      return { success: false, message: 'Failed to verify ticket' };
    }
  };

  const checkInTicket = async (ticketId: string) => {
    try {
      const response = await fetchApi(apiRoutes.CheckInTicket, {
        method: 'POST',
        data: { ticketId },
        displayProgress: true,
        displaySuccess: true,
      });
      if (response.success) {
        mutateTickets();
      }
      return response;
    } catch (error) {
      return { success: false, message: 'Failed to check in ticket' };
    }
  };

  return {
    ...rest,
    mutate: mutateTickets,
    getUserTickets,
    getEventTickets,
    bookTicket,
    cancelTicket,
    verifyTicket,
    checkInTicket,
  };
};

export default useTickets;
