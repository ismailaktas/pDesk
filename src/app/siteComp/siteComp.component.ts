import { ConstsService } from './../bl/consts/consts.service';
import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs/observable/timer';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-siteComp',
  templateUrl: './siteComp.component.html',
  styleUrls: ['./siteComp.component.css']
})
export class SiteCompComponent implements OnInit {

  constructor(
    private cntService: ConstsService,
    private globalService: GlobalService 
  ) { 

    const source = timer(10, cntService.appSettings.appLoginCheckTime);
    const abc = source.subscribe(val => {
      let userInfo:any = globalService.getUserInfo();
      if (userInfo === null) {
        this.globalService.redirectPage("login");
      }
    });

  }

  ngOnInit() {
  }

}
