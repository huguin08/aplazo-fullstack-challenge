import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UiSelectComponent } from './ui-select.component';

@NgModule({
  declarations: [UiSelectComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [UiSelectComponent]
})
export class UiSelectModule {}