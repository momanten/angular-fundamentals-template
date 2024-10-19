import { Course } from '@app/shared/types/course.model';
import { Action, createReducer, on } from '@ngrx/store';
import * as CourseActions from '../../store/courses/courses.actions';

export const coursesFeatureKey = 'courses';

export interface CoursesState {
  allCourses: Course[];
  course: Course | null;
  isAllCoursesLoading: boolean;
  isSingleCourseLoading: boolean;
  isSearchState: boolean;
  errorMessage: string | null;
}

export const initialState: CoursesState = {
  allCourses: [],
  course: null,
  isAllCoursesLoading: false,
  isSingleCourseLoading: false,
  isSearchState: false,
  errorMessage: null,
};

export const coursesReducer = createReducer(
  initialState,

  //ALL COURSES
  on(CourseActions.requestAllCourses, state => ({
    ...state,
    isAllCoursesLoading: true,
    isSearchState: false,
    errorMessage: null,
  })),
  on(CourseActions.requestAllCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    isAllCoursesLoading: false,
    errorMessage: null,
  })),
  on(CourseActions.requestAllCoursesFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: error,
  })),

  //SINGLE COURSE
  on(CourseActions.requestSingleCourse, state => ({
    ...state,
    isSingleCourseLoading: true,
    errorMessage: null,
  })),
  on(CourseActions.requestSingleCourseSuccess, (state, { course }) => ({
    ...state,
    course: course,
    isSingleCourseLoading: false,
    errorMessage: null,
  })),
  on(CourseActions.requestSingleCourseFail, (state, { error }) => ({
    ...state,
    isSingleCourseLoading: false,
    errorMessage: error,
  })),

  //FILTER COURSES
  on(CourseActions.requestFilteredCourses, state => ({
    ...state,
    isAllCoursesLoading: true,
    errorMessage: null,
    isSearchState: true,
  })),
  on(CourseActions.requestFilteredCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    isAllCoursesLoading: false,
    errorMessage: null,
    isSearchState: true,
  })),
  on(CourseActions.requestFilteredCoursesFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: error,
    isSearchState: false,
  })),

  //DELETE COURSES
  on(CourseActions.requestDeleteCourse, state => ({
    ...state,
    errorMessage: null,
  })),
  on(CourseActions.requestDeleteCourseSuccess, (state, { id }) => ({
    ...state,
    allCourses: state.allCourses.filter(courseElement => courseElement.id !== id),
    errorMessage: null,
  })),
  on(CourseActions.requestDeleteCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
  })),

  //EDIT COURSE
  on(CourseActions.requestEditCourse, state => ({
    ...state,
    errorMessage: null,
  })),
  on(CourseActions.requestEditCourseSuccess, (state, { course }) => ({
    ...state,
    course: course,
    errorMessage: null,
  })),
  on(CourseActions.requestEditCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
  })),

  //CREATE COURSE
  on(CourseActions.requestCreateCourse, state => ({
    ...state,
    errorMessage: null,
  })),
  on(CourseActions.requestCreateCourseSuccess, (state, { course }) => ({
    ...state,
    course: course,
    errorMessage: null,
  })),
  on(CourseActions.requestCreateCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
  }))
);

export const reducer = (state: CoursesState, action: Action): CoursesState => coursesReducer(state, action);
