import { ConstsService } from "./../bl/consts/consts.service";
import { DateFormatType } from "./../classes/dateFormatType.enum";
import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { MessageType } from "../classes/messageType.enum";
import { ActivatedRoute } from "@angular/router";

@Injectable()

export class GlobalService {
  public apiUrl: string = this.constsService.appSettings.appApiUrl;
  public getActivePageName: string = "";

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private constsService: ConstsService,
    routeInfo: ActivatedRoute
  ) {
    this.getActivePageName = routeInfo.snapshot.url.toString();
  }

  getUserInfo() {
    let res: any;
    if (localStorage.getItem("pDeskUI") === null) {
      res = null;
    }
    else {
      let getEncodedCode = window.localStorage.getItem("pDeskUI");
      let dCode = this.decodeString(getEncodedCode);
      res = JSON.parse(dCode);
    }
    return res;
  }

  showMessage(strMessage: string, messageType: MessageType) {
    let mTimeOut: number = 3000;
    switch (messageType) {
      case MessageType.error:
        this.toastr.error(strMessage, null, { timeOut: mTimeOut });
        break;
      case MessageType.warning:
        this.toastr.warning(strMessage, null, { timeOut: mTimeOut });
        break;
      case MessageType.info:
        this.toastr.info(strMessage, null, { timeOut: mTimeOut });
        break;
    }
  }

  getStatusCssClassName(statusID) {
    let classResult: string = "";
    switch (statusID) {
      case "1":
        classResult = "primary";
        break; //Yeni
      case "2":
        classResult = "danger";
        break; //Devam
      case "3":
        classResult = "success";
        break; //Tamam
      case "4":
        classResult = "secondary";
        break; //Kapandi
      case "5":
        classResult = "warning";
        break; //Beklemede
      default:
        classResult = "secondary";
        break; //default
    }
    return classResult;
  }

  getDate(dateFormat: DateFormatType) {
    let returnDate = new Date();

    switch (dateFormat) {
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
        returnDate.toLocaleDateString("tr-TR");
        break;
      case DateFormatType.shortTime:
        returnDate.toLocaleTimeString("tr-TR", {
          hour12: false,
          hour: "numeric",
          minute: "numeric"
        });
        break;
    }
    return returnDate;
  }

  redirectPage(pageName: string) {
    document.location.href = pageName;
  }

  sendData(strUrl: string, postData: any) {
    return this.http.post(
      this.constsService.appSettings.appApiUrl + strUrl + ".php",
      postData
    );
  }

  async getData(strUrl: string): Promise<any[]> {
    let headers = new HttpHeaders();
    return await this.http
      .get<any[]>(this.constsService.appSettings.appApiUrl + strUrl, {
        headers: headers
      })
      .toPromise();
  }

  openPageNewTabCustomUrl( strPage:string ){
    window.open(strPage, '_blank');
  }

  encodeString(text:string) {
    return window.btoa(unescape(encodeURIComponent( text )));
  }

  decodeString(text:string) {
    return decodeURIComponent(escape(window.atob( text )));
  }

}
