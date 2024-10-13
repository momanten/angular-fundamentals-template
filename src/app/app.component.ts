import { Component, OnInit } from "@angular/core";
import { ButtonTypes } from "./shared/types/button.type";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { AuthService } from "./auth/services/auth.service";
import { Router } from "@angular/router";
import { UserStoreService } from "./user/services/user-store.service";
import { SessionStorageService } from "./auth/services/session-storage.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  ButtonTypes = ButtonTypes;

  constructor(
    private library: FaIconLibrary,
    private authService: AuthService,
    private router: Router,
    private userService: UserStoreService,
    private token: SessionStorageService
  ) {
    this.library.addIconPacks(fas);
    console.log("isAuth app", this.authService.isAuthorised);
  }

  ngOnInit() {
    this.userService.getUser();
    if (this.token.getToken()) this.authService.isAuthorised = true;
  }

  onLogout = () => {
    this.authService.logout().subscribe({
      next: result => {
        console.log(result);
      },
      error: err => {
        alert(`Logout failed on server ${JSON.stringify(err)}`);
      },
    });
  };
  onLogin() {
    this.router.navigate(["/login"], {
      replaceUrl: true,
    });
  }

  isAuth() {
    console.log("isAuth at app", this.authService.isAuthorised);
    return this.authService.isAuthorised;
  }
}
