import { ConstsService } from './../bl/consts/consts.service';
import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs/observable/timer';

@Component({
  selector: 'app-siteComp',
  templateUrl: './siteComp.component.html',
  styleUrls: ['./siteComp.component.css']
})
export class SiteCompComponent implements OnInit {

  constructor(private cntService: ConstsService ) { 

    const source = timer(1000, cntService.appSettings.appLoginCheckTime);
    const abc = source.subscribe(val => {
      console.log( " Check Login");
    });

  }

  ngOnInit() {
  }

}
