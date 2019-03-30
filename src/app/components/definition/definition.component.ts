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

interface IselectedModule {
  moduleID:string,
  moduleName:string,
  organizationID:string,
  organizationName:string,
}

interface IselectedOrganization {
  ID:string,
  name:string,
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
  ticketModules:any;
    selectedModule:any;
  selectedModuleIDForDelete:any;
  organizations:any;
  selectedOrganization:IselectedOrganization;
  selectedOrganizationIDForDelete:any;

  constructor(
    private globalService:GlobalService, 
    private modalService: BsModalService
  ) { }

  ngOnInit() {

    this.loggedUser = this.globalService.getUserInfo()[0];

    this.getAllUsers();
    this.getAllModules();
    this.getAllOrganizations();

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

  getAllModules() {
    this.globalService.getData("pDesk_ticketModules.php?method=getAllModules&oID="+this.loggedUser.organizationID).then( 
      ( res:any[] ) => {
        this.ticketModules = res;
      });
  }  

  getAllOrganizations() {
    this.globalService.getData("pDesk_users.php?method=getAllOrganizations").then( 
      ( res:any[] ) => {
        this.organizations = res;
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


  openModalModule(templateModule: TemplateRef<any>, prmModuleID:any) {
    this.modalRef = this.modalService.show(templateModule, {class: 'modal-lg'});
    if( prmModuleID>0 ) {
      this.selectedModule = this.ticketModules.find(x=>x.moduleID == prmModuleID);
      console.log (this.selectedModule);

    }
    else {
      let newModule:IselectedModule = { moduleID:"0", moduleName:"", organizationID:"0", organizationName:"3" };
      this.selectedModule = newModule;
    }
  }    

  openModalModuleDelete(templateModuleDelete: TemplateRef<any>, prmID:number) {
    this.modalRef = this.modalService.show(templateModuleDelete, {class: 'modal-sm'});
    this.selectedModuleIDForDelete = prmID;
  }   

  saveModule() {
    let err = 0;

    if (this.selectedModule.moduleName == "" || this.selectedModule.organizationID == "0"  ) {
      this.globalService.showMessage("Modül, organizasyon alanları zorunludur", MessageType.warning);
      return false;
    }

    var fd = new FormData();
    fd.append("method", "saveModule");
    fd.append("ID", this.selectedModule.moduleID );
    fd.append("moduleName", this.selectedModule.moduleName );
    fd.append("organizationID", this.selectedModule.organizationID );
    fd.append("uID", this.loggedUser.ID );
    fd.append("oID", this.loggedUser.organizationID );

    this.globalService.sendData('pDesk_ticketModules', fd).subscribe((res)=>{
      this.getAllModules();
      this.globalService.showMessage("İşlem başarıyla gerçekleşti", MessageType.info);
      this.modalRef.hide();
    });     
   
  }

  confirmDeleteModule(){
    this.globalService.getData("pDesk_ticketModules.php?method=deleteModule&ID="+this.selectedModuleIDForDelete.toString()).then( 
      ( res:any[] ) => {
        this.modalRef.hide();
        this.getAllModules();
      });    
  }

  declineModule() {
    this.modalRef.hide();
  }  


  openModalOrganization(templateOrganization: TemplateRef<any>, prmOrganizationID:any) {
    this.modalRef = this.modalService.show(templateOrganization, {class: 'modal-lg'});
    if( prmOrganizationID>0 ) {
      this.selectedOrganization = this.organizations.find(x=>x.ID == prmOrganizationID);
      console.log (this.selectedOrganization);

    }
    else {
      let newOrganization:IselectedOrganization = { ID:"0", name:"" };
      this.selectedOrganization = newOrganization;
    }
  } 
  
  openModalOrganizationDelete(templateOrganizationDelete: TemplateRef<any>, prmID:number) {
    this.modalRef = this.modalService.show(templateOrganizationDelete, {class: 'modal-sm'});
    this.selectedOrganizationIDForDelete = prmID;
  }  

  saveOrganization() {
    let err = 0;

    if (this.selectedOrganization.name == "" ) {
      this.globalService.showMessage("Organizasyon alanı zorunludur", MessageType.warning);
      return false;
    }

    var fd = new FormData();
    fd.append("method", "saveOrganization");
    fd.append("ID", this.selectedOrganization.ID );
    fd.append("organizationName", this.selectedOrganization.name );

    this.globalService.sendData('pDesk_organization', fd).subscribe((res)=>{
      this.getAllOrganizations();
      this.globalService.showMessage("İşlem başarıyla gerçekleşti", MessageType.info);
      this.modalRef.hide();
    });     
     
  }

  confirmDeleteOrganization(){
    this.globalService.getData("pDesk_organization.php?method=deleteOrganization&ID="+this.selectedOrganizationIDForDelete.toString()).then( 
      ( res:any[] ) => {
        this.modalRef.hide();
        this.getAllOrganizations();
      });    
  }

  declineorganization() {
    this.modalRef.hide();
  }  


}
