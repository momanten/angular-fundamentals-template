import { Directive } from "@angular/core";

@Directive({
  selector: '[hideable]',
  exportAs: 'hideableRef',
})

export class HideableDirective {
  private isVisible: boolean = true;

  get visible() {
    return this.isVisible;
  }
  toggle() {
    this.isVisible = !this.isVisible;
  }
}