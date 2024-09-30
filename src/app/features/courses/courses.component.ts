import { Component, Input } from '@angular/core';
import { Author } from '@app/shared/types/author.model';
import { Course } from '@app/shared/types/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  @Input() courses:Course[]=[];
  @Input() authors:Author[]=[];
  
  courseInfo: Course | undefined = undefined;

  readonly emptyListTitle = 'Your List is Empty';
  readonly emptyListText = "Please use 'ADD NEW COURSE' button to add your first course";

  constructor () {}

  handleShowCourseInfo(courseId:string) {
    this.courseInfo = this.courses.find((course: Course) => course.id === courseId);
  }

  handleShowCourses():void {
    this.courseInfo = undefined;
  }

}
