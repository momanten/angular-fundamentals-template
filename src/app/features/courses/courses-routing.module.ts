import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';


const routes: Routes = [
  { path: '',
    component: CoursesComponent,
    pathMatch: 'full'
  },
  { path: 'add', 
    loadChildren: () => import('../add-course/add-course.module').then(m => m.AddCourseModule) 
  },
  { path: 'edit/:id',
    loadChildren: () => import('../edit-course/edit-course.module').then(m => m.EditCourseModule) 
  },
 /*  { path: ':id', loadChildren: () => import('../course-info/course-info.module').then(m => m.CourseInfoModule) } */
/*   { path: 'edit/:id', loadChildren: () => import('../edit-course/edit-course.module').then(m => m.EditCourseModule) },
  { path: ':id', loadChildren: () => import('../course-info/course-info.module').then(m => m.CourseInfoModule) } */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }