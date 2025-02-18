export interface Event {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  organizerId: number;
  maxAttendees: number;
  category: string;
  status: string;
  imageUrl?: string;
}

export interface CreateEventInput {
  title: string;
  location: string;
  maxAttendees: number;
  description: string;
  startDate: string;
  startTime?: string;
  endDate: string;
  endTime?: string;
  category: string;
  status: string;
  imageUrl?: string;
}

export interface UpdateEventInput extends Partial<CreateEventInput> {
  id: number;
}