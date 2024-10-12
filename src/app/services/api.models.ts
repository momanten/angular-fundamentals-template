import { Author } from "@app/shared/types/author.model";
import { Course } from "@app/shared/types/course.model";

export interface AllCourseResponse {
  successful: boolean;
  result: Course[];
}
export interface CreateCourseResponse {
  successful: boolean;
  result: Course;
}
export interface CreateAuthorResponse {
  successful: boolean;
  result: Author;
}

export interface CourseResponse {
  successful: boolean;
  result: Course;
}
export interface AuthorResponse {
  successful: boolean;
  result: Author;
}

export interface EditCourseResponse {
  successful: boolean;
  result: Course;
}
export interface DeleteCourseResponse {
  successful: boolean;
  result: Course;
}

export interface FilterResponse {
  successful: boolean;
  result: Course[];
}

export interface AllAuthorsResponse {
  successful: boolean;
  result: Author[];
}
