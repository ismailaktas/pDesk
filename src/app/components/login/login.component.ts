import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  strUsername:string;
  strPassword:string;

  constructor( 
      private http: HttpClient, 
      private globalService:GlobalService ) {
  }

  ngOnInit() {
  }

  checkUser() {

    var fd = new FormData();
    fd.append("method", "checkUser");
    fd.append("username", this.strUsername);
    fd.append("password", this.strPassword);
    this.globalService.sendData('pDesk_users', fd).subscribe((resp:any)=>{
      if (resp>0) {
        document.location.href = "/home";
      }
    });  

        
  }

}
