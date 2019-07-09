import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from './login/auth.service';
import { AlertService } from './utils/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  errorTmp = '';

  constructor(
    private _router: Router,
    private _auth: AuthService,
    private _toastr: ToastrService,
    private _alert: AlertService,
    private _cdr: ChangeDetectorRef
  ) {

    this._router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit() {
    this._auth.isAuthenticatedEmitter.subscribe(
      authenticated => {
        this.isAuthenticated = authenticated;
        this._cdr.detectChanges();
      }
    );
    this._alert.successEventEmitter.subscribe(
      sucesso => {
        if (sucesso !== undefined && sucesso !== '' && sucesso !== null && this.errorTmp !== sucesso) {
          this._toastr.success(sucesso, 'Informação!');
          this.errorTmp = sucesso;
          this.onTime();
        }
      }
    );
    this._alert.errorEventEmitter.subscribe(
      erro => {
        if (erro !== undefined && erro !== '' && erro !== null && this.errorTmp !== erro) {
          this._toastr.error(erro, 'Erro!');
          this.errorTmp = erro;
          this.onTime();
        }
      }
    );
    this._alert.warningEventEmitter.subscribe(
      erro => {
        if (erro !== undefined && erro !== '' && erro !== null && this.errorTmp !== erro) {
          this._toastr.warning(erro, 'Atenção!');
          this.errorTmp = erro;
          this.onTime();
        }
      }
    );
    this._alert.infoEventEmitter.subscribe(
      erro => {
        if (erro !== undefined && erro !== '' && erro !== null && this.errorTmp !== erro) {
          this._toastr.info(erro, 'Informativo!');
          this.errorTmp = erro;
          this.onTime();
        }
      }
    );
  }

  ngOnDestroy() {
    this._auth.isAuthenticatedEmitter.unsubscribe();
    this._alert.successEventEmitter.unsubscribe();
    this._alert.errorEventEmitter.unsubscribe();
    this._alert.warningEventEmitter.unsubscribe();
    this._alert.infoEventEmitter.unsubscribe();
  }

  onTime() {
    setTimeout(() => {
      this.errorTmp = '';
    }, 3000);
  }

}

