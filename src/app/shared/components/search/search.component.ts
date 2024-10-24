import { Component, Input } from '@angular/core';
import { ButtonTypes } from '@app/shared/types/button.type';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  ButtonTypes = ButtonTypes;
  constructor(private coursesFacade: CoursesStateFacade) {}

  // Use the name `placeholder` for the @Input.
  // Use the name `search` for the @Output.
  @Input() placeholder = 'Search...';
  searchString = '';

  searchCourse(): void {
    if (this.searchString.length > 0) {
      this.coursesFacade.getFilteredCourses(this.searchString);
    } else this.coursesFacade.getAllCourses();
  }
}
