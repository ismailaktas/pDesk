import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tickets:any;
  loggedUser:any;

  constructor(
    private globalService:GlobalService, 
  ) { }

  ngOnInit() {
    this.loggedUser = this.globalService.getUserInfo()[0];
    
    this.globalService.getData("pDesk_tickets.php?method=getTickets&uID="+this.loggedUser.ID+"&oID="+this.loggedUser.organizationID).then( 
      ( res:any[] ) => {
        this.tickets = res;
      });
  }

  newTicket() {
    this.globalService.redirectPage("/ticketDetail/0");
  }



}
