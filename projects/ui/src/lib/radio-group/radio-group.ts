import { Component, ViewEncapsulation, input, output, model } from '@angular/core';
import { AsSignal, FieldControlProps } from '../../types/common';
import { RadioProps } from '../radio/radio';
import { RadioOptionProps, UIRadioOption } from '../radio-option/radio-option';

export interface RadioGroupOption
    extends Pick<RadioOptionProps, 'checked' | 'description' | 'disabled' | 'label'>, Pick<RadioProps, 'value'> {}

export interface RadioGroupProps extends FieldControlProps {
    /**
     * The options for the radios.
     *
     * @example
     *     [
     *         {
     *             value: '1',
     *             label: 'Option 1',
     *         },
     *         {
     *             value: '2',
     *             label: 'Option 2',
     *             description: 'Description here',
     *         },
     *         { value: '3', label: 'Option 3' },
     *     ];
     *
     * @type Array<RadioGroupOption>
     * @required
     */
    options: RadioGroupOption[];
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
 * @phase Dev
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
                    [readOnly]="readOnly()"
                    (checkedChange)="onRadioChange(option.value || '', $event)">
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
export class UIRadioGroup implements AsSignal<RadioGroupProps> {
    valueChange = output<string>();

    readonly id = input<RadioGroupProps['id']>(undefined);
    readonly name = input.required<RadioGroupProps['name']>();
    readonly value = model<RadioGroupProps['value']>('');
    readonly disabled = input<RadioGroupProps['disabled']>(false);
    readonly required = input<RadioGroupProps['required']>(false);
    readonly invalid = input<RadioGroupProps['invalid']>(false);
    readonly options = input<RadioGroupOption[]>([]);
    readonly ariaLabel = input<RadioGroupProps['ariaLabel']>(undefined);
    readonly ariaLabelledBy = input<RadioGroupProps['ariaLabelledBy']>(undefined);
    readonly ariaDescribedBy = input<RadioGroupProps['ariaDescribedBy']>();
    readonly ariaErrorMessage = input<RadioGroupProps['ariaErrorMessage']>();
    readonly readOnly = input<RadioGroupProps['readOnly']>(false);

    constructor() {
        this.value.subscribe((val) => {
            this.valueChange.emit(val || '');
        });
    }

    /** Handles changes to the radio button selection. */
    onRadioChange(value: string, checked: boolean) {
        if (checked) {
            this.valueChange.emit(value);
        }
    }
}
