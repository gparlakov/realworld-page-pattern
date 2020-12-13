import { ErrorHandler, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { RegisterServerErrors, RegisterUser } from './register-types';
import { usersURL } from '../core/api-urls';
import { User } from '../core/types';
import { HttpClient } from '@angular/common/http';
import { onErrorStatus, onUnhandledError } from '../core/error-matchers';
import { tap, take, map } from 'rxjs/operators';
import { TokenService } from "../core/token.service";
import { NotifyUser } from '../core/notify-user';
@Injectable()
export class PageRegister {
  registering$ = new BehaviorSubject(false);
  serverValidationErrors$ = new ReplaySubject<RegisterServerErrors>(1);
  usernameErrors$ = this.serverValidationErrors$.pipe(map(e => e?.errors?.username || []));
  emailErrors$ = this.serverValidationErrors$.pipe(map(e => e?.errors?.email || []))
  passwordErrors$ = this.serverValidationErrors$.pipe(map(e => e?.errors?.password || []))

  constructor(private http: HttpClient, private token: TokenService, private handler: ErrorHandler, private notify: NotifyUser) {}

  onPageEnter(): void {}

  onRegister(r: RegisterUser, onSuccess: () => {}) {
    if (!this.registering$.value) {
      this.registering$.next(true);
      this.serverValidationErrors$.next(null);

      this.http
        .post<User>(usersURL, {
          user: {
            username: r.username,
            email: r.emailAndPass.email,
            password: r.emailAndPass.password,
          },
        })
        .pipe(
          tap((u) => {
            this.registering$.next(false);
            this.token.store(u.user.token);
            onSuccess();
          }),
          onErrorStatus(422, e => {
            if('error' in e && 'errors' in e?.error && e.error != null) {
              this.serverValidationErrors$.next(e.error);
            }
            this.registering$.next(false);
          }),
          onUnhandledError((e) => {
            this.registering$.next(false);
            this.handler.handleError(e);
            this.notify.error('Register failed!', 'Our engineers are working on the issue!')
          }),
          take(1)
        )
        .subscribe();
    }
  }
}
