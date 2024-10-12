import { Component } from "@angular/core";
import { mockedAuthorsList, mockedCoursesList } from "../assets/mocks/mocks";
import { Course, CourseInfo } from "./shared/types/course.model";
import { Author } from "./shared/types/author.model";
import { MappingService } from "./services/mapping.service";
import { ButtonTypes } from "./shared/types/button.type";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { AuthService } from "./auth/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  ButtonTypes = ButtonTypes;

  mockedCourses: Course[] = mockedCoursesList;
  mockedAuthors: Author[] = mockedAuthorsList;
  courses: CourseInfo[] = this.mapping.createCoursesWithAuthorNames(
    this.mockedCourses,
    this.mockedAuthors
  );

  onLogout = () => {
    this.authService.logout().subscribe({
      next: result => {
        console.log(result);
      },
      error: err => {
        alert(`Logout failed on server ${JSON.stringify(err)}`);
      },
    });
  };
  onLogin() {
    this.router.navigate(["/login"], {
      replaceUrl: true,
    });
  }

  isAuth() {
    return this.authService.isAuthorised;
  }

  constructor(
    private mapping: MappingService,
    private library: FaIconLibrary,
    private authService: AuthService,
    private router: Router
  ) {
    this.library.addIconPacks(fas);
    console.log("isAuth app", this.authService.isAuthorised);
  }

  title = "courses-app";
  user = "Admin";
}
