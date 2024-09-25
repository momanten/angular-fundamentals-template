export interface CourseData {
  id:string;
  title:string;
  description:string;
  date:string;
  duration:number;
  authors:Author[];
}

export interface Author {
  id:string;
  name:string;
}