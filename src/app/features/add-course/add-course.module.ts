import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCourseRoutingModule } from './add-course-routing.module';
import { AddCourseComponent } from './add-course.component';
import { SharedModule } from '@app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [AddCourseComponent],
  imports: [CommonModule, AddCourseRoutingModule, SharedModule, FontAwesomeModule],
})
export class AddCourseModule {}
