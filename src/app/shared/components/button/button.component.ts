import { Component, Input } from "@angular/core";
import { ButtonTypes } from "@app/shared/types/button.type";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
})
export class ButtonComponent {
  ButtonTypes = ButtonTypes;

  @Input() buttonText?: string;
  @Input() type?: ButtonTypes = ButtonTypes.Button;
}
