import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ButtonTypes } from "@app/shared/types/button.type";
import type { CourseInfo } from "@app/shared/types/course.model";

@Component({
  selector: "app-course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.scss"],
})
export class CourseCardComponent {
  ButtonTypes = ButtonTypes;

  @Input() editable = false;
  @Input() courseInfo!: CourseInfo;
  @Output() clickOnShow = new EventEmitter<string>();

  showCourseInfo() {
    this.clickOnShow.emit(this.courseInfo.id);
  }
}
