import { Injectable } from "@angular/core";
import { User } from "@app/auth/auth.models";
import { BehaviorSubject } from "rxjs";
import { UserService } from "./user.service";

export const ADMIN_EMAIL = "admin@email.com";

@Injectable({
  providedIn: "root",
})
export class UserStoreService {
  private name$$ = new BehaviorSubject<string>("");
  public name$ = this.name$$.asObservable();
  private isAdmin$$ = new BehaviorSubject<boolean>(false);
  public isAdmin$ = this.isAdmin$$.asObservable();

  constructor(private userService: UserService) {}

  getUser() {
    return this.userService.getUser().subscribe({
      next: response => {
        if (response.result.email === ADMIN_EMAIL) {
          this.isAdmin$$.next(true);
        } else {
          this.isAdmin$$.next(false);
        }
        this.name$$.next(response.result.name);
      },
    });
  }

  get isAdmin() {
    return this.isAdmin$$.getValue();
  }

  set isAdmin(value: boolean) {
    this.isAdmin$$.next(value);
  }
}
