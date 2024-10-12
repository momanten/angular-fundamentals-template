import { Injectable } from "@angular/core";
import { UserStoreService } from "../services/user-store.service";
import { CanActivate, Router, UrlTree } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  constructor(
    private user: UserStoreService,
    private router: Router
  ) {
    console.error("AdminGuard", this.user.isAdmin);
  }

  canActivate(): boolean | UrlTree {
    if (this.user.isAdmin) {
      return true; // Allow access to the route
    } else {
      return this.router.createUrlTree(["/courses"]); // Redirect to login if not authorized
    }
  }
}
