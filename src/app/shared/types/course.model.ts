import { Author } from "./author.model";

export interface Course {
  id: string;
  title: string;
  description: string;
  creationDate?: string;
  duration: number;
  authors: string[];
}

export type CourseInfo = Omit<Course, "creationDate" | "authors"> & {
  date: string;
  authors: Author[];
};

export interface FilterCourse {
  duration: string[];
  creationDate: string[];
  description: string[];
  title: string[];
}
