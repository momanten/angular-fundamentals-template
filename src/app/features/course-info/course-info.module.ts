import { NgModule } from "@angular/core";
import { CourseInfoComponent } from "./course-info.component";
import { SharedModule } from "@app/shared/shared.module";

@NgModule({
  declarations: [CourseInfoComponent],
  imports: [SharedModule],
  providers: [],
  exports: [CourseInfoComponent],
})
export class CourseInfoModule {}
