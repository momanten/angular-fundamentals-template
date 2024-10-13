import { Component, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "@app/auth/services/auth.service";
import { emailValidator } from "@app/shared/directives/email.directive";
import { ButtonTypes } from "@app/shared/types/button.type";
import { IconNames } from "@app/shared/types/icons.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"],
})
export class RegistrationFormComponent implements OnDestroy {
  ButtonTypes = ButtonTypes;
  IconNames = IconNames;
  private subscription: Subscription | undefined;

  constructor(private authService: AuthService) {}

  // Use the names `name`, `email`, `password` for the form controls.
  registrationForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(6)]),
    email: new FormControl("", [Validators.required, emailValidator()]),
    password: new FormControl("", [Validators.required]),
  });
  submitted = false;

  get name() {
    return this.registrationForm.get("name");
  }
  get email() {
    return this.registrationForm.get("email");
  }
  get password() {
    return this.registrationForm.get("password");
  }

  onSubmit(): void {
    this.submitted = true;
    this.subscription = this.authService
      .register({
        name: this.name?.value || "",
        email: this.email?.value || "",
        password: this.password?.value || "",
      })
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
