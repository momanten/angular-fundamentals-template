import { Author } from "./author.model";

export interface Course {
  id:string;
  title:string;
  description:string;
  creationDate:string;
  duration:number;
  authors: Author[];
}
