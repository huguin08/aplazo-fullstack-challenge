import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-card',
  template: `<div class="card"><ng-content></ng-content></div>`,
  styleUrls: ['ui-card.component.scss']
})
export class UiCardComponent {
  @Input() class: string = '';
}