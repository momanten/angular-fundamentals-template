export interface CourseDataType {
  id:string;
  title:string;
  description:string;
  date:string;
  duration:number;
  authors:AuthorType[];
}

export type MockCourseDataType = Omit<CourseDataType, 'date' | 'authors'> & {creationDate:string, authors:string[]};

export interface AuthorType {
  id:string;
  name:string;
}