export interface User {
  id: number;
  name: string;
}

export interface Ticket {
  id: number;
  description: string;
  assigneeId: number;
  completed: boolean;
  assignee?: User;
}

export type TicketWithState = Ticket & { isLoading?: boolean };

export interface TicketsState {
  tickets: TicketWithState[];
}
