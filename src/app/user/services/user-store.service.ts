import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private name$$ = new BehaviorSubject<string>('');
  public name$ = this.name$$.asObservable();
  private isAdmin$$ = new BehaviorSubject<boolean>(false);
  public isAdmin$ = this.isAdmin$$.asObservable();

  constructor(private userService: UserService) {}

  getUser() {
    this.userService.getUser().subscribe({
      next: response => {
        if (response.result.role === 'admin') {
          this.isAdmin$$.next(true);
          this.name$$.next('');
        } else {
          this.isAdmin$$.next(false);
          this.name$$.next(response.result.name);
        }
      },
    });
  }

  get isAdmin() {
    return this.isAdmin$$.getValue();
  }

  set isAdmin(value: boolean) {
    this.isAdmin$$.next(value);
  }
  get userName() {
    return this.name$$.getValue();
  }

  set userName(value: string) {
    this.name$$.next(value);
  }
}
