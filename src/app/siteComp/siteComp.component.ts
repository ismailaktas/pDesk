import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs/observable/timer';
@Component({
  selector: 'app-siteComp',
  templateUrl: './siteComp.component.html',
  styleUrls: ['./siteComp.component.css']
})
export class SiteCompComponent implements OnInit {

  constructor() { 

    const source = timer(1000, 10000);
    const abc = source.subscribe(val => {
      console.log( " Check Login");
    });

  }

  ngOnInit() {
  }

}
