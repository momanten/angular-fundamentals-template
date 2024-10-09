import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ButtonTypes } from "@app/shared/types/button.type";
import { CourseInfo } from "@app/shared/types/course.model";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent {
  ButtonTypes = ButtonTypes;

  @Input() course!: CourseInfo;
  @Output() showCourseList = new EventEmitter();

  handleBackToCourses() {
    this.showCourseList.emit();
  }
}
