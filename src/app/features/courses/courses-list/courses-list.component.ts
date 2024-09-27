import { Component, EventEmitter, Input,Output } from '@angular/core';
import { CourseData } from '@app/shared/types/course.model';
import { IconNames } from '@app/shared/types/icons.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {
  IconNames = IconNames;
  @Input() courses!:CourseData[];
  @Input() editable:boolean = false;
  @Output() showCourse = new EventEmitter<string>(); 
  @Output() editCourse = new EventEmitter<string>(); 
  @Output() deleteCourse = new EventEmitter<string>();
  
  showCourseInfo(courseId:string):void {
    this.showCourse.emit(courseId);
  }
  onEdit(courseId:string):void {
    this.editCourse.emit(courseId);
  }
  onDelete(courseId:string):void {
    this.deleteCourse.emit(courseId);
  }


}
