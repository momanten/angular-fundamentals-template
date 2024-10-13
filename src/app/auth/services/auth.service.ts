import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, of } from "rxjs";
import { SessionStorageService } from "./session-storage.service";
import { APIResult, LoginResponse, LoginUser, LogoutResponse, ResgistrationResponse, User } from "../auth.models";
import { ADMIN_EMAIL, UserStoreService } from "@app/user/services/user-store.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isAuthorized$$ = new BehaviorSubject<boolean>(false);
  public isAuthorized$: Observable<boolean> = this.isAuthorized$$.asObservable();

  constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService,
    private userStore: UserStoreService
  ) {}

  login(user: LoginUser): Observable<APIResult> {
    return this.http.post<LoginResponse>(this.getLoginUrl(), user).pipe(
      map(response => {
        const token = response?.result;
        if (token) {
          this.sessionStorage.setToken(token);
          this.isAuthorized$$.next(true);
          if (response.user.email === ADMIN_EMAIL) {
            this.userStore.isAdmin = true;
            this.userStore.userName = "Admin";
          } else {
            this.userStore.isAdmin = false;
            this.userStore.userName = response.user.name;
          }
          return { result: true, email: user.email };
        } else {
          this.isAuthorized$$.next(false);
          return {
            result: false,
            error: "Token is missing from server",
          };
        }
      }),
      catchError(err => {
        throw "Login failed: " + JSON.stringify(err.error.result);
      })
    );
  }

  logout(): Observable<APIResult> {
    const token = this.sessionStorage.getToken();
    const headers = new HttpHeaders({
      Authorization: `${token}`,
    });
    console.error("logout auth", token, headers);

    return this.http.delete<LogoutResponse>(this.getLogoutUrl(), { headers }).pipe(
      map(() => {
        this.sessionStorage.deleteToken();
        this.isAuthorized$$.next(false);
        this.userStore.userName = "";
        this.userStore.isAdmin = false;
        return {
          result: true,
        };
      }),
      catchError(error => {
        return of({
          result: false,
          error: error?.message || "Unknown error",
        });
      })
    );
  }

  register(user: User): Observable<APIResult> {
    return this.http.post<ResgistrationResponse>(this.getRegistrationUrl(), user).pipe(
      map((response: ResgistrationResponse) => {
        return {
          result: response.successful,
          error: response.errors[0],
        };
      }),
      catchError(error => {
        return of({
          result: false,
          error: error?.message || "Unknown error",
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

  getLoginUrl() {
    return "http://localhost:4000/login";
  }

  getRegistrationUrl() {
    return "http://localhost:4000/register";
  }

  getLogoutUrl() {
    return "http://localhost:4000/logout";
  }
}
