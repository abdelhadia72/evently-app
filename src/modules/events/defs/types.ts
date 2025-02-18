export interface Event {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  organizerId: number;
  maxAttendees: number;
}

export interface CreateEventInput {
  title: string;
  location: string;
  maxAttendees: number;
  description: string;
  startDate: string;
  endDate: string;
}

export interface UpdateEventInput extends Partial<CreateEventInput> {
  id: number;
}