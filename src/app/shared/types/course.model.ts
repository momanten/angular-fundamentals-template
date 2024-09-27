import { Author } from "./author.model";

export interface CourseData {
  id:string;
  title:string;
  description:string;
  date:string;
  duration:number;
  authors:Author[];
}

export type MockCourseData = Omit<CourseData, 'date' | 'authors'> & {creationDate:string, authors:string[]};