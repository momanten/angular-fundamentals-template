import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { MappingService } from "@app/services/mapping.service";
import { ButtonTypes } from "@app/shared/types/button.type";
import { Course, CourseInfo } from "@app/shared/types/course.model";
import { combineLatest } from "rxjs";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent implements OnInit {
  ButtonTypes = ButtonTypes;
  course: CourseInfo | undefined = { id: "", title: "", duration: 0, description: "", authors: [], date: "" };
  courseId: string | undefined;

  constructor(
    private router: Router,
    private coursesStore: CoursesStoreService,
    private route: ActivatedRoute,
    private mapping: MappingService
  ) {}

  ngOnInit() {
    combineLatest([this.coursesStore.courses$, this.coursesStore.authors$, this.route.paramMap]).subscribe(
      ([courses, authors, params]) => {
        this.courseId = params.get("id") || undefined;
        const course = courses.find(course => course.id === this.courseId);
        if (this.courseId && course) {
          this.course = this.mapping.createCourseWithAuthorNames(course, authors);
        }
      }
    );
  }

  handleBackToCourses() {
    this.router.navigate(["../"]);
  }
}
