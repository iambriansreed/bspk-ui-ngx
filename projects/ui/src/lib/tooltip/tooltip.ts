import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-tooltip',
  styleUrls: ['./tooltip.scss'],
  templateUrl: './tooltip.html',
})
export class Tooltip {
  /** The tooltip content. */
  @Input() label: string = '';
  /**
   * Determines if the tooltip should hide the tail.
   *
   * @default true
   */
  @Input() showTail: boolean = true;
}
