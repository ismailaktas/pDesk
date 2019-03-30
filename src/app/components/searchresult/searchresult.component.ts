import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.css'],
  providers: [
    GlobalService
  ]    
})
export class SearchresultComponent implements OnInit {

  searchkey:any;
  tickets:any;
  loggedUser:any;

  constructor(
    private activeRoute:ActivatedRoute, 
    private globalService:GlobalService,     
  ) { }

  ngOnInit() {

    this.searchkey = this.activeRoute.snapshot.params['searchkey'];
    this.loggedUser = this.globalService.getUserInfo()[0];

    this.globalService.getData("pDesk_tickets.php?method=getTicketsSearch&uID="+this.loggedUser.ID+"&oID="+this.loggedUser.organizationID+"&key="+this.searchkey).then( 
      ( res:any[] ) => {
        this.tickets = res;
    }); 


  }

}
