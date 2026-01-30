import { Component, input, ViewEncapsulation } from '@angular/core';
import { AlertVariant, AsSignal, CommonProps } from '../../types/common';
import { IconCheckCircleFill, IconErrorFill, IconInfoFill } from '../icons';
import { UITxtDirective } from '../txt/txt.directive';
import { UIWarningTwoTone } from './warning-two-tone';

export type InlineAlertProps = CommonProps<'owner'> & {
    /**
     * The content of the inline alert.
     *
     * @type multiline
     * @required
     */
    label: string;
    /**
     * The color variant of the inline alert.
     *
     * @default informational
     */
    variant?: AlertVariant;
    /** The id of the inline alert. */
    id?: string;
};

/**
 * Inline alerts provide contextual feedback messages for typical user actions with a handful of available and flexible
 * alert messages.
 *
 * @name InlineAlert
 * @phase Dev
 */
@Component({
    selector: 'ui-inline-alert',
    imports: [IconCheckCircleFill, IconErrorFill, IconInfoFill, UITxtDirective, UIWarningTwoTone],
    template: `@if (variant() === 'error') {
            <icon-error-fill />
        } @else if (variant() === 'informational') {
            <icon-info-fill />
        } @else if (variant() === 'success') {
            <icon-check-circle-fill />
        } @else if (variant() === 'warning') {
            <ui-warning-two-tone />
        }
        <div ui-txt="body-small">
            {{ label() }}
        </div>`,
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
export class UIInlineAlert implements AsSignal<InlineAlertProps> {
    readonly label = input.required<InlineAlertProps['label']>();
    readonly variant = input<InlineAlertProps['variant']>('informational');
    readonly id = input<InlineAlertProps['id']>();
    readonly owner = input<InlineAlertProps['owner']>();
}
