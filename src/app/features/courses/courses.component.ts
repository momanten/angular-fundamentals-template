import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { MappingService } from "@app/services/mapping.service";
import { Author } from "@app/shared/types/author.model";
import { ButtonTypes } from "@app/shared/types/button.type";
import { Course, CourseInfo } from "@app/shared/types/course.model";
import { UserStoreService } from "@app/user/services/user-store.service";
import { combineLatest, Subscription } from "rxjs";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit, OnDestroy {
  ButtonTypes = ButtonTypes;
  private subscription: Subscription | undefined;

  allCourses: Course[] = [];
  allAuthors: Author[] = [];
  courses: CourseInfo[] = [];
  isAdmin$ = this.userStore.isAdmin$;
  isLoading$ = this.coursesStore.isLoading$;

  courseInfo: CourseInfo | undefined = undefined;
  filteredCourses: CourseInfo[] = [];
  lastSearchedText = "";
  notFound = false;

  constructor(
    private coursesStore: CoursesStoreService,
    private mapping: MappingService,
    private userStore: UserStoreService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription = combineLatest([this.coursesStore.courses$, this.coursesStore.authors$]).subscribe(
      ([courses, authors]) => {
        this.allCourses = courses;
        this.allAuthors = authors;
        this.courses = this.mapping.createCoursesWithAuthorNames(this.allCourses, this.allAuthors);
        this.filteredCourses = this.courses;
      }
    );
  }

  readonly emptyListTitle = "Your List is Empty";
  readonly emptyListText = "Please use 'ADD NEW COURSE' button to add your first course";

  handleShowCourseInfo(courseId: string) {
    this.courseInfo = this.courses.find(course => course.id === courseId);
  }
  handleShowCourses(): void {
    this.courseInfo = undefined;
  }
  handleSearch(searchText: string): void {
    this.lastSearchedText = searchText;
    if (searchText.length > 0) {
      if (this.courses.filter(course => course.title.includes(searchText)).length > 0) {
        this.notFound = false;
        this.filteredCourses = this.courses.filter(course => course.title.includes(searchText));
      } else {
        this.notFound = true;
        this.filteredCourses = this.courses;
      }
    } else {
      this.notFound = false;
      this.filteredCourses = this.courses;
    }
  }

  onAddButtonClick() {
    this.router.navigate(["add"], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
