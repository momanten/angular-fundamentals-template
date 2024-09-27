import { NgModule } from "@angular/core";
import { CoursesComponent } from "./courses.component";
import { CoursesListComponent } from "./courses-list/courses-list.component";
import { SharedModule } from "@app/shared/shared.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { BrowserModule } from "@angular/platform-browser";
import { CourseInfoComponent } from "../course-info/course-info.component";
import { CourseInfoModule } from "../course-info/course-info.module";

@NgModule({
  declarations: [CoursesComponent, CoursesListComponent],
  imports: [
    BrowserModule,
    SharedModule,
    FontAwesomeModule,
    CourseInfoModule
  ],
  providers: [],
  exports: [CoursesComponent],
})
export class CoursesModule {}