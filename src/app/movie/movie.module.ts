import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie.routing.module';
import { TituloPaginaModule } from '../titulo-pagina/titulo-pagina.module';
import { SpinnerModule } from '../spinner/spinner.module';

import { MovieComponent } from './movie.component';

@NgModule({
  imports: [
    CommonModule,
    MovieRoutingModule,
    TituloPaginaModule,
    FormsModule,
    SpinnerModule
  ],
  declarations: [
    MovieComponent
  ],
  providers: [
  ]
})
export class MovieModule { }
