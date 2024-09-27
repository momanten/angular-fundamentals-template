import { Component, Input } from '@angular/core';
import { CourseData } from '@app/shared/types/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  @Input() courses:CourseData[]=[];
  showCourseInfo:CourseData|undefined=undefined;

  readonly emptyListTitle = 'Your List is Empty';
  readonly emptyListText = "Please use 'ADD NEW COURSE' button to add your first course";

  handleShowCourseInfo(courseId:CourseData['id']) {
    this.showCourseInfo = this.courses.find((course)=>course.id===courseId);
  }

  handleShowCourses() {
    this.showCourseInfo = undefined;
  }

}
