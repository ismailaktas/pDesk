import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private globalService:GlobalService
  ) { }

  ngOnInit() {
    this.globalService.getData("pDesk_users.php?method=logout").then( 
      ( res:any[] ) => {
        localStorage.clear();
        this.globalService.redirectPage("login");
      });    
  }

}
