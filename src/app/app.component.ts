import { Component } from '@angular/core';
import { mockedAuthorsList, mockedCoursesList } from './shared/mocks/mock';
import { AuthorType, CourseDataType, MockCourseDataType } from './shared/types/course.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'courses-app';
  user = 'Admin';

  /* courses:MockCourseDataType[] = []; */
  courses:MockCourseDataType[] = mockedCoursesList;
  authors:AuthorType[] = mockedAuthorsList;
  coursesWithAuthorNames:CourseDataType[] = this.courses.length > 0 ? 
    this.courses.map(course => ({
      id: course.id,
      title: course.title,
      description: course.description,
      date: course.creationDate, // Change 'creationDate' to 'date'
      duration: course.duration,
      authors: course.authors.map(authorId => {
        const author = this.authors.find(a => a.id === authorId);
        return author ? { id: author.id, name: author.name } : { id: authorId, name: 'Unknown' };
      })
    })) 
    : [];

/*   ngOnInit() {
    console.log('Course List with Author Names:', this.courseListWithAuthorNames);
  } */

}
