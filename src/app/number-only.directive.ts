import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumberOnly]'
})
export class NumberOnlyDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Remove any non-numeric characters
    value = value.replace(/[^0-9]/g, '');

    // Update the input field
    input.value = value;
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow control keys (backspace, arrow keys, tab, etc.)
    if (
      event.key === 'Backspace' ||
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowRight' ||
      event.key === 'Tab'
    ) {
      return;
    }

    // Prevent non-numeric input
    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  }
}
