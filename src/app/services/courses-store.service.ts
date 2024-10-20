import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CoursesService } from './courses.service';
import { AllAuthorsResponse, AuthorResponse, CreateAuthorResponse } from './api.models';
import { Author } from '@app/shared/types/author.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesStoreService {
  private authors$$ = new BehaviorSubject<Author[]>([]);
  public authors$ = this.authors$$.asObservable();
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoading$$.asObservable();

  constructor(private courseService: CoursesService) {}

  getAllAuthors() {
    this.isLoading$$.next(true);
    this.courseService.getAllAuthors().subscribe({
      next: (response: AllAuthorsResponse) => {
        this.authors$$.next(response.result);
        this.isLoading$$.next(false);
      },
      error: err => {
        console.error('Failed to get courses', err);
        this.isLoading$$.next(false);
      },
    });
  }

  createAuthor(name: Omit<Author, 'id'>) {
    this.isLoading$$.next(true);
    this.courseService.createAuthor(name).subscribe({
      next: (response: CreateAuthorResponse) => {
        this.authors$$.next([...this.authors$$.value, response.result]);
        this.isLoading$$.next(false);
      },
      error: err => {
        this.isLoading$$.next(false);
        console.error('Failed to add course', err);
      },
    });
  }

  getAuthorById(id: string): Observable<AuthorResponse> {
    this.isLoading$$.next(true);
    return this.courseService.getAuthorById(id).pipe(
      tap({
        next: () => {
          this.isLoading$$.next(false);
        },
        error: err => {
          console.error('Failed to get course', err);
          this.isLoading$$.next(false);
        },
      })
    );
  }
}
