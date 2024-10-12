import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "@app/auth/services/auth.service";
import { emailValidator } from "@app/shared/directives/email.directive";
import { ButtonTypes } from "@app/shared/types/button.type";
import { IconNames } from "@app/shared/types/icons.model";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"],
})
export class RegistrationFormComponent {
  ButtonTypes = ButtonTypes;
  IconNames = IconNames;

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

  onSubmit() {
    this.submitted = true;
    this.authService
      .register({
        name: this.name?.value || "",
        email: this.email?.value || "",
        password: this.password?.value || "",
      })
      .subscribe(result => console.log("Registration", result));
  }
}
