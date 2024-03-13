import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: 'app-generic-input input',
})
export class GenericInputRefDirective {
  focus = false;

  @HostListener('focus')
  onFocus() {
    this.focus = true;
  }

  @HostListener('blur')
  onBlur() {
    this.focus = false;
  }
}
