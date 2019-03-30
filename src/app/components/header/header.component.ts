import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedUser:any;
  loggedUserFullname:string;
  organizationName:string;

  constructor(
    private globalService:GlobalService
  ) { 
    
      this.loggedUser  = this.globalService.getUserInfo()[0];

      this.loggedUserFullname = this.loggedUser.fullname;

      if (this.loggedUser.userType == 1 ) {
        this.organizationName = "Admin";
      }
      else {
        this.organizationName = this.loggedUser.organizationName;
      }
    
  }

  ngOnInit() {
  }

  searchTicket(searchKey:any) {
    let strKey = searchKey.value;
    if (strKey != "") {
      this.globalService.redirectPage("/searchresult/"+strKey);
    }
  }

}
