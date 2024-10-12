import { Inject, Injectable } from "@angular/core";

const TOKEN = "SESSION_TOKEN"; // Use this constant for the session storage entry key
const USERNAME = "SESSION_USER";
// Add your code here

@Injectable({
  providedIn: "root",
})
export class SessionStorageService {
  constructor(@Inject("Window") private window: Window) {}

  setToken(token: string) {
    this.window.sessionStorage.setItem(TOKEN, token);
  }

  getToken() {
    return this.window.sessionStorage.getItem(TOKEN);
  }

  deleteToken() {
    this.window.sessionStorage.removeItem(TOKEN);
  }

  setUserName(name: string) {
    this.window.sessionStorage.setItem(USERNAME, name);
  }

  getUserName() {
    return this.window.sessionStorage.getItem(USERNAME);
  }

  deleteUserName() {
    this.window.sessionStorage.removeItem(USERNAME);
  }
}
