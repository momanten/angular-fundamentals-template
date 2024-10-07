import { Directive, ElementRef, Renderer2 } from "@angular/core";

@Directive({
  selector: '[hideable]',
  exportAs: 'hideableRef',
})

export class HideableDirective {
  private isVisible: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setAttribute(this.el.nativeElement, 'type', 'password');
  }

  get visible() {
    return this.isVisible;
  }
  toggle() {
    this.isVisible = !this.isVisible;
    if (this.isVisible) this.renderer.setAttribute(this.el.nativeElement, 'type', 'text');
    else this.renderer.setAttribute(this.el.nativeElement, 'type', 'password');
  }
}