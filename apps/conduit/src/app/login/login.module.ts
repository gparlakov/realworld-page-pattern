import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { EmailAndPasswordModule } from "../components/email-and-password/email-and-password.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    EmailAndPasswordModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class LoginModule { }
