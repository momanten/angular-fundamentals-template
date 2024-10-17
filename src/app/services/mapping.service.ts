import { Injectable } from '@angular/core';
import { Author } from '@app/shared/types/author.model';
import { Course, CourseInfo } from '@app/shared/types/course.model';

@Injectable({
  providedIn: 'root',
})
export class MappingService {
  createCoursesWithAuthorNames(courses: Course[], authors: Author[]): CourseInfo[] {
    if (courses.length > 0) {
      return courses.map(course => ({
        id: course.id,
        title: course.title,
        description: course.description,
        date: course.creationDate || '',
        duration: course.duration,
        authors: course.authors.map(authorId => {
          const author = authors.find(author => author.id === authorId);
          return author ? { id: author.id, name: author.name } : { id: authorId, name: 'Unknown' };
        }),
      }));
    } else return [];
  }

  createCourseWithAuthorNames(course: Course, authors: Author[]): CourseInfo | undefined {
    if (course) {
      return {
        id: course.id,
        title: course.title,
        description: course.description,
        date: course.creationDate || '', // 'creationDate' to 'date'
        duration: course.duration,
        authors: course.authors.map(authorId => {
          const author = authors.find(author => author.id === authorId);
          return author ? { id: author.id, name: author.name } : { id: authorId, name: 'Unknown' };
        }),
      };
    } else return undefined;
  }
}
