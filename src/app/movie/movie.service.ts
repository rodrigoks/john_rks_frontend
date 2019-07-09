import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AlertService } from '../utils/alert.service';
import { HttpProviderService } from '../http/http-provider.service';
import { AppSettings } from '../common/constantes/app-settings';

@Injectable({
  providedIn: 'root'
})
export class MovieService extends HttpProviderService {

  private _urlConsultarMovies = 'johndeere';

  constructor(
    private _http: HttpClient,
    private _alert: AlertService,
    private _router: Router
  ) {
    super(_http, _alert, _router);
  }

  getMovies(movie: string, character: string): Observable<boolean | any> {
    const url = `${AppSettings.HTTPS_URL}${this._urlConsultarMovies}?film_id=${movie}&character_id=${character}`;

    // let params = new HttpParams();
    // params = params.append('film_id', movie);
    // params = params.append('character_id', character);

    return this.get(url, null, null).pipe(
      catchError(error => this.handleError(error))
    );
  }

}
