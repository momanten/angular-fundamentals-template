import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalComponent } from './components/modal/modal.component';
import {
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  SearchComponent,
  CourseCardComponent,
  LoginFormComponent,
  RegistrationFormComponent,
  CourseFormComponent
} from "./components";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DurationPipe } from './pipes/duration.pipe';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { EmailValidatorDirective } from '@shared/directives/email.directive';
import { JoinifyPipe } from './pipes/joinify.pipe';
import { HideableDirective } from './directives/hideable.directive';
import { IconComponent } from './components/icon/icon.component';

const components = [
  HeaderComponent,
  ButtonComponent,
  IconComponent,
  InfoComponent,
  SearchComponent,
  ModalComponent,
  CourseCardComponent,
  LoginFormComponent,
  RegistrationFormComponent,
  CourseFormComponent,
  DurationPipe,
  CustomDatePipe,
  JoinifyPipe,
  EmailValidatorDirective,
  HideableDirective
];

@NgModule({
  declarations: [components],
  imports: [
    FontAwesomeModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [components]
})
export class SharedModule { }
