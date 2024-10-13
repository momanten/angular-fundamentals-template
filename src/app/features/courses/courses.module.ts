import { NgModule } from "@angular/core";
import { CoursesComponent } from "./courses.component";
import { CoursesListComponent } from "./courses-list/courses-list.component";
import { SharedModule } from "@app/shared/shared.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CommonModule } from "@angular/common";
import { CoursesRoutingModule } from "./courses-routing.module";

@NgModule({
  declarations: [CoursesComponent, CoursesListComponent],
  imports: [CommonModule, SharedModule, FontAwesomeModule, CoursesRoutingModule],
  providers: [],
  exports: [CoursesComponent],
})
export class CoursesModule {}
