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
  searchedCourses:CourseInfo[]=[];
  searched:boolean=false;

  readonly emptyListTitle = 'Your List is Empty';
  readonly emptyListText = "Please use 'ADD NEW COURSE' button to add your first course";

  handleShowCourseInfo(courseId:string) {
    this.courseInfo = this.courses.find((course)=>course.id===courseId);
  }
  handleShowCourses():void {
    this.courseInfo = undefined;
  }
  handleSearch(searchData:{searchText:string, searched:boolean}):void {
    this.searchedCourses = this.courses.filter((course)=>course.title.includes(searchData.searchText));
    this.searched = searchData.searched;
  }

}
