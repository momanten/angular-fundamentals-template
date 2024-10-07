import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ButtonTypes } from "@app/shared/types/button.type";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent {
  ButtonTypes = ButtonTypes;

  // Use the name `placeholder` for the @Input.
  // Use the name `search` for the @Output.
  @Input() placeholder = "Search...";
  @Output() search = new EventEmitter<string>();
  searchString = "";

  searchCourse(): void {
    this.search.emit(this.searchString);
  }
}
