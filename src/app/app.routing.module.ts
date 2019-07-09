import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './login/guards/auth.guard';

import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';

const APP_ROUTES: Routes = [
  {
    path: 'movie',
    loadChildren: () => import('./movie/movie.module').then(m => m.MovieModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: '', redirectTo: 'movie', pathMatch: 'full'
  },
  {
    path: '**', component: PaginaNaoEncontradaComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES, {
      useHash: true,
      scrollPositionRestoration: 'enabled' // funciona apenas para conteudo estatico
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
