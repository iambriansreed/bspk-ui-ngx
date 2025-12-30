import { Component, input, ViewEncapsulation } from '@angular/core';

/** A component to wrap examples. */
@Component({
    selector: 'ui-example',
    template: `<ng-content></ng-content>`,
    host: {
        '[style.flex-direction]': 'direction()',
        '[style.width]': 'width()',
        style: 'display:flex; align-items:center; background-color: var(--background-shade); padding: var(--spacing-sizing-04);',
    },
    encapsulation: ViewEncapsulation.None,
})
export class UIExample {
    /**
     * The flex direction of the example container.
     *
     * @default row
     */
    readonly direction = input<'column' | 'row'>('row');
    /**
     * The width of the example container.
     *
     * @default 100%
     */
    readonly width = input<string>('100%');
}
