import { Component, OnInit } from '@angular/core';
import { typedFormControl, forEachControlIn } from 'ngx-forms-typed';
import { EmailAndPassword } from '../components/email-and-password/email-and-password.types';

@Component({
  selector: 'rpp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public usernamePasswordControl = typedFormControl<EmailAndPassword>({
    email: '',
    password: ''
  });

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
      this.usernamePasswordControl.markAsTouched();
      this.usernamePasswordControl.updateValueAndValidity();
  }

}
