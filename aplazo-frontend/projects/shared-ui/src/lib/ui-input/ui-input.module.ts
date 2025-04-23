import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UiInputComponent } from './ui-input.component';

@NgModule({
  declarations: [UiInputComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [UiInputComponent]
})
export class UiInputModule {}