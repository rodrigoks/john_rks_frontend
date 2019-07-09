import { Injectable, OnDestroy, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AppSettings } from './../common/constantes/app-settings';
import { HttpProviderService } from './../http/http-provider.service';
import { AlertService } from './../utils/alert.service';

import { Auth } from './vo/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpProviderService implements OnDestroy {

  isAuthenticatedEmitter = new EventEmitter<Auth>();
  isLoginEmitter = new EventEmitter<boolean>();

  private _urlLogin = 'login';

  private _previousPath = '';
  private _auth: Auth;

  constructor(
    private _http: HttpClient,
    private _alert: AlertService,
    private _router: Router
  ) {
    super(_http, _alert, _router);
  }

  getAuth(): Auth {
    return this._auth;
  }

  login(auth: Auth): Observable<boolean | any> {
      const url = `${AppSettings.HTTPS_URL}${this._urlLogin}`;
      return this.postLogin(url, auth).pipe(
        map(response => {
          this._auth = response as Auth;
          if (this._auth) {
            if (this._auth.firstAcess) {
              this._router.navigate(['/login', this._auth.login, 'primeiroacesso']);
            } else {
              this.exibirLogado();
            }
            return true;
          } else {
              return false;
          }
      }),
      catchError(error => this.handleError(error))
    );
  }

  private exibirLogado() {

    localStorage.setItem('currentUser', JSON.stringify(this._auth));
    this.isAuthenticatedEmitter.emit(this._auth);
    if (this._previousPath != null && this._previousPath != undefined) {
      this._router.navigate([this._previousPath]);
    } else {
      this._router.navigate(['/']);
    }

  }

  recuperarObjetoAutorizacao(): Auth {
    if (this._auth == null || this._auth == undefined) {
      if (localStorage.getItem('currentUser') != undefined) {
        this._auth = JSON.parse(localStorage.getItem('currentUser'));
      }
    }
    return this._auth;
  }

  isLogado(): boolean {

    this._auth = this.recuperarObjetoAutorizacao();
    if (this._auth != undefined && this._auth.token != undefined) {
      if (this.loginExpire(this._auth)) {
        return this.validarTelas(true);
      } else {
        this.validarTelas(false);
      }
    } else {
      return this.validarTelas(false);
    }

  }

  private loginExpire(auth: Auth): boolean {
    const date: number = new Date(auth.expires).getTime();
    const nowDate: number = new Date().getTime();
    if (date - nowDate < 0) {
      return false;
    } else {
      return true;
    }
  }

  validarTelas(flag: boolean): boolean {
    if (flag) {
      this.isAuthenticatedEmitter.emit(this._auth);
      return true;
    } else {
      this.isAuthenticatedEmitter.emit(undefined);
      return false;
    }
  }

  showLogin(flag: boolean) {
    this.isLoginEmitter.emit(flag);
  }

  efetuarLogout() {
    localStorage.removeItem('currentUser');
    this.isAuthenticatedEmitter.emit(undefined);
    this._router.navigate(['/login']);
  }

  setPreviousPath(path: string) {
    this._previousPath = path;
  }

  ngOnDestroy() {
    this.efetuarLogout();
  }

  voltarTelaLogin() {
    setTimeout(() => {
      this._router.navigate(['/login']);
    }, 6000);
  }

}
