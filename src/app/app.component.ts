import { Component } from "@angular/core";
import { mockedAuthorsList, mockedCoursesList } from "../assets/mocks/mocks";
import { Course, CourseInfo } from "./shared/types/course.model";
import { Author } from "./shared/types/author.model";
import { MappingService } from "./services/mapping.service";
import { ButtonTypes } from "./shared/types/button.type";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

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
    this.mockedAuthors,
  );

  constructor(
    private mapping: MappingService,
    private library: FaIconLibrary,
  ) {
    this.library.addIconPacks(fas);
  }

  title = "courses-app";
  user = "Admin";
}
