import { Component } from '@angular/core';
import { mockedAuthorsList, mockedCoursesList } from '../assets/mocks/mocks';
import { CourseData, MockCourseData } from './shared/types/course.model';
import { Author } from './shared/types/author.model';
import { MappingService } from './services/mapping.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private readonly courses:MockCourseData[] = mockedCoursesList;
  private readonly authors:Author[] = mockedAuthorsList;
  coursesWithAuthorNames:CourseData[] = this.mappingService.createCoursesWithAuthorNames(this.courses,this.authors);
  title = 'courses-app';
  user = 'Admin';

  constructor(private mappingService: MappingService) {}
}
