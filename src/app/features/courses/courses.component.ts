import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { MappingService } from '@app/services/mapping.service';
import { Author } from '@app/shared/types/author.model';
import { ButtonTypes } from '@app/shared/types/button.type';
import { Course, CourseInfo } from '@app/shared/types/course.model';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';
import { UserStoreService } from '@app/user/services/user-store.service';
import { combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit, OnDestroy {
  @ViewChild('noCourse') noCourseSpan!: ElementRef;

  ButtonTypes = ButtonTypes;
  private subscription: Subscription | undefined;

  allCourses: Course[] = [];
  allAuthors: Author[] = [];
  courses: CourseInfo[] = [];
  isAdmin$ = this.userStore.isAdmin$;
  isLoading$ = this.coursesStore.isLoading$ || this.coursesFacade.isAllCoursesLoading$;
  searching = false;
  filteredCourses: Course[] = [];

  courseInfo: CourseInfo | undefined = undefined;
  lastSearchedText = '';
  notFound = false;
  showInfo = '';

  constructor(
    private coursesStore: CoursesStoreService,
    private mapping: MappingService,
    private userStore: UserStoreService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private coursesFacade: CoursesStateFacade
  ) {}

  ngOnInit() {
    if (this.authService.isAuthorised) {
      this.coursesFacade.getAllCourses();
      this.coursesStore.getAllAuthors();
    } // else navigate to login but it is done by authGuard
    this.subscription = combineLatest([
      this.coursesFacade.allCourses$,
      this.coursesFacade.courses$,
      this.coursesFacade.isSearchingState$,
      this.coursesStore.authors$,
    ]).subscribe(([courses, filteredCourses, isSearching, authors]) => {
      this.allCourses = courses;
      this.allAuthors = authors;
      this.searching = isSearching;
      this.filteredCourses = filteredCourses;
      if (this.searching && this.filteredCourses.length > 0) {
        this.courses = this.mapping.createCoursesWithAuthorNames(this.filteredCourses, this.allAuthors);
        this.showInfo = '';
      } else if (this.searching && this.filteredCourses.length <= 0) {
        this.courses = this.mapping.createCoursesWithAuthorNames(this.allCourses, this.allAuthors);
        this.showInfo = this.noCourseText;
        this.triggerAnimation();
      } else {
        this.courses = this.mapping.createCoursesWithAuthorNames(this.allCourses, this.allAuthors);
        this.showInfo = '';
      }
    });
  }

  readonly noCourseText = 'No Course found. All courses are shown';
  readonly emptyListTitle = 'Your List is Empty';
  readonly emptyListText = "Please use 'ADD NEW COURSE' button to add your first course";

  triggerAnimation() {
    console.log('Triggered', this.noCourseSpan);
    if (this.noCourseSpan) {
      console.log('Triggered inside', this.noCourseSpan.nativeElement);
      const element = this.noCourseSpan.nativeElement;
      element.classList.remove('animate');
      setTimeout(() => {
        element.classList.add('animate');
      }, 10);
    }
  }
  handleShowCourseInfo(courseId: string) {
    this.courseInfo = this.courses.find(course => course.id === courseId);
  }
  handleShowCourses(): void {
    this.courseInfo = undefined;
  }
  onAddButtonClick() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
