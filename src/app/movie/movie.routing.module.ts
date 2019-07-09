import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieComponent } from './movie.component';

const JOHN_DEERE_ROUTES: Routes = [
  {
    path: '', component: MovieComponent
  },
  {
    path: ':filtro',
    component: MovieComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(JOHN_DEERE_ROUTES)],
  exports: [RouterModule]
})
export class MovieRoutingModule {

}
