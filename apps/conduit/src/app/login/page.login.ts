import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { EmailAndPassword } from '../components/email-and-password/email-and-password.types';
import { userLoginURL } from '../core/api-urls';
import { onErrorStatus, onUnhandledError } from '../core/error-matchers';
import { NotifyUser } from '../core/notify-user';
import { TokenService } from '../core/token.service';
import { User } from '../core/types';

@Injectable()
export class PageLogin {
  public loggingIn$ = new BehaviorSubject<boolean>(false);
  public logInError$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private token: TokenService,
    private handler: ErrorHandler,
    private notify: NotifyUser
  ) {}

  onLogin(
    emailAndPassword: EmailAndPassword,
    onSuccess: () => Promise<boolean>
  ) {
    if (this.loggingIn$.value === false) {
      this.loggingIn$.next(true);
      this.logInError$.next(false);
      this.http
        .post<User>(userLoginURL, { user: emailAndPassword })
        .pipe(
          tap((loggedInUser) => {
            this.token.store(loggedInUser.user.token);
            onSuccess();
            this.loggingIn$.next(false);
          }),
          onErrorStatus(422, (e) => {
            this.loggingIn$.next(false);
            this.logInError$.next(true);
          }),
          onUnhandledError((e) => {
            this.loggingIn$.next(false);
            this.handler.handleError(e);
            this.notify.error(
              'Could not log you in.',
              'Our engineers are notified about the issue.'
            );
          }),
          take(1)
        )
        .subscribe();
    }
  }
}
