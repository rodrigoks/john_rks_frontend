import { Component, OnInit } from '@angular/core';

import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent implements OnInit {

  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit() {
  }

  efetuarLogout() {
    this._authService.efetuarLogout();
  }

}
