import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailAndPasswordComponent } from "./email-and-password.component";

@NgModule({
  declarations: [EmailAndPasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [EmailAndPasswordComponent]
})
export class EmailAndPasswordModule { }
