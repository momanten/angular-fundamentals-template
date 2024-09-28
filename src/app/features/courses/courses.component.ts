import { Component, Input } from '@angular/core';
import { MappingService } from '@app/services/mapping.service';
import { Author } from '@app/shared/types/author.model';
import { Course, CourseInfo } from '@app/shared/types/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  @Input() courses:Course[]=[];
  @Input() authors:Author[]=[];
  
  courseInfo:CourseInfo|undefined=undefined;

  readonly emptyListTitle = 'Your List is Empty';
  readonly emptyListText = "Please use 'ADD NEW COURSE' button to add your first course";

  constructor (private mappingService:MappingService) {}

  handleShowCourseInfo(courseId:string) {
    const foundCourse = this.courses.find((course)=>course.id===courseId);
    if (foundCourse) {
      this.courseInfo = this.mappingService.createCourseWithAuthorNames(foundCourse, this.authors);
    }
  }

  handleShowCourses():void {
    this.courseInfo = undefined;
  }

}
