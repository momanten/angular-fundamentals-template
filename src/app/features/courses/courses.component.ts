import { Component, Input } from '@angular/core';
import { CourseDataType } from '@app/shared/types/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  @Input() courses!:CourseDataType[];

  readonly emptyListTitle = 'Your List is Empty';
  readonly emptyListText = "Please use 'ADD NEW COURSE' button to add your first course";

}
