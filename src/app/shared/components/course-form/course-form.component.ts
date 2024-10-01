import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder, FormControl, FormGroup,
  Validators
} from '@angular/forms';
import { Author } from '@app/shared/types/author.model';
import { IconNames } from '@app/shared/types/icons.model';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { IconName, IconProp } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent{
  removeIconName:IconNames = IconNames.TrashCan;
  removeIcon: IconProp | undefined = ['fas',this.removeIconName as IconName];
  courseForm!:FormGroup;
  authors:Author[]=[];
  courseAuthors: Author[]=[];
  nonCourseAuthors: Author[]=[];
  submitted:boolean = false;
  wrongCreation:boolean = false;

  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
    this.buildForm();
  }

  buildForm(): void {
    this.courseForm = this.fb.group({
      title: ['',[Validators.required,Validators.minLength(2)]],
      description: ['',[Validators.required,Validators.minLength(2)]],
      author: ['',[Validators.required,Validators.minLength(2)]],
      duration: ['',[Validators.required, Validators.min(30)]],
    });
  }

  addAuthorToCourse(author:Author):void {
    this.courseAuthors = [...this.courseAuthors, author];
    this.nonCourseAuthors = this.nonCourseAuthors.filter((nonCourseAuthor)=>nonCourseAuthor.id != author.id); 
  }
  removeAuthorFromCourse(author:Author):void {
    this.nonCourseAuthors = [...this.nonCourseAuthors, author];
    this.courseAuthors = this.courseAuthors.filter((courseAuthor)=>courseAuthor.id != author.id); 
  }
  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.
  createCourse():void {
  }
  cancelCourse():void {
  }
  addAuthor():void {
    if(this.author?.valid && 
       this.author?.value )
    {
      const newAuthor:Author = {id:this.generateId(), name:this.author!.value};
      this.authors.push(newAuthor);
      this.nonCourseAuthors.push(newAuthor);
      this.courseForm.get('author')?.reset();
      this.wrongCreation=false;
    }
    else this.wrongCreation=true;
  }
  private generateId(): string {
    return uuidv4();
  }
  get title():AbstractControl | null {
    return this.courseForm.get('title');
  }
  get description():AbstractControl | null  {
    return this.courseForm.get('description');
  }
  get duration():AbstractControl | null  {
    return this.courseForm.get('duration');
  }
  get author():AbstractControl | null  {
    return this.courseForm.get('author');
  }

  onSubmit():void {
    this.submitted=true;
  }

}
