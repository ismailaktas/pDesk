import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstsService {

constructor() { }

appSettings = {
  appTitle: 'PDESK',
  appApiUrl: 'http://support.com/controllers/',
  appLoginCheckTime:  120000,
  uploadFolder: 'uploads',
};


}
