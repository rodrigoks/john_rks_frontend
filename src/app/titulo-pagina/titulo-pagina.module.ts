import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TituloPaginaComponent } from './titulo-pagina.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    TituloPaginaComponent
  ],
  exports: [
    TituloPaginaComponent
  ]
})
export class TituloPaginaModule { }
