import { useState } from 'react';
import useApi from '@common/hooks/useApi';
import useFetch from '@common/hooks/useFetch';
import { FetchResult } from '@common/hooks/useFetch';
import { ApiResponse, CrudApi } from '@common/defs/types';

export interface CreateOneInput {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  imageUrl: string;
  category: string;
  maxAttendees: number;
}

export interface UpdateOneInput extends Partial<CreateOneInput> {
  id: number;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  imageUrl: string;
  category: string;
  organizerId: number;
  status: string;
  maxAttendees: number;
  createdAt: string;
  updatedAt: string;
}

const useEvents = (): CrudApi<Event, CreateOneInput, UpdateOneInput> => {
  const { get, post, put, del } = useApi();
  const [items, setItems] = useState<Event[]>([]);

  const getAll = async (): Promise<FetchResult<Event[]>> => {
    const response = await get<ApiResponse<Event[]>>('/events');
    if (response.success && response.data) {
      setItems(response.data.data || []);
      return { data: response.data.data || [], error: null };
    }
    return { data: [], error: response.error || 'Failed to fetch events' };
  };

  const getOne = async (id: number): Promise<FetchResult<Event>> => {
    const response = await get<ApiResponse<Event>>(`/events/${id}`);
    return {
      data: response.success ? response.data : null,
      error: response.success ? null : response.error || 'Failed to fetch event',
    };
  };

  const createOne = async (input: CreateOneInput): Promise<FetchResult<Event>> => {
    const response = await post<ApiResponse<Event>>('/events', input);
    return {
      data: response.success ? response.data : null,
      error: response.success ? null : response.error || 'Failed to create event',
    };
  };

  const updateOne = async (input: UpdateOneInput): Promise<FetchResult<Event>> => {
    const response = await put<ApiResponse<Event>>(`/events/${input.id}`, input);
    return {
      data: response.success ? response.data : null,
      error: response.success ? null : response.error || 'Failed to update event',
    };
  };

  const deleteOne = async (id: number): Promise<FetchResult<boolean>> => {
    const response = await del<ApiResponse<boolean>>(`/events/${id}`);
    return {
      data: response.success,
      error: response.success ? null : response.error || 'Failed to delete event',
    };
  };

  return {
    items,
    getAll: useFetch(getAll),
    getOne: useFetch(getOne),
    createOne: useFetch(createOne),
    updateOne: useFetch(updateOne),
    deleteOne: useFetch(deleteOne),
  };
};

export default useEvents;