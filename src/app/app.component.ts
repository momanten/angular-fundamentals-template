import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { mockedAuthorsList, mockedCoursesList } from '../assets/mocks/mocks';
import { Course, CourseInfo} from './shared/types/course.model';
import { Author } from './shared/types/author.model';
import { MappingService } from './services/mapping.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  mockedCourses:Course[] = mockedCoursesList;
  mockedAuthors:Author[] = mockedAuthorsList;
  courses:CourseInfo[] = this.mapping.createCoursesWithAuthorNames(this.mockedCourses,this.mockedAuthors);
  
  constructor(private mapping:MappingService) {}
  


  title = 'courses-app';
  user = 'Admin';

}
