import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UtilityService } from '@app/services/utility.service';
import { Course } from '@app/shared/types/course.model';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {
  // Use the names for the input `course`.
  @Input() course!: Course;
  @Output() showCourseList = new EventEmitter();

  constructor(private utilityService: UtilityService) {}

  get authorNames():string {
    return this.utilityService.authorsToString(this.course.authors);
  }
  get durationInHours():string {
    return this.utilityService.durationInHoursString(this.course.duration);
  }
  get dateSeparatedWithDots(): string {
    return this.utilityService.formatDateWithDots(this.course.creationDate);
  }

  handleBackToCourses() {
    this.showCourseList.emit();
  }

}
