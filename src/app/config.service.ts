import { Injectable } from '@angular/core';
import * as Parse from 'parse';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { 
    Parse.initialize(
      'apiID', //replace with your app id 
      'apiKey' //replace with your javascript key
    );

    (<any>Parse).serverURL = 'parseUrl'; //replace with parse server url
  }
}
