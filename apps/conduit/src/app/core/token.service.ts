import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private token: string;

  store(token: string) {
    this.token = token;
  }

  get() {
    return this.token;
  }
}
