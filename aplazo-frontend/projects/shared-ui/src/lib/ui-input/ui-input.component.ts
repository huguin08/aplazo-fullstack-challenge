import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ui-input',
  templateUrl: './ui-input.component.html',
  styleUrls : ['./ui-input.component.scss']
})
export class UiInputComponent {
  @Input() type: string = 'text';
  @Input() label?: string;
  @Input() control!: FormControl;
}