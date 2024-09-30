import { Component } from '@angular/core';
import { mockedCoursesList } from '../assets/mocks/mocks';
import { Course} from './shared/types/course.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  courses: Course[] = mockedCoursesList;

  title = 'courses-app';
  user = 'Admin';

}
