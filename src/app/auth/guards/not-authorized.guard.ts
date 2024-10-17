import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NotAuthorizedGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean | UrlTree {
    if (!this.authService.isAuthorised) {
      return true; // Allow access to the route
    } else {
      return this.router.createUrlTree(['/courses']); // Redirect to login if not authorized
    }
  }
}
