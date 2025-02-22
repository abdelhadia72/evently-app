export interface Ticket {
  id: number;
  ticketNumber: string;
  eventId: number;
  userId: number;
  status: string;
  checkInTime: string | null;
  qrCode: string;
  createdAt: string;
  updatedAt: string;
}

export interface TicketResponse {
  success: boolean;
  message: string;
  data: Ticket;
}

export interface CreateTicketInput {}

export interface UpdateTicketInput {}

export interface UpdateEventInput extends Partial<CreateTicketInput> {
  id: number;
}
