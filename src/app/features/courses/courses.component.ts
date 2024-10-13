import { Component, OnInit } from "@angular/core";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { MappingService } from "@app/services/mapping.service";
import { Author } from "@app/shared/types/author.model";
import { ButtonTypes } from "@app/shared/types/button.type";
import { Course, CourseInfo } from "@app/shared/types/course.model";
import { combineLatest, forkJoin } from "rxjs";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit {
  ButtonTypes = ButtonTypes;

  allCourses: Course[] = [];
  allAuthors: Author[] = [];
  courses: CourseInfo[] = [];

  courseInfo: CourseInfo | undefined = undefined;
  filteredCourses: CourseInfo[] = [];
  lastSearchedText = "";
  notFound = false;

  constructor(
    private coursesStore: CoursesStoreService,
    private mapping: MappingService
  ) {}

  ngOnInit() {
    this.coursesStore.getAll();
    this.coursesStore.getAllAuthors();
    combineLatest([
      this.coursesStore.courses$,
      this.coursesStore.authors$,
    ]).subscribe(([courses, authors]) => {
      console.log(
        "Authors or courses changed",
        this.courses,
        this.allCourses,
        this.allAuthors
      );
      this.allCourses = courses;
      this.allAuthors = authors;
      this.courses = this.mapping.createCoursesWithAuthorNames(
        this.allCourses,
        this.allAuthors
      );
      console.log("My courses", this.courses);
      this.filteredCourses = this.courses;
    });
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
