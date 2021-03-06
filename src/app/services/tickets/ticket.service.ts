import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { Ticket, User } from './ticket.interface';

function randomDelay() {
  return Math.random() * 4000;
}

@Injectable()
export class TicketService {
  storedTickets: Ticket[] = [
    {
      id: 0,
      description: 'Install a monitor arm',
      assigneeId: 111,
      completed: false
    },
    {
      id: 1,
      description: 'Move the desk to the new location',
      assigneeId: 111,
      completed: false
    },
    {
      id: 2,
      description: 'This ticket assignee has been deleted',
      assigneeId: 112,
      completed: false
    }
  ];

  storedUsers: User[] = [{ id: 111, name: 'Victor' }];

  lastId = 1;

  private findTicketById = id => this.storedTickets.find(ticket => ticket.id === +id);
  private findUserById = id => this.storedUsers.find(user => user.id === +id);

  tickets() {
    return of(this.storedTickets).pipe(delay(randomDelay()));
  }

  ticket(id: number): Observable<Ticket> {
    return of(this.findTicketById(id)).pipe(delay(randomDelay()));
  }

  users() {
    return of(this.storedUsers).pipe(delay(randomDelay()));
  }

  user(id: number) {
    const user = this.findUserById(id);
    return user ? of(user).pipe(delay(randomDelay())) : throwError('User not found');
  }

  newTicket(payload: { description: string }) {
    const newTicket: Ticket = {
      id: ++this.lastId,
      description: payload.description,
      assigneeId: null,
      completed: false
    };

    return of(newTicket).pipe(
      delay(randomDelay()),
      tap((ticket: Ticket) => this.storedTickets.push(ticket))
    );
  }

  assign(ticketId: number, userId: number) {
    const foundTicket = this.findTicketById(+ticketId);
    const user = this.findUserById(+userId);

    if (foundTicket && user) {
      return of(foundTicket).pipe(
        delay(randomDelay()),
        map((ticket: Ticket) => {
          ticket.assigneeId = +userId;
          return ticket;
        })
      );
    }

    return throwError(new Error('ticket or user not found'));
  }

  complete(ticketId: number, completed: boolean) {
    const foundTicket = this.findTicketById(+ticketId);
    if (foundTicket) {
      return of(foundTicket).pipe(
        delay(randomDelay()),
        map((ticket: Ticket) => {
          ticket.completed = completed;
          return ticket;
        })
      );
    }

    return throwError(new Error('ticket not found'));
  }
}
