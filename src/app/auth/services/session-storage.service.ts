import { Inject, Injectable } from '@angular/core';

const TOKEN = 'SESSION_TOKEN'; // Use this constant for the session storage entry key

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  constructor(@Inject('Window') private window: Window) {}

  setToken(token: string) {
    this.window.sessionStorage.setItem(TOKEN, token);
  }

  getToken() {
    return this.window.sessionStorage.getItem(TOKEN);
  }

  deleteToken() {
    this.window.sessionStorage.removeItem(TOKEN);
  }
}
