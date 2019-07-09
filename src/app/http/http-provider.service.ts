import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';

import * as FileSaver from 'file-saver';

import { AppSettings } from './../common/constantes/app-settings';

import { AlertService } from './../utils/alert.service';

import { Auth } from './../login/vo/auth';
import { ResponseServiceVO } from '../common/vo/response-service-vo';

@Injectable()
export class HttpProviderService {

  constructor(
    public http: HttpClient,
    public alert: AlertService,
    public router: Router
  ) {
  }

  get(url: string, contentType: string, params: HttpParams): Observable<boolean | any> {
    let headers;
    if (contentType) {
      headers = new HttpHeaders({ 'Token': this.recuperandoToken(), 'Content-Type': contentType});
    } else {
      headers = new HttpHeaders({ 'Token': this.recuperandoToken()});
    }
    return this.http.get(url, { headers: headers, params: params });
  }

  postLogin(url: string, auth: Auth) {
    const authdata: string = btoa(auth.login + ':' + auth.password);
    const headers = new HttpHeaders(
    { 'Content-Type': AppSettings.APPLICATION_JSON,
      'Authorization': 'Basic ' + authdata
    });
    return this.postMethod(url, null, headers);
  }

  post(url: string, body: any, contentType: string): Observable<boolean | any> {
    let headers;
    if (contentType === AppSettings.APPLICATION_MULTIPART_FORMDATA) {
      headers = new HttpHeaders({ 'enctype': contentType, 'Token': this.recuperandoToken()});
    } else {
      headers = new HttpHeaders({ 'Content-Type': contentType, 'Token': this.recuperandoToken()});
    }
    return this.postMethod(url, body, headers);
  }

  private recuperandoToken(): string {
    let auth: Auth;
    if (localStorage.getItem('currentUser') != null && localStorage.getItem('currentUser') !== undefined) {
      auth = JSON.parse(localStorage.getItem('currentUser'));
    }
    if (auth) {
      return auth.token;
    }
      return '';
  }

  private postMethod(url: string, body: string, headers: HttpHeaders) {
    return this.http.post(url, body, { headers: headers });
  }

  put(url: string, body: any, contentType: string): Observable<boolean | any> {
    const headers = new HttpHeaders({ 'Content-Type': contentType, 'Token': this.recuperandoToken()});
    return this.http.put(url, body, { headers: headers });
  }

  delete(url: string, contentType: string): Observable<boolean | any> {
    const headers = new HttpHeaders({ 'Content-Type': contentType, 'Token': this.recuperandoToken()});
    return this.http.delete(url, { headers: headers });
  }

  handleError(error: HttpErrorResponse | any): Observable<boolean | any> {
    let errMsg: string;
    console.log('error', error);
    if (error instanceof HttpErrorResponse) {
      const body = error;
      if (body) {
        if (body.status === AppSettings.UNAUTHORIZED) {
          this.alert.errorEventEmitter.emit(body.error.description);
          this.router.navigate(['/login']);
          return observableThrowError('');
        } else if (body.status === AppSettings.FORBIDDEN) {
          this.alert.errorEventEmitter.emit(body.error.description);
          return observableThrowError('');
        }
      }
      // this.unAuthorizedUser(body);
      const err = body.error.description || JSON.stringify(body);
      errMsg = `${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    return observableThrowError(errMsg);

  }

  unAuthorizedUser(body: ResponseServiceVO) {
    if (body) {
      if (body.statusCodeResponse === AppSettings.UNAUTHORIZED) {
        this.alert.errorEventEmitter.emit(body.description);
        this.router.navigate(['/login']);
      } else if (body.statusCodeResponse === AppSettings.FORBIDDEN) {
        this.alert.errorEventEmitter.emit(body.description);
      }
      return;
    }
  }

  downloadFile(response: ResponseServiceVO) {
    const byteArray = new Uint8Array(response.data.fileArray);
    const blob = new Blob([byteArray], { type: 'application/octet-stream' });
    FileSaver.saveAs(blob, response.data.nomeRelatorio);
  }

}
