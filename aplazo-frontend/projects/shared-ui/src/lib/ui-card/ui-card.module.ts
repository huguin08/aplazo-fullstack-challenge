import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiCardComponent } from './ui-card.component';

@NgModule({
  declarations: [UiCardComponent],
  imports: [CommonModule],
  exports: [UiCardComponent]
})
export class UiCardModule {}