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
  ticketTypes:any;
  ticketType:any = "1";
  ticketDetails:any;
  modalRef: BsModalRef;
  message: string;
  selectedTicketID:number;
  selectedTicketParentID:number;
  ticketAssign:any="0";
  users:any;
  userDetail:any;
  userFullName:any;
  ticketResponseSubject:string;
  ticketModules:any
  ticketModule:any = "1";
  loggedUser:any;

  constructor(
      private activeRoute:ActivatedRoute, 
      private globalService:GlobalService, 
      private http: HttpClient,
      private modalService: BsModalService
  ) {
  }

  ngOnInit() {

    this.ticketID = this.activeRoute.snapshot.params['id'];
    this.loggedUser = this.globalService.getUserInfo()[0];
 
    //status
    this.globalService.getData('pDesk_ticketStatus.php?method=getTicketStatus').then( 
      ( res:any[] ) => {
        this.ticketStats = res;
    }); 
    //users
    this.globalService.getData('pDesk_users.php?method=getUsers&oID='+this.loggedUser.organizationID+'&utype='+this.loggedUser.userType).then( 
      ( res:any[] ) => {
        this.users = res;
    });
    //types
    this.globalService.getData('pDesk_tickets.php?method=getTicketTypes').then( 
    ( res:any[] ) => {
      this.ticketTypes = res;
    });      
    //ticket Modules
    this.globalService.getData('pDesk_ticketModules.php?method=getTicketModules&oID='+this.loggedUser.organizationID).then( 
      ( res:any[] ) => {
        this.ticketModules = res;
    });     
    //ticket Details
    this.getTicketDetails();

  }

  getTicketDetails(){
    if (this.ticketID>0){
      this.globalService.getData('pDesk_tickets.php?method=getTicketDetails&ticketID='+this.ticketID).then( 
        ( res:any[] ) => {
          this.ticketDetails = res;
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

    //let objU:any = this.globalService.getUserInfo();
    //console.log("Fullname: " + objU.userFullName );

    if (this.ticketStatus == "" || (this.ticketAssign == "0") ) {
      this.globalService.showMessage("Durum, Atanan alanları zorunludur", MessageType.warning);
      return false;
    }

    if (this.ticketID>0) {
      this.ticketModule = 0;
      this.ticketType = 0;
    }

    var fd = new FormData();
    fd.append("method", "ticketSave");
    fd.append("ID", "0");
    fd.append("oID", this.loggedUser.organizationID);
    fd.append("uID", this.loggedUser.ID);    
    fd.append("parentTicketID", this.ticketID);
    fd.append("ticketResponseSubject", this.ticketResponseSubject);
    fd.append("ticketResponse", this.ticketResponse);
    fd.append("ticketStatus", this.ticketStatus);
    fd.append("ticketAssign", this.ticketAssign);
    fd.append("ticketType", this.ticketType);
    fd.append("ticketModule", this.ticketModule);    
    fd.append("ticketFile", this.fileToUpload);
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

  getFile( strFileName:string ) {
    this.globalService.openPageNewTabCustomUrl(this.globalService.apiUrl +  "pDesk_tickets.php?method=downloadFile&fileName="+strFileName);
  }
  
}
