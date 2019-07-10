import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { AlertService } from '../utils/alert.service';
import { AuthService } from '../login/auth.service';

import { Auth } from '../login/vo/auth';
import { MovieService } from './movie.service';
import { ResponseVO } from './vo/response-vo';
import { PeopleVO } from './vo/people-vo';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  preserveWhitespaces: true
})
export class MovieComponent implements OnInit, OnDestroy {

  result$: Observable<any[]>;
  movie: string;
  character: string;
  loading = false;
  auth: Auth;

  private _paramSubs: Subscription;

  constructor(
    private _activateRoute: ActivatedRoute,
    private _movieService: MovieService,
    private _alertService: AlertService,
    private _authService: AuthService,
  ) { }

  ngOnInit() {

    this._paramSubs = this._activateRoute.params.subscribe(
      (params: any) => {
        // if (params['filtro']) {
        //   this._filtro = params['filtro'];
        // } else {
        //   this._filtro = undefined;
        // }
        // this.consultarLogbooks();
      }
    );

    this.auth = this._authService.getAuth();

  }

  ngOnDestroy() {
    this._paramSubs.unsubscribe();
  }

  onSubmit(form): void {
    this.loading = true;
    this.result$ = this._movieService.getMovies(this.movie, this.character).pipe(
      map(
        response => {
          console.log('response', response);
          if (response !== undefined && response !== null) {
            this.setCharacters(response);
          }
          this.loading = false;
          return response;
        })
    );
  }

  private setCharacters(response: ResponseVO): void {
    let count: number = 1;
    response.charactersView = '';
    response.colPeople.forEach(
      item => {
        if (count < response.colPeople.length) {
          response.charactersView += (item as PeopleVO).name + ', ';
        } else {
          response.charactersView += (item as PeopleVO).name;
        }
        count++;
      }
    );
  }

  limpar(): void {
    this.movie = undefined;
    this.character = undefined;
    this.result$ = undefined;
    this.loading = false;
  }

}
