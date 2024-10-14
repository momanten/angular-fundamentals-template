import { NgModule } from '@angular/core';
import { CourseInfoComponent } from './course-info.component';
import { SharedModule } from '@app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { CourseInfoRoutingModule } from './course-info-routing.module';

@NgModule({
  declarations: [CourseInfoComponent],
  imports: [CommonModule, SharedModule, CourseInfoRoutingModule],
  providers: [],
  exports: [CourseInfoComponent],
})
export class CourseInfoModule {}
