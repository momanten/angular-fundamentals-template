import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Route } from "@angular/router";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { MappingService } from "@app/services/mapping.service";
import { CourseInfo } from "@app/shared/types/course.model";
import { combineLatest, take } from "rxjs";

@Component({
  selector: "app-edit-course",
  templateUrl: "./edit-course.component.html",
  styleUrls: ["./edit-course.component.css"],
})
export class EditCourseComponent implements OnInit {
  courseId: string | undefined;
  courseToUpdate: CourseInfo | undefined;

  constructor(
    private route: ActivatedRoute,
    private coursesStore: CoursesStoreService,
    private mapping: MappingService
  ) {}

  ngOnInit() {
    combineLatest([
      this.route.paramMap.pipe(take(1)),
      this.coursesStore.courses$.pipe(take(1)),
      this.coursesStore.authors$.pipe(take(1)),
    ]).subscribe(([params, courses, authors]) => {
      this.courseId = params.get("id") || undefined;
      console.log("Course ID:", this.courseId);

      if (this.courseId) {
        const course = courses.find(course => course.id === this.courseId);
        if (course) {
          this.courseToUpdate = this.mapping.createCourseWithAuthorNames(course, authors);
        }
        console.log("Course to Update:", this.courseToUpdate);
      }
    });
  }
}
