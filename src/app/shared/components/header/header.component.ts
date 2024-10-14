import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserStoreService } from "@app/user/services/user-store.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  isMainPage = false; // show login logout just on the main page
  constructor(
    private userService: UserStoreService,
    private router: Router
  ) {}

  ngOnInit() {
    // Subscribe to the router events to check the current URL
    this.router.events.subscribe(() => {
      this.isMainPage = this.router.url === "/courses";
    });
  }

  get userName$(): Observable<string> {
    return this.userService.name$;
  }
}
