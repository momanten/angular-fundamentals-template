import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Course, FilterCourse } from "@app/shared/types/course.model";
import { Observable } from "rxjs";
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
} from "./api.models";
import { Author } from "@app/shared/types/author.model";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<AllCourseResponse> {
    return this.http.get<AllCourseResponse>("http://localhost:4000/courses/all");
  }

  createCourse(course: Omit<Course, "id">): Observable<CreateCourseResponse> {
    return this.http.post<CreateCourseResponse>("http://localhost:4000/courses/add", course);
  }

  editCourse(id: string, course: Omit<Course, "id" | "creationDate">): Observable<EditCourseResponse> {
    return this.http.put<EditCourseResponse>(`http://localhost:4000/courses/${id}`, course);
  }

  getCourse(id: string): Observable<CourseResponse> {
    return this.http.get<CourseResponse>(`http://localhost:4000/courses/${id}`);
  }

  deleteCourse(id: string): Observable<DeleteCourseResponse> {
    return this.http.delete<DeleteCourseResponse>(`http://localhost:4000/courses/${id}`);
  }

  filterCourses(filterInfo: FilterCourse): Observable<FilterResponse> {
    let params = new HttpParams();
    filterInfo.duration.forEach(duration => {
      params = params.append("duration", duration);
    });
    filterInfo.creationDate.forEach(date => {
      params = params.append("creationDate", date);
    });
    filterInfo.description.forEach(desc => {
      params = params.append("description", desc);
    });
    filterInfo.title.forEach(title => {
      params = params.append("title", title);
    });

    return this.http.get<FilterResponse>("http://localhost:4000/courses/filter", {
      params,
    });
  }

  getAllAuthors(): Observable<AllAuthorsResponse> {
    return this.http.get<AllAuthorsResponse>("http://localhost:4000/authors/all");
  }

  createAuthor(authorName: Omit<Author, "id">): Observable<CreateAuthorResponse> {
    return this.http.post<CreateAuthorResponse>("http://localhost:4000/authors/add", authorName);
  }

  getAuthorById(id: string): Observable<AuthorResponse> {
    return this.http.get<AuthorResponse>(`http://localhost:4000/authors/${id}`);
  }
}
