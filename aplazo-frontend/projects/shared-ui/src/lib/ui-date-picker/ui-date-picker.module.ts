import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UiDatePickerComponent } from './ui-date-picker.component';

@NgModule({
  declarations: [UiDatePickerComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [UiDatePickerComponent]
})
export class UiDatePickerModule {}