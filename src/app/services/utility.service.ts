import { Injectable } from '@angular/core';
import { Author } from '@app/shared/types/author.model';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  
  authorsToString(authors: Author[]): string {
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