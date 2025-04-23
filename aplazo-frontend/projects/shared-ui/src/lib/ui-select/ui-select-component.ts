import { Component, Input } from '@angular/core';

interface Option { value: any; label: string; }

@Component({
  selector: 'ui-select',
  template: `
    <label *ngIf="label">{{ label }}</label>
    <select [formControl]="control">
      <option *ngFor="let opt of options" [value]="opt.value">{{ opt.label }}</option>
    </select>
    <ng-content select="[error]"></ng-content>
  `
})
export class UiSelectComponent {
  @Input() label!: string;
  @Input() options: Option[] = [];
  @Input() control: any;
}