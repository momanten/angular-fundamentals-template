import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { SessionStorageService } from '../services/session-storage.service';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private sessionStorage: SessionStorageService,
    private router: Router,
    private authentication: AuthService
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.sessionStorage.getToken();
    let tokenizedRequest: HttpRequest<unknown>;
    if (token) {
      tokenizedRequest = req.clone({
        setHeaders: { Authorization: `${token}` },
      });
    } else {
      tokenizedRequest = req;
    }
    return next.handle(tokenizedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authentication.logout();
          this.router.navigate(['/login']);
        }
        return throwError(() => new Error(error.message));
      })
    );
  }
}
