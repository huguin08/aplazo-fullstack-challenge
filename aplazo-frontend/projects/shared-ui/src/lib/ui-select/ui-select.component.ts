import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

interface Option { value: any; label: string; }

@Component({
  selector: 'ui-select',
  templateUrl: './ui-select.component.html',
  styleUrls : ['./ui-select.component.scss']
})
export class UiSelectComponent {
  @Input() label?: string;
  @Input() control!: FormControl;
  @Input() options: { label: string; value: string }[] = [];
}