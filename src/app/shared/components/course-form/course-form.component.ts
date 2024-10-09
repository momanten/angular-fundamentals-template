import { Component } from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { Author } from "@app/shared/types/author.model";
import { ButtonTypes } from "@app/shared/types/button.type";
import { IconNames } from "@app/shared/types/icons.model";
import { v4 as uuidv4 } from "uuid";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"],
})
export class CourseFormComponent {
  ButtonTypes = ButtonTypes;
  IconNames = IconNames;

  courseForm!: FormGroup;
  allAuthors: Author[] = [];
  nonCourseAuthors: Author[] = [];
  submitted = false;
  wrongCreation = false;

  constructor(public fb: FormBuilder) {
    this.buildForm();
  }

  buildForm(): void {
    this.courseForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(2)]],
      description: ["", [Validators.required, Validators.minLength(2)]],
      newAuthor: this.fb.group({
        author: [
          "",
          [
            Validators.required,
            Validators.minLength(2),
            this.authorValidator(),
          ],
        ],
      }),
      duration: ["", [Validators.required, Validators.min(1)]],
      authors: this.fb.array([]), // FormArray
    });
  }

  addAuthorToCourse(author: Author): void {
    this.authors.push(this.fb.control(author));
    this.nonCourseAuthors = this.nonCourseAuthors.filter(
      (nonCourseAuthor) => nonCourseAuthor.id !== author.id,
    );
  }
  removeAuthorFromCourse(author: Author, arrayIndex: number): void {
    this.nonCourseAuthors = [...this.nonCourseAuthors, author];
    this.authors.removeAt(arrayIndex);
  }
  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.
  createCourse(): void {
    return undefined;
  }
  cancelCourse(): void {
    return undefined;
  }
  addAuthor(): void {
    if (this.author?.valid && this.author?.value) {
      const newAuthor: Author = {
        id: this.generateId(),
        name: this.author.value,
      };
      this.allAuthors.push(newAuthor);
      this.nonCourseAuthors.push(newAuthor);
      this.courseForm.get("author")?.reset();
      this.wrongCreation = false;
    } else this.wrongCreation = true;
  }
  private generateId(): string {
    return uuidv4();
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
            invalidAuthorCharacter:
              "Author name can have only latin characters or numbers",
          }
        : null;
    };
  }

  onSubmit(): void {
    this.submitted = true;
  }
}
