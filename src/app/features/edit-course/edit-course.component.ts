import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { MappingService } from '@app/services/mapping.service';
import { CourseInfo } from '@app/shared/types/course.model';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';
import { combineLatest, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css'],
})
export class EditCourseComponent implements OnInit, OnDestroy {
  courseToUpdate: CourseInfo | undefined;
  private subscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private coursesStore: CoursesStoreService,
    private mapping: MappingService,
    private coursesFacade: CoursesStateFacade
  ) {}

  ngOnInit() {
    this.subscription = combineLatest([
      this.route.paramMap.pipe(take(1)),
      this.coursesFacade.allCourses$.pipe(take(1)),
      this.coursesStore.authors$.pipe(take(1)),
    ]).subscribe(([params, courses, authors]) => {
      const courseId = params.get('id') || undefined;

      if (courseId) {
        const course = courses.find(course => course.id === courseId);
        if (course) {
          this.courseToUpdate = this.mapping.createCourseWithAuthorNames(course, authors);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
