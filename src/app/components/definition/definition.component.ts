import { Component, OnInit, TemplateRef } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as $ from 'jquery';
import { MessageType } from 'src/app/classes/messageType.enum';

interface IselectedUser {
  userID:string,
  fullname:string,
  username:string,
  password:string,
  organizationID:string,
  userType:string
}

@Component({
  selector: 'app-definition',
  templateUrl: './definition.component.html',
  styleUrls: ['./definition.component.css'],
  providers: [
    GlobalService,
    BsModalService
  ]  
})
export class DefinitionComponent implements OnInit {

  users:any;
  userTypes:any;
  modalRef: BsModalRef;
  selectedUser:IselectedUser;
  userOrganizations:any;  
  selectedUserIDForDelete:any;
  loggedUser:any;

  constructor(
    private globalService:GlobalService, 
    private modalService: BsModalService
  ) { }

  ngOnInit() {

    this.loggedUser = this.globalService.getUserInfo()[0];

    this.getAllUsers();

    this.globalService.getData("pDesk_users.php?method=getUserTypes&uID="+this.loggedUser.ID).then( 
    ( res:any[] ) => {
        this.userTypes = res;
    });    

    this.globalService.getData("pDesk_users.php?method=getUserOrganizations&uID="+this.loggedUser.ID).then( 
    ( res:any[] ) => {
          this.userOrganizations = res;
    });        
    
  }

  getAllUsers() {
    this.globalService.getData("pDesk_users.php?method=getAllUsers&uID="+this.loggedUser.ID).then( 
      ( res:any[] ) => {
        this.users = res;
      });
  }

  userActivePassive(userID:number, isPassive:number ){
    isPassive = isPassive == 0 ? 1 : 0;
    this.globalService.getData("pDesk_users.php?method=setUserActivePassive&userID="+userID.toString()+"&activePassive="+isPassive.toString()).then( 
      ( res:any[] ) => {
        this.getAllUsers();
      });
  }

  openModalUserDelete(templateUserDelete: TemplateRef<any>, prmID:number) {
    this.modalRef = this.modalService.show(templateUserDelete, {class: 'modal-sm'});
    this.selectedUserIDForDelete = prmID;
  } 
  
  openModalUser(templateUser: TemplateRef<any>, prmUserID:any) {
    this.modalRef = this.modalService.show(templateUser, {class: 'modal-lg'});
    if( prmUserID>0 ) {
      this.selectedUser = this.users.find(x=>x.userID == prmUserID);
      console.log (this.selectedUser);

    }
    else {
      let newUser:IselectedUser = { userID:"0", fullname:"", organizationID:"0", userType:"3", username:"", password:"" };
      this.selectedUser = newUser;
    }
  }  

  decline(): void {
    this.modalRef.hide();
  }

  confirmDeleteUser(){
    this.globalService.getData("pDesk_users.php?method=deleteUser&ID="+this.selectedUserIDForDelete.toString()).then( 
      ( res:any[] ) => {
        this.modalRef.hide();
        this.getAllUsers();
      });    
  }

  saveUser() {
    let err = 0;

    if (this.selectedUser.fullname == "" || this.selectedUser.username == ""  || this.selectedUser.organizationID == "0"  || this.selectedUser.userType == "") {
      this.globalService.showMessage("İsim, kullanıcı adı, tür, organizasyon alanları zorunludur", MessageType.warning);
      return false;
    }

    var fd = new FormData();
    fd.append("method", "saveUser");
    fd.append("ID", this.selectedUser.userID );
    fd.append("fullname", this.selectedUser.fullname );
    fd.append("username", this.selectedUser.username );
    fd.append("password", this.selectedUser.password );
    fd.append("organizationID", this.selectedUser.organizationID );
    fd.append("userType", this.selectedUser.userType );
    fd.append("uID", this.loggedUser.ID );
    fd.append("oID", this.loggedUser.organizationID );

    this.globalService.sendData('pDesk_users', fd).subscribe((res)=>{
      this.getAllUsers();
      this.globalService.showMessage("İşlem başarıyla gerçekleşti", MessageType.info);
      this.modalRef.hide();
    });     
   
  }

  declineUser() {
    this.modalRef.hide();
  }



}
