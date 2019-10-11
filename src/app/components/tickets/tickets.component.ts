import { Component, OnInit } from '@angular/core';
import { TicketActions, TicketStore } from '../../services/tickets/ticket.store';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html'
})
export class TicketsComponent implements OnInit {

  public tickets$ = this.store.tickets$;

  constructor(private store: TicketStore) { }


  public ngOnInit(): void {
    this.store.dispatch(TicketActions.FIND_ALL);
  }
}
