import { Component, EventEmitter, Input,Output } from '@angular/core';
import { CourseDataType } from '@app/shared/types/course.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {
  @Input() courses!:CourseDataType[];
  @Input() editable:boolean = false;
  @Output() showCourse = new EventEmitter<string>(); 
  @Output() editCourse = new EventEmitter<string>(); 
  @Output() deleteCourse = new EventEmitter<string>();
  
  showCourseInfo(courseId:CourseDataType['id']) {
    this.showCourse.emit(courseId);
  }
  onEdit(courseId:CourseDataType['id']) {
    this.editCourse.emit(courseId);
  }
  onDelete(courseId:CourseDataType['id']) {
    this.deleteCourse.emit(courseId);
  }


}
