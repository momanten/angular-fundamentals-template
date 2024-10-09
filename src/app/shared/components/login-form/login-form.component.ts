import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
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

  @ViewChild("loginForm") public loginForm!: NgForm;
  //Use the names `email` and `password` for form controls.
  email = "";
  password = "";
  submitted = "false";

  onSubmit() {
    return undefined;
  }
}
