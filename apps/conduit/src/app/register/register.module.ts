import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { EmailAndPasswordModule } from "../components/email-and-password/email-and-password.module";
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    EmailAndPasswordModule,
    ReactiveFormsModule
  ]
})
export class RegisterModule { }
