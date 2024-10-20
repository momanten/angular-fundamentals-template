import { Injectable } from '@angular/core';
import { Course, FilterCourse } from '@app/shared/types/course.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CoursesService } from './courses.service';
import {
  AllAuthorsResponse,
  AllCourseResponse,
  AuthorResponse,
  CourseResponse,
  CreateAuthorResponse,
  CreateCourseResponse,
  FilterResponse,
} from './api.models';
import { Author } from '@app/shared/types/author.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesStoreService {
  private courses$$ = new BehaviorSubject<Course[]>([]);
  public courses$ = this.courses$$.asObservable();
  private authors$$ = new BehaviorSubject<Author[]>([]);
  public authors$ = this.authors$$.asObservable();
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoading$$.asObservable();

  constructor(private courseService: CoursesService) {}

  getAll() {
    this.isLoading$$.next(true);
    this.courseService.getAll().subscribe({
      next: (response: AllCourseResponse) => {
        this.courses$$.next(response.result);
        this.isLoading$$.next(false);
      },
      error: err => {
        console.error('Failed to get courses', err);
        this.isLoading$$.next(false);
      },
    });
  }

  createCourse(course: Omit<Course, 'id' | 'creationDate'>) {
    this.isLoading$$.next(true);
    this.courseService.createCourse(course).subscribe({
      next: (response: CreateCourseResponse) => {
        this.courses$$.next([...this.courses$$.value, response.result]);
        this.isLoading$$.next(false);
      },
      error: err => {
        this.isLoading$$.next(false);
        console.error('Failed to add course', err);
      },
    });
  }

  getCourse(id: string): Observable<CourseResponse> {
    this.isLoading$$.next(true);
    return this.courseService.getCourse(id).pipe(
      tap({
        next: () => {
          this.isLoading$$.next(false);
        },
        error: err => {
          console.error('Failed to get course', err);
          this.isLoading$$.next(false);
        },
      })
    );
  }

  editCourse(id: string, course: Omit<Course, 'id' | 'creationDate'>) {
    this.isLoading$$.next(true);
    this.courseService.editCourse(id, course).subscribe({
      next: () => {
        this.courses$$.next(
          this.courses$$.value.map(courseElement => {
            if (courseElement.id === id) return { ...course, id: id, creationDate: courseElement.creationDate };
            else return courseElement;
          })
        );
        this.isLoading$$.next(false);
      },
      error: err => {
        this.isLoading$$.next(false);
        console.error('Failed to edit course', err);
      },
    });
  }

  deleteCourse(id: string) {
    this.isLoading$$.next(true);
    this.courseService.deleteCourse(id).subscribe({
      next: () => {
        this.getAllAuthors();
        this.getAll();
        this.isLoading$$.next(false);
      },
      error: err => {
        this.getAllAuthors();
        this.getAll(); //try to refresh courses as maybe deletion failed because of a paralllel delete
        this.isLoading$$.next(false);
        console.error('Failed to delete course', err);
      },
    });
  }

  filterCourses(filterInfo: FilterCourse): Observable<FilterResponse> {
    this.isLoading$$.next(true);
    return this.courseService.filterCourses(filterInfo).pipe(
      tap({
        next: response => {
          this.isLoading$$.next(false);
          if (response.result.length > 0) {
            this.courses$$.next(response.result);
          }
        },
        error: err => {
          console.error('Failed to get courses', err);
          this.isLoading$$.next(false);
        },
      })
    );
  }

  getAllAuthors() {
    this.isLoading$$.next(true);
    this.courseService.getAllAuthors().subscribe({
      next: (response: AllAuthorsResponse) => {
        this.authors$$.next(response.result);
        this.isLoading$$.next(false);
      },
      error: err => {
        console.error('Failed to get courses', err);
        this.isLoading$$.next(false);
      },
    });
  }

  createAuthor(name: Omit<Author, 'id'>) {
    this.isLoading$$.next(true);
    this.courseService.createAuthor(name).subscribe({
      next: (response: CreateAuthorResponse) => {
        this.authors$$.next([...this.authors$$.value, response.result]);
        this.isLoading$$.next(false);
      },
      error: err => {
        this.isLoading$$.next(false);
        console.error('Failed to add course', err);
      },
    });
  }

  getAuthorById(id: string): Observable<AuthorResponse> {
    this.isLoading$$.next(true);
    return this.courseService.getAuthorById(id).pipe(
      tap({
        next: () => {
          this.isLoading$$.next(false);
        },
        error: err => {
          console.error('Failed to get course', err);
          this.isLoading$$.next(false);
        },
      })
    );
  }
}
