import { Component, Input, OnInit } from "@angular/core";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { ButtonTypes } from "@app/shared/types/button.type";
import { CourseInfo } from "@app/shared/types/course.model";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit {
  ButtonTypes = ButtonTypes;

  @Input() courses: CourseInfo[] = [];

  courseInfo: CourseInfo | undefined = undefined;
  filteredCourses: CourseInfo[] = [];
  lastSearchedText = "";
  notFound = false;

  constructor(private courseStore: CoursesStoreService) {}

  ngOnInit() {
    this.filteredCourses = this.courses;
    this.courseStore.getAll();
  }

  readonly emptyListTitle = "Your List is Empty";
  readonly emptyListText =
    "Please use 'ADD NEW COURSE' button to add your first course";

  handleShowCourseInfo(courseId: string) {
    this.courseInfo = this.courses.find(course => course.id === courseId);
  }
  handleShowCourses(): void {
    this.courseInfo = undefined;
  }
  handleSearch(searchText: string): void {
    this.lastSearchedText = searchText;
    if (searchText.length > 0) {
      if (
        this.courses.filter(course => course.title.includes(searchText))
          .length > 0
      ) {
        this.notFound = false;
        this.filteredCourses = this.courses.filter(course =>
          course.title.includes(searchText)
        );
      } else {
        this.notFound = true;
        this.filteredCourses = this.courses;
      }
    } else {
      this.notFound = false;
      this.filteredCourses = this.courses;
    }
  }
}
