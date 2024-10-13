import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { Author } from "@app/shared/types/author.model";
import { ButtonTypes } from "@app/shared/types/button.type";
import { Course } from "@app/shared/types/course.model";
import { IconNames } from "@app/shared/types/icons.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"],
})
export class CourseFormComponent implements OnInit, OnDestroy {
  ButtonTypes = ButtonTypes;
  IconNames = IconNames;

  courseForm!: FormGroup;
  private authorsSubscription: Subscription | undefined;
  private allAuthors: Author[] = [];
  nonCourseAuthors: Author[] = [];
  submitted = false;
  wrongCreation = false;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private courseStore: CoursesStoreService
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.authorsSubscription = this.courseStore.authors$.subscribe(authors$ => {
      this.allAuthors = authors$;
      this.nonCourseAuthors = this.allAuthors.filter(
        authorAllElement =>
          !this.authors.value.some((authorElement: Author) => authorElement.id === authorAllElement.id)
      );
      console.log("AllAuthors", this.allAuthors, this.nonCourseAuthors);
    });
  }

  buildForm(): void {
    this.courseForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(2)]],
      description: ["", [Validators.required, Validators.minLength(2)]],
      newAuthor: this.fb.group({
        author: ["", [Validators.minLength(2), this.authorValidator()]],
      }),
      duration: ["", [Validators.required, Validators.min(1)]],
      authors: this.fb.array([]), // FormArray
    });
  }

  addAuthorToCourse(author: Author): void {
    this.authors.push(this.fb.control(author));
    this.nonCourseAuthors = this.nonCourseAuthors.filter(nonCourseAuthor => nonCourseAuthor.id !== author.id);
  }
  removeAuthorFromCourse(author: Author, arrayIndex: number): void {
    this.nonCourseAuthors = [...this.nonCourseAuthors, author];
    this.authors.removeAt(arrayIndex);
  }
  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.
  createCourse(): void {
    const course: Omit<Course, "id"> = {
      title: this.title?.value,
      description: this.description?.value,
      duration: this.duration?.value,
      authors: this.authors?.value.map((author: Author) => author.id),
    };
    this.courseStore.createCourse(course);
  }
  cancelCourse(): void {
    this.router.navigate(["../"]);
  }
  addAuthor(): void {
    if (this.author?.valid && this.author?.value) {
      this.courseStore.createAuthor({ name: this.author.value });
      this.resetAuthorControl();
      this.wrongCreation = false;
    } else this.wrongCreation = true;
  }
  resetAuthorControl(): void {
    const newAuthorGroup = this.courseForm.get("newAuthor") as FormGroup;
    newAuthorGroup.get("author")?.reset();
  }
  isRequiredFieldsValid(): boolean {
    const { title, description, duration } = this.courseForm.controls;
    return title.valid && description.valid && duration.valid;
  }
  get title(): AbstractControl | null {
    return this.courseForm.get("title");
  }
  get description(): AbstractControl | null {
    return this.courseForm.get("description");
  }
  get duration(): AbstractControl | null {
    return this.courseForm.get("duration");
  }
  get author(): AbstractControl | null {
    return this.courseForm.get("newAuthor.author");
  }
  get authors(): FormArray {
    return this.courseForm.get("authors") as FormArray;
  }

  authorValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = /^[a-zA-Z0-9\s]+$/.test(control.value);
      return !valid
        ? {
            invalidAuthorCharacter: "Author name can have only latin characters or numbers",
          }
        : null;
    };
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.isRequiredFieldsValid()) {
      console.log("Valid Form");
      this.createCourse();
      this.router.navigate(["../"]);
    }
  }

  ngOnDestroy(): void {
    this.authorsSubscription?.unsubscribe();
  }
}
