import { MessageType } from './../../classes/messageType.enum';
import { Component, OnInit, AfterViewInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css'],
  providers: [
    GlobalService,
    BsModalService
  ]
})
export class TicketDetailComponent implements OnInit, AfterViewInit {

  ticketID:any = 0;
  ticketResponse: string;
  fileToUpload: File = null;  
  ticketSaveResult:string;
  ticketStats:any;
  ticketStatus: string = "1";
  ticketDetails:any;
  modalRef: BsModalRef;
  message: string;
  selectedTicketID:number;

  constructor(
      private activeRoute:ActivatedRoute, 
      private globalService:GlobalService, 
      private http: HttpClient,
      private modalService: BsModalService
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
    this.globalService.sendData('pDesk_tickets', fd).subscribe((res)=>{
      this.getTicketDetails();
      this.globalService.showMessage("İşlem başarıyla gerçekleşti", MessageType.info);
    });    
  }
  
  deleteTicket(prmTicketID:number){
    if(confirm("Are you sure to delete ")) {
      console.log(prmTicketID);
    }
  }

  openModal(template: TemplateRef<any>, prmID:number) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    this.selectedTicketID = prmID;
  }  

  confirm(): void {
    this.http.get(this.globalService.apiUrl + 'pDesk_tickets.php?method=ticketDelete&ticketID='+this.selectedTicketID.toString()).subscribe((resp:any) => {
      this.getTicketDetails();
      this.globalService.showMessage("İşlem başarıyla gerçekleşti", MessageType.info);
    });  
    this.modalRef.hide();
  }
 
  decline(): void {
    this.modalRef.hide();
  }


}
