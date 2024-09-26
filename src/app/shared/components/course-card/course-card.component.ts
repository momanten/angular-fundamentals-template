import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UtilityService } from '@app/services/utility.service';
import type { CourseDataType } from '@app/shared/types/course.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {


  @Input() editable:boolean=false;
  @Input() courseData!:CourseDataType;
  @Output() clickOnShow = new EventEmitter<string>(); 

  constructor(private utilityService: UtilityService) {}

  get authorNames():string {
    return this.utilityService.authorsToString(this.courseData.authors);
  }
  get durationInHours():string {
    return this.utilityService.durationInHoursString(this.courseData.duration);
  }
  get dateSeparatedWithDots(): string {
    return this.utilityService.formatDateWithDots(this.courseData.date);
  }

  showCourseInfo() {
    this.clickOnShow.emit(this.courseData.id);
    console.log('Clicked in course Card')
  }

}
