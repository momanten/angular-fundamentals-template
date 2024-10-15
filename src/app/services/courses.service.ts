import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course, FilterCourse } from '@app/shared/types/course.model';
import { Observable } from 'rxjs';
import {
  AllAuthorsResponse,
  AllCourseResponse,
  AuthorResponse,
  CourseResponse,
  CreateAuthorResponse,
  CreateCourseResponse,
  DeleteCourseResponse,
  EditCourseResponse,
  FilterResponse,
} from './api.models';
import { Author } from '@app/shared/types/author.model';
import {
  AUTHORS_ADD_URL,
  AUTHORS_ALL_URL,
  AUTHORS_URL,
  COURSES_ADD_URL,
  COURSES_ALL_URL,
  COURSES_URL,
  FILTER_URL,
} from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<AllCourseResponse> {
    return this.http.get<AllCourseResponse>(COURSES_ALL_URL);
  }

  createCourse(course: Omit<Course, 'id'>): Observable<CreateCourseResponse> {
    return this.http.post<CreateCourseResponse>(COURSES_ADD_URL, course);
  }

  editCourse(id: string, course: Omit<Course, 'id' | 'creationDate'>): Observable<EditCourseResponse> {
    return this.http.put<EditCourseResponse>(`${COURSES_URL}${id}`, course);
  }

  getCourse(id: string): Observable<CourseResponse> {
    return this.http.get<CourseResponse>(`${COURSES_URL}${id}`);
  }

  deleteCourse(id: string): Observable<DeleteCourseResponse> {
    return this.http.delete<DeleteCourseResponse>(`${COURSES_URL}${id}`);
  }

  filterCourses(filterInfo: FilterCourse): Observable<FilterResponse> {
    let params = new HttpParams();
    if (filterInfo.duration.length > 0) {
      params = params.set('duration', filterInfo.duration.join(','));
    }
    if (filterInfo.creationDate.length > 0) {
      params = params.set('creationDate', filterInfo.creationDate.join(','));
    }
    if (filterInfo.description.length > 0) {
      params = params.set('description', filterInfo.description.join(','));
    }
    if (filterInfo.title.length > 0) {
      params = params.set('title', filterInfo.title.join(','));
    }
    return this.http.get<FilterResponse>(FILTER_URL, {
      params,
    });
  }

  getAllAuthors(): Observable<AllAuthorsResponse> {
    return this.http.get<AllAuthorsResponse>(AUTHORS_ALL_URL);
  }

  createAuthor(authorName: Omit<Author, 'id'>): Observable<CreateAuthorResponse> {
    return this.http.post<CreateAuthorResponse>(AUTHORS_ADD_URL, authorName);
  }

  getAuthorById(id: string): Observable<AuthorResponse> {
    return this.http.get<AuthorResponse>(`${AUTHORS_URL}${id}`);
  }
}
