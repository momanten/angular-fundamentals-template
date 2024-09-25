import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { CourseData } from '@app/shared/types/course.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {


  @Input() editable:boolean=false;
  @Input() courseData!:CourseData;
  @Output() clickOnShow = new EventEmitter<boolean>(); 

  showCourseInfo() {
    this.clickOnShow.emit();
  }

}
