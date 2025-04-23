import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ui-date-picker',
  templateUrl: './ui-date-picker.component.html',
  styleUrls : ['./ui-date-picker.component.scss']
})
export class UiDatePickerComponent {
  @Input() label?: string;
  @Input() control!: FormControl;
}