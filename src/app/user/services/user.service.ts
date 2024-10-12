import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserResponse } from "@app/services/api.models";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<UserResponse> {
    return this.http.get<UserResponse>("http://localhost:4000/users/me");
  }
}
