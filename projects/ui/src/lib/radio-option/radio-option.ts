import { Component, computed, input } from '@angular/core';
import { AsSignal } from '../../types/common';
import { UIListItem } from '../list-item';
import { RadioProps, UIRadio } from '../radio/radio';

export type RadioOptionProps = RadioProps & {
    /** The label of the option. Also used as the aria-label of the control. */
    label: string;
    /** The description of the option. */
    description?: string;
};

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
        <span data-leading>
            <ui-radio
                [id]="id()"
                [name]="name()"
                [value]="value()"
                [checked]="checked()"
                [disabled]="disabled()"
                [required]="required()"
                [invalid]="invalid()"
                [ariaLabel]="ariaLabel() || computedAriaLabel()"
                (checkedChange)="checkedChange.emit($event)">
            </ui-radio>
        </span>
    </ui-list-item>`,
    host: {
        'data-bspk': 'radio-option',
    },
})
export class UIRadioOption extends UIRadio implements AsSignal<RadioOptionProps> {
    readonly label = input.required<RadioOptionProps['label']>();
    readonly description = input<RadioOptionProps['description']>(undefined);

    readonly computedAriaLabel = computed(() => {
        return this.ariaLabel() ?? (this.description() ? `${this.label()} - ${this.description()}` : this.label());
    });
}
