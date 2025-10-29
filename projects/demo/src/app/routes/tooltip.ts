import { Component } from '@angular/core';
import { TooltipDirective } from '../../../../../projects/ui/src/lib/tooltip/tooltip.directive';

@Component({
  selector: 'tooltip-route',
  imports: [TooltipDirective],
  template: `
    <div style="margin: 16px; width: 300px">
      <span [tooltip]="{ label: 'Told ya!', showTail: true, placement: 'bottom' }"
        >Hover me for tooltip!</span
      >
    </div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class TooltipRouteComponent {}
