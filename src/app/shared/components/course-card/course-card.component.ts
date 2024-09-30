import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UtilityService } from '@app/services/utility.service';
import { Course } from '@app/shared/types/course.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {


  @Input() editable:boolean=false;
  @Input() courseInfo!: Course;
  @Output() clickOnShow = new EventEmitter<string>(); 

  constructor(private utilityService: UtilityService) {}

  get authorNames():string {
    return this.utilityService.authorsToString(this.courseInfo.authors);
  }
  get durationInHours():string {
    return this.utilityService.durationInHoursString(this.courseInfo.duration);
  }
  get dateSeparatedWithDots(): string {
    return this.utilityService.formatDateWithDots(this.courseInfo.creationDate);
  }

  showCourseInfo() {
    this.clickOnShow.emit(this.courseInfo.id);
    console.log('Clicked in course Card')
  }

}
