import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ButtonTypes } from "@app/shared/types/button.type";
import { CourseInfo } from "@app/shared/types/course.model";
import { IconNames } from "@app/shared/types/icons.model";

@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.scss"],
})
export class CoursesListComponent {
  ButtonTypes = ButtonTypes;
  IconNames = IconNames;

  @Input() courses!: CourseInfo[];
}
