import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoursesComponent } from "./courses.component";
import { AuthorizedGuard } from "@app/auth/guards/authorized.guard";
import { AdminGuard } from "@app/user/guards/admin.guard";

const routes: Routes = [
  {
    path: "",
    component: CoursesComponent,
    pathMatch: "full",
    canLoad: [AuthorizedGuard],
  },
  {
    path: "add",
    loadChildren: () =>
      import("../add-course/add-course.module").then(m => m.AddCourseModule),
    canLoad: [AuthorizedGuard],
    canActivate: [AdminGuard],
  },
  {
    path: "edit/:id",
    loadChildren: () =>
      import("../edit-course/edit-course.module").then(m => m.EditCourseModule),
    canLoad: [AuthorizedGuard],
    canActivate: [AdminGuard],
  },
  {
    path: ":id",
    loadChildren: () =>
      import("../course-info/course-info.module").then(m => m.CourseInfoModule),
    canLoad: [AuthorizedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
