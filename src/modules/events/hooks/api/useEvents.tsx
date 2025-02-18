import ApiRoutes from '@common/defs/api-routes';
import useItems, { UseItems, UseItemsOptions, defaultOptions } from '@common/hooks/useItems';
import { Event, CreateEventInput, UpdateEventInput } from '@modules/events/defs/types';


const useEvents: UseItems<Event, CreateEventInput, UpdateEventInput> = (
  opts: UseItemsOptions = defaultOptions
) => {
  const apiRoutes = ApiRoutes.Events;
  return useItems<Event, CreateEventInput, UpdateEventInput>(apiRoutes, opts);
};

export default useEvents;