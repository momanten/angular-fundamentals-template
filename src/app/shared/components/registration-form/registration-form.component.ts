import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '@app/shared/directives/email.directive';
import { faEye, faEyeSlash, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  // Use the names `name`, `email`, `password` for the form controls.
  registrationForm = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.minLength(6)]),
    email: new FormControl('',[Validators.required,emailValidator()]),
    password: new FormControl('',[Validators.required]),
  });
  submitted:boolean = false;
  visible:IconDefinition=faEye;
  hidden:IconDefinition=faEyeSlash;


  get name() {
    return this.registrationForm.get('name');
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get password() {
    return this.registrationForm.get('password');
  }

  onSubmit() {
    this.submitted=true;
  }
}
