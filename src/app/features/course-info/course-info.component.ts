import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { MappingService } from '@app/services/mapping.service';
import { ButtonTypes } from '@app/shared/types/button.type';
import { CourseInfo } from '@app/shared/types/course.model';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';
import { combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss'],
})
export class CourseInfoComponent implements OnInit, OnDestroy {
  ButtonTypes = ButtonTypes;
  course: CourseInfo | undefined = {} as CourseInfo;
  private subscription: Subscription | undefined;

  constructor(
    private router: Router,
    private coursesStore: CoursesStoreService,
    private mapping: MappingService,
    private coursesFacade: CoursesStateFacade
  ) {}

  ngOnInit() {
    this.subscription = combineLatest([
      this.coursesFacade.course$,
      this.coursesFacade.isSingleCourseLoading$,
      this.coursesStore.authors$,
    ]).subscribe(([course, loading, authors]) => {
      if (course) {
        this.course = this.mapping.createCourseWithAuthorNames(course, authors);
      }
    });
  }

  get loading$() {
    return this.coursesFacade.isSingleCourseLoading$;
  }

  handleBackToCourses() {
    this.router.navigate(['../']);
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
