import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedUserFullname:string;

  constructor(
    private globalService:GlobalService
  ) { 
    this.loggedUserFullname = this.globalService.getUserInfo()[0].fullname;
  }

  ngOnInit() {
  }

}
