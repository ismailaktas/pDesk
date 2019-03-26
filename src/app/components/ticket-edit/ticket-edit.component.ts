import { MessageType } from './../../classes/messageType.enum';
import { Component, OnInit, AfterViewInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { userInfo } from 'src/app/classes/userInfo';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.css'],
  providers: [
    GlobalService,
    BsModalService
  ]  
})
export class TicketEditComponent implements OnInit, AfterViewInit {

  ticketID:any = 0;
  ticketResponse: string;
  fileToUpload: File = null;  
  ticketSaveResult:string;
  ticketStats:any;
  ticketParentId:number = 0;
  ticketStatus: string = "1";
  ticketDetails:any;
  modalRef: BsModalRef;
  message: string;
  selectedTicketID:number;
  selectedTicketParentID:number;
  ticketAssign:any;
  users:any;
  userDetail:any;
  userFullName:any;
  ticketResponseSubject:string;
  loggedUserID:number = this.globalService.getUserInfo().userID;

  constructor(
    private activeRoute:ActivatedRoute, 
    private globalService:GlobalService, 
    private http: HttpClient,
    private modalService: BsModalService
) {
}

ngOnInit() {

  this.ticketID = this.activeRoute.snapshot.params['id'];

  //status
  this.globalService.getData('pDesk_ticketStatus.php?method=getTicketStatus').then( 
    ( res:any[] ) => {
      this.ticketStats = res;
  });
  //users
  this.globalService.getData('pDesk_users.php?method=getUsers').then( 
    ( res:any[] ) => {
      this.users = res;
  });
  //ticket Details
  this.getTicketDetails();

}

getTicketDetails(){
  if (this.ticketID>0){
    this.globalService.getData('pDesk_tickets.php?method=getTicketById&ticketID='+this.ticketID).then( 
      ( res:any[] ) => {
        this.ticketDetails = res[0];
        this.ticketResponseSubject = res[0].subject;
        this.ticketResponse = res[0].description;
        this.ticketStatus = res[0].status;
        this.ticketAssign = res[0].assignUserID;
        this.ticketParentId = res[0].parentId;
    }); 
  }
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

  let objU:any = this.globalService.getUserInfo();
  console.log("Fullname: " + objU.userFullName );

  var fd = new FormData();
  fd.append("method", "ticketSave");
  fd.append("ID", this.ticketID);
  fd.append("parentTicketID", this.ticketParentId.toString());
  fd.append("ticketResponseSubject", this.ticketResponseSubject);
  fd.append("ticketResponse", this.ticketResponse);
  fd.append("ticketStatus", this.ticketStatus);
  fd.append("ticketAssign", this.ticketAssign);
  fd.append("ticketFile", $('#ticketFile')[0].files[0]);
  this.globalService.sendData('pDesk_tickets', fd).subscribe((res)=>{
    this.ticketID = res;
    //this.getTicketDetails();
    this.globalService.showMessage("İşlem başarıyla gerçekleşti", MessageType.info);
  });    
}

deleteTicket(prmTicketID:number){
  if(confirm("Silmek istediğinize emin misiniz?")) {
    console.log(prmTicketID);
  }
}

openModal(template: TemplateRef<any>, prmID:number, prmParentId:number) {
  this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  this.selectedTicketID = prmID;
  this.selectedTicketParentID = prmParentId;
}  

confirm(): void {
  this.globalService.getData('pDesk_tickets.php?method=ticketDelete&ticketID='+this.selectedTicketID.toString()).then( 
    ( res:any[] ) => {
      this.globalService.showMessage("İşlem başarıyla gerçekleşti", MessageType.info);
      if ( this.selectedTicketParentID == 0 ) {
        this.globalService.redirectPage("home");
      }
      else {
        this.getTicketDetails();
      }
  });
  this.modalRef.hide();
}

decline(): void {
  this.modalRef.hide();
}


}
