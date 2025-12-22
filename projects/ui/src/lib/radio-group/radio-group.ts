import { Component, ViewEncapsulation, input, Output, EventEmitter } from '@angular/core';
import { UIRadioOption } from '../radio-option/radio-option';

export interface RadioGroupOption {
    value: string;
    label: string;
    description?: string;
    checked?: boolean;
    disabled?: boolean;
}

/**
 * A group of radios that allows users to choose one or more items from a list or turn an feature on or off.
 *
 * For a more complete example with field usage, see the RadioGroupField component.
 *
 * @example
 *     <ui-radio-group
 *     [options]="options"
 *     [value]="selectedValue"
 *     (valueChange)="onValueChange($event)">
 *     </ui-radio-group>
 *
 * @name RadioGroup
 * @phase UXReview
 */

@Component({
    selector: 'ui-radio-group',
    standalone: true,
    imports: [UIRadioOption],
    template: `
        <div
            [attr.aria-describedby]="ariaDescribedBy() || null"
            [attr.aria-errormessage]="ariaErrorMessage() || null"
            [attr.id]="id()"
            role="radiogroup"
            data-bspk="radio-group"
            style="display: flex; flex-direction: column; gap: 0; max-width: 100%; --list-item-height: auto;">
            @for (option of options(); track option.value) {
                <ui-radio-option
                    [label]="option.label"
                    [description]="option.description"
                    [name]="name()"
                    [value]="option.value"
                    [checked]="value() === option.value"
                    [disabled]="disabled() || option.disabled"
                    [required]="required()"
                    [invalid]="invalid()"
                    (checkedChange)="onRadioChange(option.value, $event)">
                </ui-radio-option>
            }
        </div>
    `,
    host: {
        'data-bspk': 'radio-group',
        'style.display': 'flex',
        'style.flex-direction': 'column',
        'style.gap': '0',
        'style.max-width': '100%',
        'style.--list-item-height': 'auto',
    },
    encapsulation: ViewEncapsulation.None,
})
export class UIRadioGroup extends UIRadioOption {
    @Output() valueChange = new EventEmitter<string>();
    /** Radio group options */
    options = input<RadioGroupOption[]>([]);
    /**
     * The `aria-describedby` attribute for the radio group.
     *
     * This should be set to the ID of an element that contains additional descriptive text for the group. When
     * provided, assistive technologies will announce the referenced description to users, improving accessibility.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
     */
    ariaDescribedBy = input<string | null>(null);
    /**
     * The `aria-errormessage` attribute for the radio group.
     *
     * This should be set to the ID of an element that contains an error message describing the validation error for the
     * group. When provided, assistive technologies will announce the referenced error message when the group is
     * invalid.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-errormessage
     */
    ariaErrorMessage = input<string | null>(null);
    /** Handles changes to the radio button selection. */
    onRadioChange(value: string, checked: boolean) {
        if (checked) {
            this.valueChange.emit(value);
        }
    }
}
