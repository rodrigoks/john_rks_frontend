import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CabecalhoComponent } from './cabecalho.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CabecalhoComponent
  ],
  exports: [
    CabecalhoComponent
  ]
})
export class CabecalhoModule { }
