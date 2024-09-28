import { Component, EventEmitter, Input,Output, SimpleChange, SimpleChanges } from '@angular/core';
import { MappingService } from '@app/services/mapping.service';
import { Author } from '@app/shared/types/author.model';
import { Course, CourseInfo } from '@app/shared/types/course.model';
import { IconNames } from '@app/shared/types/icons.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {
  IconNames = IconNames;
  @Input() courses!:Course[];
  @Input() authors!:Author[];
  @Input() editable:boolean = false;
  @Output() showCourse = new EventEmitter<string>(); 
  @Output() editCourse = new EventEmitter<string>(); 
  @Output() deleteCourse = new EventEmitter<string>();
  coursesWithAuthorNames:CourseInfo[] = []; //holds the author names too

  constructor(private mappingService:MappingService) {}

  ngOnChanges(changes:SimpleChanges) {
    if (changes['courses'] || changes['authors']) {
      this.coursesWithAuthorNames=this.mappingService.createCoursesWithAuthorNames(this.courses,this.authors)
    }
  }

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
