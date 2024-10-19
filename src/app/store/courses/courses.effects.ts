import { Injectable } from '@angular/core';
import { CoursesService } from '@app/services/courses.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CoursesConstants } from './courses.constants';
import { catchError, exhaustMap, map, of, tap, withLatestFrom } from 'rxjs';
import { CoursesStateFacade } from './courses.facade';
import { Course } from '@app/shared/types/course.model';
import { Router } from '@angular/router';

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private coursesFacade: CoursesStateFacade,
    private router: Router
  ) {}
  // Add your code here
  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesConstants.REQUEST_ALL_COURSES),
      exhaustMap(() =>
        this.coursesService.getAll().pipe(
          tap(courses => console.log('Courses retrieved in effect:', courses)), // Log the retrieved courses
          map(courses => ({
            type: CoursesConstants.REQUEST_ALL_COURSES_SUCCESS,
            courses: courses.result,
          })),
          tap(resultAction => console.log('Dispatched Action after getAll:', resultAction)),
          catchError((error: Error) => of({ type: CoursesConstants.REQUEST_ALL_COURSES_FAIL, error: error.message }))
        )
      )
    )
  );

  filteredCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesConstants.REQUEST_FILTERED_COURSES),
      withLatestFrom(this.coursesFacade.allCourses$),
      exhaustMap(([action, allCourses]) => {
        const { searchText } = action;
        const filteredCourses = allCourses.filter(course => course.title.includes(searchText));
        return of({
          type: CoursesConstants.REQUEST_FILTERED_COURSES_SUCCESS,
          courses: filteredCourses,
        });
      }),
      catchError((error: Error) =>
        of({
          type: CoursesConstants.REQUEST_FILTERED_COURSES_FAIL,
          error: error.message,
        })
      )
    )
  );

  getSpecificCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesConstants.REQUEST_SINGLE_COURSE),
      exhaustMap(action => {
        const { id } = action;
        return this.coursesService.getCourse(id).pipe(
          tap(course => console.log('Single Course retrieved in effect:', course)), // Log the retrieved courses
          map(response => ({
            type: CoursesConstants.REQUEST_SINGLE_COURSE_SUCCESS,
            course: response.result,
          })),
          catchError((error: Error) =>
            of({
              type: CoursesConstants.REQUEST_SINGLE_COURSE_FAIL,
              error: error.message,
            })
          )
        );
      })
    )
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesConstants.REQUEST_DELETE_COURSE),
      exhaustMap(action => {
        const { id } = action;
        return this.coursesService.deleteCourse(id).pipe(
          tap(response => console.log('Delete Course retrieved in effect:', id, response)), // Log the retrieved courses
          map(() => ({
            type: CoursesConstants.REQUEST_DELETE_COURSE_SUCCESS,
            id: id,
          })),
          catchError((error: Error) =>
            of({
              type: CoursesConstants.REQUEST_DELETE_COURSE_FAIL,
              error: error.message,
            })
          )
        );
      })
    )
  );

  editCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesConstants.REQUEST_EDIT_COURSE),
      exhaustMap((action: { course: Omit<Course, 'creationDate'> }) => {
        const { course } = action;
        return this.coursesService
          .editCourse(course.id, {
            title: course.title,
            description: course.description,
            duration: course.duration,
            authors: course.authors,
          })
          .pipe(
            map(course => ({
              type: CoursesConstants.REQUEST_EDIT_COURSE_SUCCESS,
              course: course,
            })),
            catchError((error: Error) =>
              of({
                type: CoursesConstants.REQUEST_EDIT_COURSE_FAIL,
                error: error.message,
              })
            )
          );
      })
    )
  );

  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesConstants.REQUEST_CREATE_COURSE),
      exhaustMap((action: { course: Omit<Course, 'id' | 'creationDate'> }) => {
        const { course } = action;
        return this.coursesService.createCourse(course).pipe(
          map(course => ({
            type: CoursesConstants.REQUEST_CREATE_COURSE_SUCCESS,
            course: course,
          })),
          catchError((error: Error) =>
            of({
              type: CoursesConstants.REQUEST_CREATE_COURSE_FAIL,
              error: error.message,
            })
          )
        );
      })
    )
  );

  redirectToTheCoursesPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CoursesConstants.REQUEST_CREATE_COURSE_SUCCESS,
          CoursesConstants.REQUEST_EDIT_COURSE_SUCCESS,
          CoursesConstants.REQUEST_SINGLE_COURSE_FAIL
        ),
        tap(() => {
          this.router.navigate(['/courses']);
        })
      ),
    { dispatch: false }
  );
}
