import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent
  ],
  exports: []
})
export class LoginModule { }
