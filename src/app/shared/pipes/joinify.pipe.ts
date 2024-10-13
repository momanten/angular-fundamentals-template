import { Pipe, PipeTransform } from "@angular/core";
import { Author } from "../types/author.model";

@Pipe({
  name: "joinify",
})
export class JoinifyPipe implements PipeTransform {
  transform(authors: Author[], separator = ", "): string {
    return authors.map(author => author.name).join(separator);
  }
}
