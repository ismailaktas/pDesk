import { MessageType } from './../../classes/messageType.enum';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css'],
  providers: [
    GlobalService
  ]
})
export class TicketDetailComponent implements OnInit, AfterViewInit {

  ticketID:any = 0;
  ticketResponse: string = "ASDASD";
  fileToUpload: File = null;  
  ticketSaveResult:string;
  ticketStats:any;
  ticketStatus: string = "1";
  ticketDetails:any;

  constructor(
      private activeRoute:ActivatedRoute, 
      private globalService:GlobalService, 
      private http: HttpClient
  ) {
  }

  ngOnInit() {

    this.ticketID = this.activeRoute.snapshot.params['id'];
 
    //ticket Status
    this.http.get(this.globalService.apiUrl + 'pDesk_ticketStatus.php?method=getTicketStatus').subscribe((resp:any) => {
      this.ticketStats = resp;
    });

    //ticket Details
    this.getTicketDetails();

  }

  getTicketDetails(){
    this.http.get(this.globalService.apiUrl + 'pDesk_tickets.php?method=getTicketDetails&ticketID='+this.ticketID).subscribe((resp:any) => {
      this.ticketDetails = resp;
    });    
  }

  ngAfterViewInit(){
    
    setTimeout(() => {
      $('#spnStat').text($('#dvStat').html());
    }, 500);

  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  replyTicket() {

    var fd = new FormData();
    fd.append("method", "ticketSave");
    fd.append("ID", "0");
    fd.append("parentTicketID", this.ticketID);
    fd.append("ticketResponse", this.ticketResponse);
    fd.append("ticketStatus", this.ticketStatus);
    fd.append("ticketFile", this.fileToUpload);

    this.globalService.sendData('tickets', fd).subscribe((res)=>{
      this.getTicketDetails();
      this.globalService.showMessage("İşlem başarıyla gerçekleşti", MessageType.info);
    });    

  }  

}
