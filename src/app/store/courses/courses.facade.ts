import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as CoursesSelectors from './courses.selectors'; // Import your selectors
import * as CoursesActions from './courses.actions'; // Import your actions
import { Observable } from 'rxjs';
import { Course } from '@app/shared/types/course.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesStateFacade {
  constructor(private store: Store) {}

  isAllCoursesLoading$: Observable<boolean> = this.store.select(CoursesSelectors.isAllCoursesLoadingSelector);

  isSingleCourseLoading$: Observable<boolean> = this.store.select(CoursesSelectors.isSingleCourseLoadingSelector);

  isSearchingState$: Observable<boolean> = this.store.select(CoursesSelectors.isSearchingStateSelector);

  courses$: Observable<Course[]> = this.store.select(CoursesSelectors.getCourses);

  allCourses$: Observable<Course[]> = this.store.select(CoursesSelectors.getAllCourses);

  course$: Observable<Course | null> = this.store.select(CoursesSelectors.getCourse);

  errorMessage$: Observable<string | null> = this.store.select(CoursesSelectors.getErrorMessage);

  getAllCourses(): void {
    this.store.dispatch(CoursesActions.requestAllCourses());
  }

  getSingleCourse(id: string): void {
    this.store.dispatch(CoursesActions.requestSingleCourse({ id }));
  }

  getFilteredCourses(searchText: string): void {
    this.store.dispatch(CoursesActions.requestFilteredCourses({ title: searchText }));
  }

  editCourse(course: Omit<Course, 'creationDate'>): void {
    this.store.dispatch(CoursesActions.requestEditCourse({ course }));
  }

  createCourse(course: Omit<Course, 'id' | 'creationDate'>): void {
    this.store.dispatch(CoursesActions.requestCreateCourse({ course }));
  }

  deleteCourse(id: string): void {
    this.store.dispatch(CoursesActions.requestDeleteCourse({ id }));
  }
}
