import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-date-picker',
  template: `
    <label *ngIf="label">{{ label }}</label>
    <input type="date" [formControl]="control" />
    <ng-content select="[error]"></ng-content>
  `
})
export class UiDatePickerComponent {
  @Input() label!: string;
  @Input() control: any;
}