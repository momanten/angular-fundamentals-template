import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { MappingService } from '@app/services/mapping.service';
import { ButtonTypes } from '@app/shared/types/button.type';
import { CourseInfo } from '@app/shared/types/course.model';
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
    private route: ActivatedRoute,
    private mapping: MappingService
  ) {}

  ngOnInit() {
    this.subscription = combineLatest([
      this.coursesStore.courses$,
      this.coursesStore.authors$,
      this.route.paramMap,
    ]).subscribe(([courses, authors, params]) => {
      const courseId = params.get('id') || undefined;
      const course = courses.find(course => course.id === courseId);
      if (courseId && course) {
        this.course = this.mapping.createCourseWithAuthorNames(course, authors);
      }
    });
  }

  handleBackToCourses() {
    this.router.navigate(['../']);
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
