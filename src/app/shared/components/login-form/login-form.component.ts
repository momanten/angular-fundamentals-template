import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "@app/auth/services/auth.service";
import { ButtonTypes } from "@app/shared/types/button.type";
import { IconNames } from "@app/shared/types/icons.model";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
  ButtonTypes = ButtonTypes;
  IconNames = IconNames;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  @ViewChild("loginForm") public loginForm!: NgForm;

  //Use the names `email` and `password` for form controls.
  email = "";
  password = "";
  submitted = "false";

  onSubmit() {
    this.authService
      .login({ email: this.email, password: this.password })
      .subscribe({
        next: result => {
          console.log(result);
          this.router.navigate(["/courses"]);
        },
        error: err => {
          alert(`Login failed ${JSON.stringify(err)}`);
        },
      });
  }
}
