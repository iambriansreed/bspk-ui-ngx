import { Component, input, ViewEncapsulation } from '@angular/core';
import { AlertVariant } from '../../types/common';
import { IconCheckCircleFill, IconErrorFill, IconInfoFill } from '../icons';
import { UIWarningTwoTone } from './warning-two-tone';

@Component({
    selector: 'ui-inline-alert',
    imports: [IconCheckCircleFill, IconErrorFill, IconInfoFill, UIWarningTwoTone],
    template: `@if (variant() === 'error') {
            <icon-error-fill />
        } @else if (variant() === 'informational') {
            <icon-info-fill />
        } @else if (variant() === 'success') {
            <icon-check-circle-fill />
        } @else if (variant() === 'warning') {
            <ui-warning-two-tone />
        }
        <p variant="body-small"><ng-content /></p>`,
    styleUrl: './inline-alert.scss',
    host: {
        'data-bspk': 'inline-alert',
        role: 'alert',
        '[attr.data-variant]': 'variant()',
        '[attr.id]': 'id()',
        '[attr.data-bspk-owner]': 'owner()',
    },
    encapsulation: ViewEncapsulation.None,
})
/**
 * Inline alerts provide contextual feedback messages for typical user actions with a handful of available and flexible
 * alert messages.
 *
 * @name InlineAlert
 * @phase Dev
 */
export class UIInlineAlert {
    /**
     * The color variant of the inline alert.
     *
     * @default informational
     */
    readonly variant = input<AlertVariant>('informational');
    /** The id of the inline alert. */
    readonly id = input<string | null>(null);
    /** The owner of the inline alert. */
    readonly owner = input<string | null>(null);
}
