import { Component, ViewEncapsulation, input, ElementRef, output, viewChild, effect } from '@angular/core';
import { AsSignal, FieldControlProps } from '../../types/common';
import { uniqueId } from '../../utils/random';

export type CheckboxProps = Omit<FieldControlProps, 'onChange' | 'readOnly' | 'value'> & {
    /**
     * If the checkbox is partially checked or
     * [indeterminate](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#indeterminate_state_checkboxes).
     *
     * This will override the `checked` prop.
     *
     * @default false
     */
    indeterminate?: boolean;
    /**
     * Marks the checkbox as checked.
     *
     * @default false
     */
    checked?: boolean;
    /** The value of the checkbox. */
    value: string;
};

/**
 * A control that allows users to choose one or more items from a list or turn a feature on or off. This is the base
 * element and if used directly you must wrap it with a label. More often used in CheckboxOption or CheckboxGroup.
 *
 * @example
 *     <label>
 *     <ui-checkbox
 *     [checked]="checked"
 *     [indeterminate]="indeterminate"
 *     [id]="'sample-checkbox'"
 *     [name]="'sample-checkbox'"
 *     (checkedChange)="checked = $event"
 *     [value]="'sample'"
 *     aria-label="Sample"
 *     />
 *     Checkbox Label
 *     </label>
 *
 * @element
 * @name Checkbox
 * @phase Dev
 */
@Component({
    selector: 'ui-checkbox',
    standalone: true,
    template: `
        <input
            [attr.aria-describedby]="ariaDescribedBy() || undefined"
            [attr.aria-errormessage]="ariaErrorMessage() || undefined"
            [attr.aria-invalid]="invalid() || undefined"
            [attr.aria-label]="ariaLabel()"
            [checked]="checked()"
            [attr.data-indeterminate]="indeterminate() || undefined"
            [disabled]="disabled()"
            [id]="id()"
            [name]="name()"
            [required]="required()"
            [value]="value()"
            type="checkbox"
            (change)="onInputChange()"
            #input />
        <span aria-hidden="true">
            @if (indeterminate()) {
                <svg data-indeterminate fill="none" viewBox="0 0 12 4" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M1.44444 3.11089C0.892158 3.11089 0.444443 2.66318 0.444443 2.11089V1.88867C0.444443 1.33639 0.892158 0.888672 1.44444 0.888672H10.5556C11.1078 0.888672 11.5556 1.33639 11.5556 1.88867V2.11089C11.5556 2.66318 11.1078 3.11089 10.5556 3.11089H1.44444Z"
                        fill="currentColor" />
                </svg>
            } @else if (checked()) {
                <svg data-checked fill="none" viewBox="0 0 14 11" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M5.485 10.182a1 1 0 0 1-1.414 0l-3.03-3.03a1 1 0 0 1 0-1.415l.14-.141a1 1 0 0 1 1.415 0l2.182 2.182 6.626-6.627a1 1 0 0 1 1.414 0l.142.142a1 1 0 0 1 0 1.414l-7.475 7.475Z"
                        fill="currentColor" />
                </svg>
            }
        </span>
    `,
    styleUrl: './checkbox.scss',
    encapsulation: ViewEncapsulation.None,
    host: {
        'data-bspk': 'checkbox',
    },
})
export class UICheckbox implements AsSignal<CheckboxProps> {
    /** Emits the new checked state (true or false) */
    checkedChange = output<boolean>();

    readonly name = input.required<CheckboxProps['name']>();
    readonly value = input.required<CheckboxProps['value']>();
    readonly ariaLabel = input<CheckboxProps['ariaLabel']>(undefined);
    readonly id = input<CheckboxProps['id']>(uniqueId('checkbox'));
    readonly checked = input<CheckboxProps['checked']>(false);
    readonly indeterminate = input<CheckboxProps['indeterminate']>(false);
    readonly disabled = input<CheckboxProps['disabled']>(false);
    readonly invalid = input<CheckboxProps['invalid']>(false);
    readonly required = input<CheckboxProps['required']>(false);
    readonly ariaDescribedBy = input<CheckboxProps['ariaDescribedBy']>(undefined);
    readonly ariaErrorMessage = input<CheckboxProps['ariaErrorMessage']>(undefined);

    private readonly inputEl = viewChild.required<ElementRef<HTMLInputElement>>('input');

    constructor() {
        effect(() => {
            // Update indeterminate property on the native input
            const nativeInput: HTMLInputElement | null = this.inputEl().nativeElement;
            if (nativeInput) nativeInput.indeterminate = !!this.indeterminate();
        });
    }

    onInputChange() {
        this.checkedChange.emit(this.inputEl().nativeElement.checked);
    }
}
