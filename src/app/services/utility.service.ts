import { Injectable } from '@angular/core';
import { AuthorType } from '@app/shared/types/course.model';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  
  authorsToString(authors: AuthorType[]): string {
    return authors.map(author => author.name).join(', ');
  }

  durationInHoursString(durationInMinutes: number): string {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    return `${hours}:${minutes} hours`;
  }

  formatDateWithDots(date: string): string {
    return date.split('/').join('.');
  }
}