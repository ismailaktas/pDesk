import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    GlobalService
  ]  
})
export class HomeComponent implements OnInit {

  tickets:any;
  loggedUser:any;
  sContinue:any;
  sNew:any;
  sWait:any;
  sCompleted:any;
  sClosed:any;
  sError:any;

  constructor(
    private globalService:GlobalService, 
  ) {
      this.loggedUser = this.globalService.getUserInfo()[0];

      this.globalService.getData("pDesk_tickets.php?method=getTickets&uID="+this.loggedUser.ID+"&oID="+this.loggedUser.organizationID).then( 
        ( res:any[] ) => {
          this.tickets = res;
      });    

      this.getCounts();
  }

  ngOnInit() {
  }

  getCounts() {
    //yeni
    this.globalService.getData("pDesk_tickets.php?method=getTicketCounts&status=1&type=0&oID="+this.loggedUser.organizationID).then( 
      ( res:any[] ) => {
        this.sNew = res[0].resultCount;
    }); 
    //devam
    this.globalService.getData("pDesk_tickets.php?method=getTicketCounts&status=2&type=0&oID="+this.loggedUser.organizationID).then( 
      ( res:any[] ) => {
        this.sContinue = res[0].resultCount;
    });  
    //tamam
    this.globalService.getData("pDesk_tickets.php?method=getTicketCounts&status=3&type=0&oID="+this.loggedUser.organizationID).then( 
      ( res:any[] ) => {
        this.sCompleted = res[0].resultCount;
    }); 
    //kapandi
    this.globalService.getData("pDesk_tickets.php?method=getTicketCounts&status=4&type=0&oID="+this.loggedUser.organizationID).then( 
      ( res:any[] ) => {
        this.sClosed = res[0].resultCount;
    });  
    //bekle
    this.globalService.getData("pDesk_tickets.php?method=getTicketCounts&status=5&type=0&oID="+this.loggedUser.organizationID).then( 
      ( res:any[] ) => {
        this.sWait = res[0].resultCount;
    }); 
    //hata
    this.globalService.getData("pDesk_tickets.php?method=getTicketCounts&status=0&type=3&oID="+this.loggedUser.organizationID).then( 
      ( res:any[] ) => {
        this.sError = res[0].resultCount;
    });   
  }

  newTicket() {
    this.globalService.redirectPage("/ticketDetail/0");
  }



}
