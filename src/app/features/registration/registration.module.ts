import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RegistrationRoutingModule } from "./registration-routing.module";
import { RegistrationComponent } from "./registration.component";
import { SharedModule } from "../../shared/shared.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    SharedModule,
    FontAwesomeModule,
  ],
})
export class RegistrationModule {}
