import { Component, Input, ViewEncapsulation } from '@angular/core';

/**
 * A temporary effect or overlay that can be applied to a user interface to make content less prominent or to draw
 * attention to a modal or sheet.
 *
 * @name Scrim
 * @phase Utility
 */
@Component({
    selector: 'ui-scrim',
    standalone: true,
    template: '',
    styleUrls: ['./scrim.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        'aria-hidden': 'true',
        'data-bspk': 'scrim',
        '[attr.data-bspk-owner]': 'owner || undefined',
        '[attr.data-hidden]': '!visible || undefined',
        '[attr.data-contained]': 'contained || undefined',
    },
})
export class UIScrim {
    /** Whether the Scrim should be visible. */
    @Input() visible = true;
    /** Owner identifier for tracking/analytics. */
    @Input() owner?: string;
    /** Whether the scrim is contained within another element. */
    @Input() contained?: boolean;
}
