import { ConstsService } from './../bl/consts/consts.service';
import { DateFormatType } from './../classes/dateFormatType.enum';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { MessageType } from '../classes/messageType.enum';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(
      private http: HttpClient,
      private toastr: ToastrService,
      private constsService: ConstsService
  ) 
  {
  }

  public apiUrl:string = this.constsService.appSettings.appApiUrl;

  public userInfo = {
    userID : 1,
    userType : 1,
    userOrganizationID : 1,
    userFullName : "Kullanıcı Adı Soyadı"
  };

  showMessage(strMessage:string, messageType:MessageType) {
    let mTimeOut:number = 3000;
    switch(messageType){
      case MessageType.error:
        this.toastr.error(strMessage, null, {timeOut: mTimeOut});
        break;
      case MessageType.warning:
        this.toastr.warning(strMessage, null, {timeOut: mTimeOut});
        break;
      case MessageType.info:
        this.toastr.info(strMessage, null, {timeOut: mTimeOut});
        break;                
    }
  }

  getDate(dateFormat: DateFormatType)
  {
    let returnDate = new Date();

    switch(dateFormat){
      case DateFormatType.currentYear:
        returnDate.getFullYear();
        break;
      case DateFormatType.dayOfMonth:
        returnDate.getDate();
        break; 
      case DateFormatType.dayOfWeek:
        returnDate.getDay();
        break;  
      case DateFormatType.hour:
        returnDate.getHours();
        break;                
      case DateFormatType.miliSecond:
        returnDate.getMilliseconds();
        break; 
      case DateFormatType.minute:
        returnDate.getMinutes();        
        break; 
      case DateFormatType.month:
        returnDate.getMonth();        
        break; 
      case DateFormatType.second:
        returnDate.getSeconds();        
        break;
      case DateFormatType.timeNumeric:
        returnDate.getSeconds();  
        break;                                                      
      case DateFormatType.shortDate:
        returnDate.toLocaleDateString();  
        break;
      case DateFormatType.shortDateTR:
        returnDate.toLocaleDateString('tr-TR');
        break;        
      case DateFormatType.shortTime:
        returnDate.toLocaleTimeString('tr-TR', { hour12: false, hour: "numeric", minute: "numeric" });
        break;                

    }   
    return returnDate;
  }

  sendData(strUrl:string, postData:any) {
    return this.http.post(this.constsService.appSettings.appApiUrl + strUrl + '.php', postData);
  }

  getData(strUrl:string){
    this.http.get(this.constsService.appSettings.appApiUrl + strUrl).subscribe((resp:any) => {
      return resp;
    });
  }
  

  }
  



