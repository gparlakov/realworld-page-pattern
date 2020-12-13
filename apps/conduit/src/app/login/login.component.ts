import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { typedFormControl, forEachControlIn } from 'ngx-forms-typed';
import { Observable } from 'rxjs';
import { EmailAndPassword } from '../components/email-and-password/email-and-password.types';
import { PageLogin } from "./page.login";
@Component({
  selector: 'rpp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [PageLogin]
})
export class LoginComponent implements OnInit {

  public usernamePasswordControl = typedFormControl<EmailAndPassword>({
    email: '',
    password: ''
  });
  loggingIn$: Observable<boolean>;
  logInError$: Observable<boolean>;

  constructor(private page: PageLogin, private router: Router) { }

  ngOnInit(): void {
    this.loggingIn$ = this.page.loggingIn$;
    this.logInError$ = this.page.logInError$
  }

  onSubmit() {
      this.usernamePasswordControl.markAsTouched();
      this.usernamePasswordControl.updateValueAndValidity();
      if(this.usernamePasswordControl.valid) {
        this.page.onLogin(this.usernamePasswordControl.value, () => this.router.navigateByUrl('/'));
      }
  }

}
