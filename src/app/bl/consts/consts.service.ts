import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstsService {

constructor() { }

appSettings = {
  appTitle: 'PDESK',
  appApiUrl: 'http://localhost/pDesk/src/app/controllers/',
  appLoginCheckTime:  120000,
  uploadFolder: 'uploads',
};


}
