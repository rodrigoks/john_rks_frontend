import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AlertModule } from 'ngx-bootstrap/alert';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LoginRoutingModule,
    AlertModule.forRoot() 
  ],
  declarations: [
    LoginComponent
  ],
  exports: []
})
export class LoginModule { }
