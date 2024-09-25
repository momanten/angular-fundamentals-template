import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { CourseDataType } from '@app/shared/types/course.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {


  @Input() editable:boolean=false;
  @Input() courseData!:CourseDataType;
  @Output() clickOnShow = new EventEmitter<boolean>(); 

  get authorNames():string {
    return this.courseData.authors.map(author => author.name).join(', ');
  }

  get durationInHours():string {
    const hours = Math.floor(this.courseData.duration/60);
    const minutes = this.courseData.duration%60;
    return `${hours}:${minutes} hours`;
  }

  get dateSeparatedWithDots(): string {
    return this.courseData.date.split('/').join('.');
  }

  showCourseInfo() {
    this.clickOnShow.emit();
  }

}
