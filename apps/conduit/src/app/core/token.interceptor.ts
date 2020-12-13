import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private token: TokenService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.token.get() != null) {
      const clone = request.clone({
        headers: new HttpHeaders({
          Authorization: `Token ${this.token.get()}`,
        }),
      });
      return next.handle(clone);
    } else {
      return next.handle(request);
    }
  }
}
