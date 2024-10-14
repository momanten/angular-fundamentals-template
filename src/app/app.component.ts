import { Component, OnDestroy, OnInit } from "@angular/core";
import { ButtonTypes } from "./shared/types/button.type";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { AuthService } from "./auth/services/auth.service";
import { Router } from "@angular/router";
import { UserStoreService } from "./user/services/user-store.service";
import { SessionStorageService } from "./auth/services/session-storage.service";
import { CoursesStoreService } from "./services/courses-store.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  ButtonTypes = ButtonTypes;
  private subscription: Subscription | undefined;

  constructor(
    private library: FaIconLibrary,
    private authService: AuthService,
    private router: Router,
    private userService: UserStoreService,
    private token: SessionStorageService,
    private coursesStore: CoursesStoreService
  ) {
    this.library.addIconPacks(fas);
  }

  ngOnInit() {
    this.userService.getUser();
    this.coursesStore.getAll();
    this.coursesStore.getAllAuthors();
    if (this.token.getToken()) this.authService.isAuthorised = true;
  }

  onLogout = () => {
    this.subscription = this.authService.logout().subscribe({
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
    return this.authService.isAuthorised;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
