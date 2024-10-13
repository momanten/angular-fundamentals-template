import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ButtonTypes } from "@app/shared/types/button.type";
import type { CourseInfo } from "@app/shared/types/course.model";
import { UserStoreService } from "@app/user/services/user-store.service";

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
  isAdmin$ = this.userStore.isAdmin$;

  constructor(private userStore: UserStoreService) {
    console.log("App card isadmin", this.userStore.isAdmin$);
  }

  showCourseInfo() {
    this.clickOnShow.emit(this.courseInfo.id);
  }
}
