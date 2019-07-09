import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppSettings } from '../common/constantes/app-settings';

import { AuthService } from './auth.service';
import { Auth } from './vo/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  imgLogin = 'assets/img/johndeere.png';
  auth: Auth = new Auth();
  isLogin = true;

  constructor(
    private _authService: AuthService
  ) {
  }

  efetuarLogin() {
    this._authService.login(this.auth).subscribe(
      error =>  error
    );
  }

  ngOnInit() {
    if (!AppSettings.isProducao()) {
      this.auth.login = 'deere@deere.com.br';
      this.auth.password = 'deere';
    }
    this._authService.isAuthenticatedEmitter.emit(undefined);
    this._authService.isLoginEmitter.subscribe(
      login => this.isLogin = login
    );
  }

  ngOnDestroy() {
  }

}
