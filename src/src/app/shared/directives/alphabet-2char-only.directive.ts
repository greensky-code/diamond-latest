import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAlphabet2CharacterOnly]'
})

export class Alphabet2CharOnlyDirective {
  key:any;
  @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent) {
    this.key = event.keyCode;
    console.log(this.key);
    if ((this.key == 89 || this.key == 78)) {
      event.preventDefault();
    }
  }
}
