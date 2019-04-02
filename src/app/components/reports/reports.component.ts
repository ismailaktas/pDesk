import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  providers: [
  ]  
})
export class ReportsComponent implements OnInit {

  public chartColors:any[] = [
    { backgroundColor: ["#86c7f3", "#ffe199"] },
    { borderColor: ["#AEEBF2", "#FEFFC9"] }];

  constructor(
    private globalService:GlobalService, 
  ) { 
    this.loggedUser = this.globalService.getUserInfo()[0];

    this.getTicketStatus();
    this.getTicketTypes();
    this.getModuleErrors();
    this.getAssignedUsers();

  }

  ngOnInit() {
  }

  loggedUser:any;
  
  public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLegend = true;
  public pieChartType: ChartType = 'pie';

  public pieChartLabels: Label[] = ['Download', 'Sales', 'In', 'Store', 'Sales', 'Mail Sales'];
  public pieChartData: SingleDataSet = [300, 500, 100, 45, 66, 78, ];
  
  //status
  public ticketStatusLabel: Label[] = [];
  public ticketStatusData: SingleDataSet = [];      
  getTicketStatus() {
    this.globalService.getData('pDesk_tickets.php?method=prcRptTicketStatus&oID='+this.loggedUser.organizationID).then( 
      ( res:any[] ) => {
        let cnt:any = res.length;
        let dt:any = "";
        if (cnt > 0 ) {
          for (var key in res) {
            this.ticketStatusLabel.push( res[key].text );
            dt += res[key].value + ", ";
          }
          dt = dt.split(",");
          this.ticketStatusData = [ dt ];      
        }
    });
  } 

  //types
  public typesLabel: Label[] = [];
  public typesData: SingleDataSet = [];      
  getTicketTypes() {
    this.globalService.getData('pDesk_tickets.php?method=prcRptTicketTypes&oID='+this.loggedUser.organizationID).then( 
      ( res:any[] ) => {
        let cnt:any = res.length;
        let dt:any = "";
        if (cnt > 0 ) {
          for (var key in res) {
            this.typesLabel.push( res[key].text );
            dt += res[key].value + ", ";
          }
          dt = dt.split(",");
          this.typesData = [ dt ];      
        }
    });
  }   

  //module Errors
  public moduleErrosLabel: Label[] = [];
  public moduleErrorsData: SingleDataSet = [];      
  getModuleErrors() {
    this.globalService.getData('pDesk_tickets.php?method=prcRptModuleErros&oID='+this.loggedUser.organizationID).then( 
      ( res:any[] ) => {
        let cnt:any = res.length;
        let dt:any = "";
        if (cnt > 0 ) {
          for (var key in res) {
            this.moduleErrosLabel.push( res[key].text );
            dt += res[key].value + ", ";
          }
          dt = dt.split(",");
          this.moduleErrorsData = [ dt ];      
        }
    });
  }
  
  //assigned Users
  public assignedUserLabel: Label[] = [];
  public assignedUserData: SingleDataSet = [];      
  getAssignedUsers() {
    this.globalService.getData('pDesk_tickets.php?method=prcRptAssignedUsers&oID='+this.loggedUser.organizationID).then( 
      ( res:any[] ) => {
        let cnt:any = res.length;
        let dt:any = "";
        if (cnt > 0 ) {
          for (var key in res) {
            this.assignedUserLabel.push( res[key].text );
            dt += res[key].value + ", ";
          }
          dt = dt.split(",");
          this.assignedUserData = [ dt ];      
        }
    });
  }  




}
