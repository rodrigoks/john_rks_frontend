import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

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

  private _paramSubs: Subscription;

  constructor(
    private _activateRoute: ActivatedRoute,
    private _movieService: MovieService
  ) { }

  ngOnInit() {

    this._paramSubs = this._activateRoute.queryParamMap.subscribe(params => {
      this.movie = params.get('film_id');
      this.character = params.get('character_id');
      if(this.movie !== undefined && this.movie !== null && this.character !== undefined && this.character !== null) {
        this.onSubmit();
      }
    })

  }

  ngOnDestroy() {
    this._paramSubs.unsubscribe();
  }

  onSubmit(): void {
    this.loading = true;
    this.result$ = this._movieService.getMovies(this.movie, this.character).pipe(
      map(
        response => {
          if (response !== undefined && response !== null) {
            this.setCharacters(response);
          }
          this.loading = false;
          return response;
        }),
        catchError(error => {
          this.loading = false;
          return of();
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
