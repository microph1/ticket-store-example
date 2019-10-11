import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TicketStore } from './services/tickets/ticket.store';
import { TicketService } from './services/tickets/ticket.service';
import { TicketsComponent } from './components/tickets/tickets.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    TicketsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    TicketService,
    TicketStore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
