import { Component, ViewEncapsulation, input } from '@angular/core';
import { AsSignal, CommonProps } from '../../types/common';

export type ScrimProps = CommonProps<'owner'> & {
    /**
     * Whether the Scrim should be visible.
     *
     * @default true
     */
    visible?: boolean;
    /** If the scrim should be contained within a parent element, or fixed to the viewport. */
    contained?: boolean;
};

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
        '[attr.data-bspk-owner]': 'owner() || undefined',
        '[attr.data-hidden]': '!visible() || undefined',
        '[attr.data-contained]': 'contained() || undefined',
    },
})
export class UIScrim implements AsSignal<ScrimProps> {
    readonly visible = input<ScrimProps['visible']>(true);
    readonly owner = input<ScrimProps['owner']>();
    readonly contained = input<ScrimProps['contained']>();
}
