import { Component, OnInit } from '@angular/core';
import { TicketActions, TicketStore } from '../../services/tickets/ticket.store';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html'
})
export class TicketsComponent implements OnInit {

  public tickets$ = this.store.tickets$;
  public loadingTickets: boolean;

  constructor(private store: TicketStore) {
    this.store.loading$.pipe(
      filter((event) => {
        return event.type === this.store.getRequestFromAction(TicketActions.FIND_ALL);
      })
    ).subscribe((status) => {

      // we can't use an async pipe for this as it would subscribe to the observable after ngOnInit hence we miss
      // the loading start event;
      this.loadingTickets = status.status;

    });
  }


  public ngOnInit(): void {
    this.store.dispatch(TicketActions.FIND_ALL);
  }
}
