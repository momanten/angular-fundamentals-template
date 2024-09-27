import { Injectable } from '@angular/core';
import { Author } from '@app/shared/types/author.model';
import { CourseData, MockCourseData } from '@app/shared/types/course.model';

@Injectable({
  providedIn: 'root'
})
export class MappingService {
  
  createCoursesWithAuthorNames(courses:MockCourseData[], authors:Author[]):CourseData[] {
    if (courses.length > 0) { 
      return courses.map(course => ({
        id: course.id,
        title: course.title,
        description: course.description,
        date: course.creationDate, // 'creationDate' to 'date'
        duration: course.duration,
        authors: course.authors.map(authorId => {
          const author = authors.find(a => a.id === authorId);
          return author ? { id: author.id, name: author.name } : { id: authorId, name: 'Unknown' };
        })
      })) 
    }
    else return [];
  }

}