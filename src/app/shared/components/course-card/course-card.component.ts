import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { ButtonTypes } from '@app/shared/types/button.type';
import type { CourseInfo } from '@app/shared/types/course.model';
import { IconNames } from '@app/shared/types/icons.model';
import { UserStoreService } from '@app/user/services/user-store.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent {
  ButtonTypes = ButtonTypes;
  IconNames = IconNames;

  @Input() courseInfo!: CourseInfo;
  isAdmin$ = this.userStore.isAdmin$;

  constructor(
    private userStore: UserStoreService,
    private router: Router,
    private courseStore: CoursesStoreService
  ) {}

  showCourseInfo() {
    this.router.navigate([`/courses/${this.courseInfo.id}`]);
  }
  editCourse() {
    this.router.navigate([`/courses/edit/${this.courseInfo.id}`]);
  }
  deleteCourse() {
    this.courseStore.deleteCourse(this.courseInfo.id);
  }
}
