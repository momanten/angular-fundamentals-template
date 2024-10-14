import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Route } from "@angular/router";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { MappingService } from "@app/services/mapping.service";
import { CourseInfo } from "@app/shared/types/course.model";
import { combineLatest, Subscription, take } from "rxjs";

@Component({
  selector: "app-edit-course",
  templateUrl: "./edit-course.component.html",
  styleUrls: ["./edit-course.component.css"],
})
export class EditCourseComponent implements OnInit, OnDestroy {
  courseId: string | undefined;
  courseToUpdate: CourseInfo | undefined;
  private subscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private coursesStore: CoursesStoreService,
    private mapping: MappingService
  ) {}

  ngOnInit() {
    this.subscription = combineLatest([
      this.route.paramMap.pipe(take(1)),
      this.coursesStore.courses$.pipe(take(1)),
      this.coursesStore.authors$.pipe(take(1)),
    ]).subscribe(([params, courses, authors]) => {
      this.courseId = params.get("id") || undefined;

      if (this.courseId) {
        const course = courses.find(course => course.id === this.courseId);
        if (course) {
          this.courseToUpdate = this.mapping.createCourseWithAuthorNames(course, authors);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
