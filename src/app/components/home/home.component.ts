import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tickets:any;

  constructor(
    private globalService:GlobalService, 
  ) { }

  ngOnInit() {
    this.globalService.getData("pDesk_tickets.php?method=getTickets").then( 
      ( res:any[] ) => {
        this.tickets = res;
      });
  }

  newTicket() {
    this.globalService.redirectPage("/ticketDetail/0");
  }



}
