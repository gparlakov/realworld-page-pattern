import { Component, OnInit } from '@angular/core';
import {
  forEachControlIn,
  typedFormControl,
  typedFormGroup,
} from 'ngx-forms-typed';
import { RegisterUser } from './register-types';
import { PageRegister } from "./page.register";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'rpp-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [PageRegister]
})
export class RegisterComponent implements OnInit {
  public form = typedFormGroup<RegisterUser>({
    username: typedFormControl(''),
    emailAndPass: typedFormControl({
      email: '',
      password: '',
    }),
  });
  registering$: Observable<boolean>;
  usernameErrors$: Observable<string[]>;
  emailErrors$: Observable<string[]>;
  passwordErrors$: Observable<string[]>;

  constructor(private page: PageRegister, private router: Router) {}

  ngOnInit(): void {
    this.registering$ = this.page.registering$;
    this.usernameErrors$ = this.page.usernameErrors$;
    this.emailErrors$ = this.page.emailErrors$;
    this.passwordErrors$ = this.page.passwordErrors$;
  }

  onSubmit() {
    forEachControlIn(this.form).call('markAsTouched', 'updateValueAndValidity');
    if (this.form.valid) {
      this.page.onRegister(this.form.value, () => this.router.navigateByUrl('/'));
    }
  }
}
