import { Component, input } from '@angular/core';
import { UIListItem } from '../list-item';
import { UIRadio } from '../radio/radio';

/**
 * A control that allows users to choose one or more items from a list or turn an feature on or off.
 *
 * If only a radio button is needed, consider using the Radio component directly.
 *
 * @name RadioOption
 * @phase Utility
 */
@Component({
    selector: 'ui-radio-option',
    imports: [UIRadio, UIListItem],
    template: `<ui-list-item
        [label]="label() || ''"
        [subText]="description()"
        [disabled]="disabled()"
        data-bspk="radio-option"
        [attr.aria-disabled]="disabled() ? true : null"
        as="label">
        <ui-radio
            data-leading
            [id]="id()"
            [name]="name()"
            [value]="value()"
            [checked]="checked()"
            [disabled]="disabled()"
            [required]="required()"
            [invalid]="invalid()"
            [ariaLabel]="ariaLabel()"
            (checkedChange)="checkedChange.emit($event)">
        </ui-radio>
    </ui-list-item>`,
    host: {
        'data-bspk': 'radio-option',
    },
})
export class UIRadioOption extends UIRadio {
    /** The label of the option. Also used as the aria-label of the control. */
    label = input<string>();

    /** The description of the option. */
    description = input<string | undefined>(undefined);
    /** The aria-label for the radio element. Combines label and description if both are present. */

    override ariaLabel = input<string | undefined>(this.computedAriaLabel());

    computedAriaLabel(): string | undefined {
        return this.description() ? `${this.label()} - ${this.description()}` : this.label();
    }
}
