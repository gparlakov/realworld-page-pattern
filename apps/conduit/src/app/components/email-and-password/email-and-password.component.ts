import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { NgControl, Validators } from '@angular/forms';
import {
  ControlValueAccessorConnector,
  typedFormControl,
  typedFormGroup,
} from 'ngx-forms-typed';
import { EmailAndPassword } from './email-and-password.types';

@Component({
  selector: 'rpp-email-and-password',
  templateUrl: './email-and-password.component.html',
  styleUrls: ['./email-and-password.component.scss'],
})
export class EmailAndPasswordComponent
  extends ControlValueAccessorConnector<EmailAndPassword>
  implements OnInit {
  @Input()
  emailErrors: string[];

  @Input()
  passwordErrors: string[];

  get email() {
    return this.form.controls.email;
  }
  get password() {
    return this.form.controls.password;
  }

  constructor(@Self() @Optional() controlDirective: NgControl) {
    super(
      controlDirective,
      typedFormGroup(
        {
          email: typedFormControl(
            '',
            {
              validators: Validators.compose([Validators.required, Validators.email]),
              updateOn: 'change'
            }
          ),
          password: typedFormControl(
            '',
            {
              validators: Validators.required,
              updateOn: 'change'
            }),
        }
      )
    );
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
  onEmailInputBlur() {
    this.onTouch();
  }
  onPasswordInputBlur() {
    this.onTouch();
  }
}
