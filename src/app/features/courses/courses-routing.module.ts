import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoursesComponent } from "./courses.component";
import { AuthorizedGuard } from "@app/auth/guards/authorized.guard";

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
  },
  {
    path: "edit/:id",
    loadChildren: () =>
      import("../edit-course/edit-course.module").then(m => m.EditCourseModule),
    canLoad: [AuthorizedGuard],
  },
  {
    path: ":id",
    loadChildren: () =>
      import("../course-info/course-info.module").then(m => m.CourseInfoModule),
    canLoad: [AuthorizedGuard],
  },
  /*   { path: 'edit/:id', loadChildren: () => import('../edit-course/edit-course.module').then(m => m.EditCourseModule) },
  { path: ':id', loadChildren: () => import('../course-info/course-info.module').then(m => m.CourseInfoModule) } */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
