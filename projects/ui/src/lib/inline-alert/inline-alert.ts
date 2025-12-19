import { Component, input, ViewEncapsulation } from '@angular/core';
import { AlertVariant } from '../../types/utils';
import { IconCheckCircleFill, IconErrorFill, IconInfoFill } from '../icons';

@Component({
    selector: 'ui-inline-alert',
    imports: [IconCheckCircleFill, IconErrorFill, IconInfoFill],
    templateUrl: './inline-alert.html',
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
 * @phase Stable
 */
export class UIInlineAlert {
    /**
     * The color variant of the inline alert.
     *
     * @default informational
     */
    variant = input<AlertVariant>('informational');
    /** The id of the inline alert. */
    id = input<string | null>(null);
    /** The owner of the inline alert. */
    owner = input<string | null>(null);
}
