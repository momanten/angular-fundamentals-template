// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
};

const BASE_URL = 'http://localhost:4000';

// Authentication paths
export const LOGIN_URL = `${BASE_URL}/login`;
export const REGISTRATION_URL = `${BASE_URL}/register`;
export const LOGOUT_URL = `${BASE_URL}/logout`;
export const ME_URL = `${BASE_URL}/users/me`;

// Authors paths
export const AUTHORS_BASE_URL = `${BASE_URL}/authors`;
export const AUTHORS_URL = `${AUTHORS_BASE_URL}/`;
export const AUTHORS_ADD_URL = `${AUTHORS_BASE_URL}/add`;
export const AUTHORS_ALL_URL = `${AUTHORS_BASE_URL}/all`;

// Courses paths
export const COURSES_BASE_URL = `${BASE_URL}/courses`;
export const COURSES_URL = `${COURSES_BASE_URL}/`;
export const COURSES_ADD_URL = `${COURSES_BASE_URL}/add`;
export const COURSES_ALL_URL = `${COURSES_BASE_URL}/all`;
export const FILTER_URL = `${COURSES_BASE_URL}/filter`;

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
