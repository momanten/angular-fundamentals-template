import { Component, Input } from '@angular/core';
import { CourseInfo } from '@app/shared/types/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  @Input() courses:CourseInfo[]=[];
  
  courseInfo:CourseInfo|undefined=undefined;

  readonly emptyListTitle = 'Your List is Empty';
  readonly emptyListText = "Please use 'ADD NEW COURSE' button to add your first course";

  handleShowCourseInfo(courseId:string) {
    this.courseInfo = this.courses.find((course)=>course.id===courseId);
  }

  handleShowCourses():void {
    this.courseInfo = undefined;
  }

}
