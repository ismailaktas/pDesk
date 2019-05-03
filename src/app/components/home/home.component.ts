import { Component, OnInit, AfterViewInit, AfterViewChecked, ElementRef } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import * as $ from 'jquery';
window['jQuery'] = window['$'] = $;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
  ]  
})
export class HomeComponent implements OnInit, AfterViewInit {

  tickets:any;
  loggedUser:any;
  sContinue:any;
  sNew:any;
  sWait:any;
  sCompleted:any;
  sClosed:any;
  sTesting:any;
  sError:any;
  public searchText : string;
  selectedStatus:number = 0;
  selectedType:number = 0;
  
  constructor(
    private globalService:GlobalService
  ) {
      this.loggedUser = this.globalService.getUserInfo()[0];

      this.globalService.getData("pDesk_tickets.php?method=getTickets&uID="+this.loggedUser.ID+"&oID="+this.loggedUser.organizationID+"&ticketStatus=0&ticketType=0").then( 
        ( res:any[] ) => {
          this.tickets = res;
      });    

      this.getCounts();
  }

  filterData( ticketStatus:number ){
    
    if (this.selectedStatus == ticketStatus) {
      this.selectedStatus = 0;
    }
    else {
      this.selectedStatus = ticketStatus;
    }

    this.globalService.getData("pDesk_tickets.php?method=getTickets&uID="+this.loggedUser.ID+"&oID="+this.loggedUser.organizationID+"&ticketStatus="+this.selectedStatus+"&ticketType="+this.selectedType).then( 
      ( res:any[] ) => {
        this.tickets = res;
    }); 

  }

  filterDataType( ticketType:number ){
    
    if (this.selectedType == ticketType) {
      this.selectedType = 0;
    }
    else {
      this.selectedType = ticketType;
    }

    this.globalService.getData("pDesk_tickets.php?method=getTickets&uID="+this.loggedUser.ID+"&oID="+this.loggedUser.organizationID+"&ticketStatus="+this.selectedStatus+"&ticketType="+this.selectedType).then( 
      ( res:any[] ) => {
        this.tickets = res;
    }); 

  }

  ngOnInit() {

    $(".filterIcon").click(function(){
      if ($(this).hasClass("fa-filter")) {
        $(this).removeClass("fa-filter").addClass("fa-times");
      }
      else{
        $(this).removeClass("fa-times").addClass("fa-filter");
      }
    });
    
  }
 
  ngAfterViewInit() {
  }

  ngAfterViewChecked(){
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
    //Test Ediliyor
    this.globalService.getData("pDesk_tickets.php?method=getTicketCounts&status=6&type=0&oID="+this.loggedUser.organizationID).then( 
      ( res:any[] ) => {
        this.sTesting = res[0].resultCount;
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
