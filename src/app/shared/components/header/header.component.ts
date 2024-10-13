import { Component, OnInit } from "@angular/core";
import { UserStoreService } from "@app/user/services/user-store.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  constructor(private userService: UserStoreService) {}

  get userName$(): Observable<string> {
    return this.userService.name$;
  }
}
