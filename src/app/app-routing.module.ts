import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    loadChildren: () =>
      import("./features/login/login.module").then(m => m.LoginModule),
  },
  {
    path: "registration",
    loadChildren: () =>
      import("./features/registration/registration.module").then(
        m => m.RegistrationModule
      ),
  },
  {
    path: "courses",
    loadChildren: () =>
      import("./features/courses/courses.module").then(m => m.CoursesModule),
  },
  {
    path: "**",
    redirectTo: "login",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
