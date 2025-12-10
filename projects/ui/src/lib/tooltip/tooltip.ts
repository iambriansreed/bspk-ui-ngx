import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'ui-tooltip',
    styleUrls: ['./tooltip.scss'],
    templateUrl: './tooltip.html',
    encapsulation: ViewEncapsulation.None,
})
export class UITooltip {
    /** The tooltip content. */
    @Input() label?: string = '';
    /**
     * Determines if the tooltip should hide the tail.
     *
     * @default true
     */
    @Input() showTail?: boolean = true;
    /**
     * The placement of the tooltip.
     *
     * @default top
     */
    @Input() placement: 'top' | 'bottom' | 'left' | 'right' = 'top';
    /**
     * Determines if the tooltip is disabled.
     *
     * @default false
     */
    @Input() disabled?: boolean = false;

    get hideTailAttr(): true | null {
        return this.showTail ? null : true;
    }
}
