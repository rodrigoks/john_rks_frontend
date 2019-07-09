import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

import { AppRoutingModule } from './app.routing.module';
import { CabecalhoModule} from './cabecalho/cabecalho.module';
import { RodapeModule } from './rodape/rodape.module';

import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { FormDebuggerComponent } from './form-debugger/form-debugger.component';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CabecalhoModule,
    RodapeModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    SweetAlert2Module.forRoot(
      // {
      //   buttonsStyling: false,
      //   customClass: 'modal-content',
      //   confirmButtonClass: 'btn btn-primary',
      //   cancelButtonClass: 'btn'
      // }
    )
  ],
  declarations: [
    AppComponent,
    PaginaNaoEncontradaComponent,
    FormDebuggerComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
