import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-input',
  template: `
    <label *ngIf="label">{{ label }}</label>
    <input [formControl]="control" [placeholder]="placeholder" />
    <ng-content select="[error]"></ng-content>
  `
})
export class UiInputComponent {
  @Input() label!: string;
  @Input() placeholder = '';
  @Input() control: any;
}