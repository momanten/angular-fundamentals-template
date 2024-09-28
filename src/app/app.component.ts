import { Component } from '@angular/core';
import { mockedAuthorsList, mockedCoursesList } from '../assets/mocks/mocks';
import { Course} from './shared/types/course.model';
import { Author } from './shared/types/author.model';
import { MappingService } from './services/mapping.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  courses:Course[] = mockedCoursesList;
  authors:Author[] = mockedAuthorsList;

  title = 'courses-app';
  user = 'Admin';

}
