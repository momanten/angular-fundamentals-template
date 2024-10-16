import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { Author } from '@app/shared/types/author.model';
import { ButtonTypes } from '@app/shared/types/button.type';
import { Course, CourseInfo } from '@app/shared/types/course.model';
import { IconNames } from '@app/shared/types/icons.model';
import { map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit, OnDestroy {
  ButtonTypes = ButtonTypes;
  IconNames = IconNames;

  @Input() isUpdate = false;
  @Input() courseInfo?: CourseInfo;

  courseForm!: FormGroup;
  private subscription: Subscription | undefined;
  nonCourseAuthors$!: Observable<Author[]>;
  submitted = false;
  wrongCreation = false;
  actionText = 'CREATE COURSE';

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private courseStore: CoursesStoreService
  ) {}

  ngOnInit() {
    if (this.isUpdate) this.actionText = 'UPDATE COURSE';
    this.subscribeToAllAuthors();
    this.buildForm();
  }

  subscribeToAllAuthors() {
    this.nonCourseAuthors$ = this.courseStore.authors$.pipe(
      map((authors$: Author[]) =>
        authors$.filter(
          authorAllElement =>
            !this.courseInfo?.authors.some((authorElement: Author) => authorElement.id === authorAllElement.id)
        )
      )
    );
  }

  buildForm(): void {
    this.courseForm = this.fb.group({
      title: [this.courseInfo?.title || '', [Validators.required, Validators.minLength(2)]],
      description: [this.courseInfo?.description || '', [Validators.required, Validators.minLength(2)]],
      newAuthor: this.fb.group({
        author: ['', [Validators.minLength(2), this.authorValidator()]],
      }),
      duration: [this.courseInfo?.duration || '', [Validators.required, Validators.min(1)]],
      authors: this.fb.array(this.courseInfo?.authors || []), // FormArray
    });
  }

  addAuthorToCourse(author: Author): void {
    this.authors.push(this.fb.control(author));
    this.nonCourseAuthors$ = this.nonCourseAuthors$.pipe(
      map(nonCourseAuthors => nonCourseAuthors.filter(nonCourseAuthor => nonCourseAuthor.id !== author.id))
    );
  }
  removeAuthorFromCourse(author: Author, arrayIndex: number): void {
    this.nonCourseAuthors$ = this.nonCourseAuthors$.pipe(map(nonCourseAuthors => [...nonCourseAuthors, author]));
    this.authors.removeAt(arrayIndex);
  }
  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.
  createCourse(): void {
    const course: Omit<Course, 'id'> = {
      title: this.title?.value,
      description: this.description?.value,
      duration: this.duration?.value,
      authors: this.authors?.value.map((author: Author) => author.id),
    };
    this.courseStore.createCourse(course);
  }
  updateCourse(): void {
    const course: Omit<Course, 'id'> = {
      title: this.title?.value,
      description: this.description?.value,
      duration: this.duration?.value,
      authors: this.authors?.value.map((author: Author) => author.id),
      creationDate: this.courseInfo?.date,
    };
    if (this.courseInfo?.id) {
      this.courseStore.editCourse(this.courseInfo.id, course);
    }
  }

  cancelCourse(): void {
    this.router.navigate(['../']);
  }
  addAuthor(): void {
    if (this.author?.valid && this.author?.value) {
      this.courseStore.createAuthor({ name: this.author.value });
      this.resetAuthorControl();
      this.wrongCreation = false;
    } else this.wrongCreation = true;
  }
  resetAuthorControl(): void {
    const newAuthorGroup = this.courseForm.get('newAuthor') as FormGroup;
    newAuthorGroup.get('author')?.reset();
  }
  isRequiredFieldsValid(): boolean {
    const { title, description, duration } = this.courseForm.controls;
    return title.valid && description.valid && duration.valid;
  }
  get title(): AbstractControl | null {
    return this.courseForm.get('title');
  }
  get description(): AbstractControl | null {
    return this.courseForm.get('description');
  }
  get duration(): AbstractControl | null {
    return this.courseForm.get('duration');
  }
  get author(): AbstractControl | null {
    return this.courseForm.get('newAuthor.author');
  }
  get authors(): FormArray {
    return this.courseForm.get('authors') as FormArray;
  }

  authorValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = /^[a-zA-Z0-9\s]+$/.test(control.value);
      return !valid
        ? {
            invalidAuthorCharacter: 'Author name can have only latin characters or numbers',
          }
        : null;
    };
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.isRequiredFieldsValid()) {
      if (this.isUpdate) {
        this.updateCourse();
      } else this.createCourse();
      this.router.navigate(['../']);
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
