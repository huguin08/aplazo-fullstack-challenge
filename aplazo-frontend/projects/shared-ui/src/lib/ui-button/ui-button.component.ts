import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-button',
  template: `<button [type]="type" [disabled]="disabled"><ng-content></ng-content></button>`,
  styleUrls: ['./ui-button.component.scss']
})
export class UiButtonComponent {
  @Input() type: 'button'|'submit' = 'button';
  @Input() disabled = false;
}