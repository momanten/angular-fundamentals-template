import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditCourseRoutingModule } from './edit-course-routing.module';
import { EditCourseComponent } from './edit-course.component';
import { SharedModule } from '@app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    EditCourseComponent
  ],
  imports: [
    CommonModule,
    EditCourseRoutingModule,
    SharedModule,
    FontAwesomeModule
  ]
})
export class EditCourseModule { }
