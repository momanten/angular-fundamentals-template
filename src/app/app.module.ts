import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SharedModule } from "@shared/shared.module";
import { AppComponent } from "@app/app.component";
import { NotAuthorizedGuard } from "@app/auth/guards/not-authorized.guard";
import { AuthorizedGuard } from "@app/auth/guards/authorized.guard";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { CoursesService } from "@app/services/courses.service";
import { RouterModule } from "@angular/router";
import { routes } from "./app-routing.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthModule } from "./auth/auth.module";
import { TokenInterceptor } from "./auth/interceptors/token.interceptor";
import { AdminGuard } from "./user/guards/admin.guard";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SharedModule, FontAwesomeModule, RouterModule.forRoot(routes), HttpClientModule, AuthModule],
  providers: [
    AdminGuard,
    AuthorizedGuard,
    NotAuthorizedGuard,
    CoursesService,
    CoursesStoreService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
