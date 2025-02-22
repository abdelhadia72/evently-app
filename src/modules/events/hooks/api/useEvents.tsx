import ApiRoutes from '@common/defs/api-routes';
import useItems, { UseItemsOptions, defaultOptions } from '@common/hooks/useItems';
import { Event, CreateEventInput, UpdateEventInput } from '@modules/events/defs/types';
import useApi from '@common/hooks/useApi';

interface EventsResponse {
  success: boolean;
  data: {
    items: Event[];
    total: number;
    currentPage: number;
    perPage: number;
    lastPage: number;
  };
}

const useEvents = (opts: UseItemsOptions = defaultOptions) => {
  const apiRoutes = ApiRoutes.Events;
  const fetchApi = useApi();
  const {
    mutate: mutateEvents,
    readAll: getItems,
    ...rest
  } = useItems<Event, CreateEventInput, UpdateEventInput>(apiRoutes, opts);

  const searchEvents = async (query: string, category?: string) => {
    try {
      const searchParams = new URLSearchParams();
      if (query) {
        searchParams.append('title', query);
      }
      if (category && category !== 'All Events') {
        searchParams.append('category', category);
      }

      const url = `${apiRoutes.search}?${searchParams.toString()}`;
      console.log('Search URL:', url);

      const response = await fetchApi<EventsResponse>(url, {
        method: 'GET',
        displayProgress: true,
      });

      console.log('Search response:', response);
      return response?.success && response?.data?.items ? response.data.items : [];
    } catch (error) {
      console.error('Search events error:', error);
      return [];
    }
  };

  const getEventItems = async () => {
    try {
      const response = await getItems();
      console.log('GetItems response:', response);

      if (response?.data?.items) {
        return response.data.items;
      }
      if (response?.data?.data?.items) {
        return response.data.data.items;
      }
      return [];
    } catch (error) {
      console.error('Error getting items:', error);
      return [];
    }
  };

  return {
    ...rest,
    mutate: mutateEvents,
    searchEvents,
    getItems: getEventItems,
  };
};

export default useEvents;
