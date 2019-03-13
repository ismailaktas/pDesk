import { DateFormatType } from './../classes/dateFormatType.enum';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  baseUrl = 'http://localhost/pDesk/pDesk/src/app/controllers/';
 
  constructor(private http: HttpClient) {
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
    return this.http.post(this.baseUrl + strUrl + '.php', postData);
  }
  


}
