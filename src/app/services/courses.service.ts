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
    filterInfo.duration.forEach(duration => {
      params = params.append('duration', duration);
    });
    filterInfo.creationDate.forEach(date => {
      params = params.append('creationDate', date);
    });
    filterInfo.description.forEach(desc => {
      params = params.append('description', desc);
    });
    filterInfo.title.forEach(title => {
      params = params.append('title', title);
    });

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
