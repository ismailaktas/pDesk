import { MessageType } from './../../classes/messageType.enum';
import { Component, OnInit, AfterViewInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.css'],
  providers: [
    BsModalService
  ]  
})
export class TicketEditComponent implements OnInit, AfterViewInit {

  ticketID:any = 0;
  ticketResponse: string;
  ticketSaveResult:string;
  ticketStats:any;
  ticketParentId:number = 0;
  ticketStatus: string = "1";
  ticketTypes:any;
  ticketType:any = "1";  
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
  selectedFile:File = null;
  loggedUser:any;
  ticketModules:any
  ticketModule:any = "1";
  isAuth:boolean = false;
  ticketParentID:any;

  constructor(
    private activeRoute:ActivatedRoute, 
    private globalService:GlobalService, 
    private modalService: BsModalService
) {
}

ngOnInit() {

  this.ticketID = this.activeRoute.snapshot.params['id'];
  this.loggedUser = this.globalService.getUserInfo()[0];

  //types
  this.globalService.getData('pDesk_tickets.php?method=getTicketTypes').then( 
      ( res:any[] ) => {
        this.ticketTypes = res;
      });   
  //status
  this.globalService.getData('pDesk_ticketStatus.php?method=getTicketStatus').then( 
    ( res:any[] ) => {
      this.ticketStats = res;
  });
  //ticket Modules
  this.globalService.getData('pDesk_ticketModules.php?method=getTicketModules&oID='+this.loggedUser.organizationID).then( 
      ( res:any[] ) => {
        this.ticketModules = res;
    });     
  //users
  this.globalService.getData('pDesk_users.php?method=getUsers&oID='+this.loggedUser.organizationID+'&utype='+this.loggedUser.userType).then( 
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
        this.ticketType = res[0].ticketType;
        this.ticketModule = res[0].ticketModule;

        if( this.loggedUser.ID == res[0].ticketModule.userID ) {
          this.isAuth = true;
        }

        if ( this.loggedUser.userType == 1 ) {
          this.isAuth = true;
        }

    }); 
  }
}

ngAfterViewInit(){
    
  setTimeout(() => {
    $('#spnStat').text($('#dvStat').html());
  }, 500);

}

onFileSelected(event) {
  this.selectedFile = <File>event.target.files[0];
}

onUpload() {
  const fd = new FormData();
  fd.append("method", "ticketUpload");
  fd.append("uploadFile", this.selectedFile, this.selectedFile.name);
  this.globalService.sendData('pDesk_tickets', fd).subscribe((res)=>{
    console.log(res);
  });
}

getFile( strFileName:string ) {
  this.globalService.openPageNewTabCustomUrl(this.globalService.apiUrl +  "pDesk_tickets.php?method=downloadFile&fileName="+strFileName);
}

replyTicket() {


  if (this.ticketStatus == "" || this.ticketAssign == "") {
    this.globalService.showMessage("Durum, Atanan alanları zorunludur", MessageType.warning);
    return false;
  }


  if (this.ticketParentId>0) {
    this.ticketModule = 0;
    this.ticketType = 0;
  }

  var fd = new FormData();
  fd.append("method", "ticketSave");
  fd.append("ID", this.ticketID);
  fd.append("oID", this.loggedUser.organizationID);
  fd.append("uID", this.loggedUser.ID);
  fd.append("parentTicketID", this.ticketParentId.toString());
  fd.append("ticketResponseSubject", this.ticketResponseSubject);
  fd.append("ticketResponse", this.ticketResponse);
  fd.append("ticketStatus", this.ticketStatus);
  fd.append("ticketAssign", this.ticketAssign);
  fd.append("ticketType", this.ticketType);
  fd.append("ticketModule", this.ticketModule);
  if (this.selectedFile != null) {
    fd.append("ticketFile", this.selectedFile, this.selectedFile.name);
  }
    this.globalService.sendData('pDesk_tickets', fd).subscribe((res)=>{
    this.ticketID = res;
    this.getTicketDetails();
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

openModalFile(templateFile: TemplateRef<any>, prmID:number) {
  this.modalRef = this.modalService.show(templateFile, {class: 'modal-sm'});
  this.selectedTicketID = prmID;
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

confirmFile(): void {
  this.globalService.getData('pDesk_tickets.php?method=ticketFileDelete&ticketID='+this.selectedTicketID.toString()).then( 
    ( res:any[] ) => {
      this.globalService.showMessage("İşlem başarıyla gerçekleşti", MessageType.info);
      this.getTicketDetails();
  });
  this.modalRef.hide();
}

declineFile(): void {
  this.modalRef.hide();
}


}
