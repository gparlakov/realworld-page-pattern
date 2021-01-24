import { Injectable } from '@angular/core';
const tokenName = 'poadapsdjaoidsjadj';
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  store(token: string) {
    localStorage.setItem(tokenName, token);
  }

  get() {
    return localStorage.getItem(tokenName);
  }
}
