import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  successEventEmitter = new EventEmitter<string>();
  errorEventEmitter = new EventEmitter<string>();
  warningEventEmitter = new EventEmitter<string>();
  infoEventEmitter = new EventEmitter<string>();

  constructor() { }

}
