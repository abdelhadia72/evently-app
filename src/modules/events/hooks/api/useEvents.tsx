import ApiRoutes from '@common/defs/api-routes';
import useItems, { UseItems, UseItemsOptions, defaultOptions } from '@common/hooks/useItems';
import { Event, CreateEventInput, UpdateEventInput } from '@modules/events/defs/types';
import useApi from '@common/hooks/useApi';

const useEvents = (opts: UseItemsOptions = defaultOptions) => {
  const apiRoutes = ApiRoutes.Events;
  const fetchApi = useApi();
  const { mutate, ...rest } = useItems<Event, CreateEventInput, UpdateEventInput>(apiRoutes, opts);

  const attend = async (eventId: string | string[]) => {
    try {
      const response = await fetchApi(ApiRoutes.Events.Attend.replace('{id}', eventId.toString()), {
        method: 'POST',
        displayProgress: true,
        displaySuccess: true,
      });

      if (response.success) {
        mutate();
      }

      return response;
    } catch (error) {
      console.error('Error attending event:', error);
      return { success: false, message: 'Failed to attend event' };
    }
  };

  const cancelAttendance = async (eventId: string | string[]) => {
    try {
      const response = await fetchApi(
        ApiRoutes.Events.CancelAttendance.replace('{id}', eventId.toString()),
        {
          method: 'DELETE',
          displayProgress: true,
          displaySuccess: true,
        }
      );

      if (response.success) {
        mutate();
      }

      return response;
    } catch (error) {
      console.error('Error canceling attendance:', error);
      return { success: false, message: 'Failed to cancel attendance' };
    }
  };

  return {
    ...rest,
    attend,
    cancelAttendance,
  };
};

export default useEvents;
