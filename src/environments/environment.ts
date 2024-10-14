// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
};

export const LOGIN_URL = 'http://localhost:4000/login';
export const REGISTRATION_URL = 'http://localhost:4000/register';
export const LOGOUT_URL = 'http://localhost:4000/logout';
export const ME_URL = 'http://localhost:4000/users/me';
export const AUTHORS_URL = 'http://localhost:4000/authors/';
export const AUTHORS_ADD_URL = 'http://localhost:4000/authors/add';
export const AUTHORS_ALL_URL = 'http://localhost:4000/authors/all';
export const FILTER_URL = 'http://localhost:4000/courses/filter';
export const COURSES_URL = 'http://localhost:4000/courses/';
export const COURSES_ADD_URL = 'http://localhost:4000/courses/add';
export const COURSES_ALL_URL = 'http://localhost:4000/courses/all';

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
