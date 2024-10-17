import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { SessionStorageService } from './session-storage.service';
import { APIResult, LoginResponse, LoginUser, LogoutResponse, ResgistrationResponse, User } from '../auth.models';
import { UserStoreService } from '@app/user/services/user-store.service';
import { LOGIN_URL, LOGOUT_URL, REGISTRATION_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthorized$$ = new BehaviorSubject<boolean>(false);
  public isAuthorized$: Observable<boolean> = this.isAuthorized$$.asObservable();

  constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService,
    private userStore: UserStoreService
  ) {}

  login(user: LoginUser) {
    return this.http.post<LoginResponse>(LOGIN_URL, user).pipe(
      map(response => {
        const token = response?.result;
        if (token) {
          this.sessionStorage.setToken(token);
          this.isAuthorized$$.next(true);
          this.userStore.getUser();
          return {
            result: true,
            email: user.email,
          };
        } else {
          this.isAuthorized$$.next(false);
          return {
            result: false,
            error: 'Token is missing from server',
          };
        }
      }),
      catchError(err => {
        throw 'Login failed: ' + JSON.stringify(err.error.result);
      })
    );
  }

  logout(): Observable<APIResult> {
    const token = this.sessionStorage.getToken();
    const headers = new HttpHeaders({
      Authorization: `${token}`,
    });
    this.sessionStorage.deleteToken();
    this.isAuthorized$$.next(false);
    this.userStore.userName = '';
    this.userStore.isAdmin = false;

    return this.http.delete<LogoutResponse>(LOGOUT_URL, { headers }).pipe(
      map(() => {
        return {
          result: true,
        };
      }),
      catchError(error => {
        return of({
          result: false,
          error: error?.message || 'Unknown error',
        });
      })
    );
  }

  register(user: User): Observable<APIResult> {
    return this.http.post<ResgistrationResponse>(REGISTRATION_URL, user).pipe(
      map((response: ResgistrationResponse) => {
        return {
          result: response.successful,
          error: response.errors[0],
        };
      }),
      catchError(error => {
        return of({
          result: false,
          error: error?.message || 'Unknown error',
        });
      })
    );
  }

  get isAuthorised() {
    return this.isAuthorized$$.getValue();
  }

  set isAuthorised(value: boolean) {
    this.isAuthorized$$.next(value);
  }
}
