import { Component, ElementRef, input, model, viewChild, ViewEncapsulation } from '@angular/core';
import { AsInputSignal, CommonProps, FieldControlProps } from '../../types/common';
import { IconCancel } from '../icons/cancel';
import { UIIncrementButton } from './increment-button';

export type InputNumberProps = CommonProps<'size'> &
    FieldControlProps<number> & {
        /**
         * The alignment of the input box. Centered between the plus and minus buttons or to the left of the buttons.
         *
         * @default center
         */
        align?: 'center' | 'left';
        /**
         * Defines the [maximum](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/max) value that is
         * accepted.
         */
        max?: number;
        /**
         * Defines the [minimum](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/min) value that is
         * accepted.
         *
         * @default 0
         */
        min?: number;
        /**
         * The amount to increment or decrement the value by when the (+) or (-) buttons are pressed.
         *
         * @default 1
         */
        step?: number;
    };

/**
 * A input element that allows users to either input a numerical value or singularly increase or decrease the values by
 * pressing the (+) or (-).
 *
 * The value of the input is a number. The value is clamped to the min and max values if they are provided.
 *
 * For a more complete example with field usage, see the InputNumberField component.
 *
 * @example
 *     <ui-input-number
 *     [value]="inputValue()"
 *     (valueChange)="updateInput($event)"
 *     id="default-input-number"
 *     name="default-input-number"
 *     ariaLabel="Input Number Label"/>
 *
 * @name InputNumber
 * @phase UXReview
 */
@Component({
    selector: 'ui-input-number',
    imports: [UIIncrementButton],
    template: `<ui-increment-button kind="remove" (click)="incrementHandler('remove')" [disabled]="disabled()" />
        <input
            data-main-input
            [attr.aria-labelledby]="ariaLabelledBy() || null"
            [attr.aria-describedby]="ariaDescribedBy() || null"
            [attr.ariaErrorMessage]="ariaErrorMessage() || null"
            [attr.aria-label]="ariaLabel() || null"
            [attr.aria-invalid]="invalid() || null"
            [attr.data-invalid]="invalid() || null"
            [disabled]="disabled()"
            [attr.id]="id() || null"
            [attr.name]="name() || null"
            [readOnly]="readOnly() || null"
            [required]="required() || null"
            [value]="value() || ''"
            (input)="handleInput($event)"
            inputMode="numeric"
            type="number"
            #inputEl />
        <ui-increment-button kind="add" (click)="incrementHandler('add')" [disabled]="disabled()" />`,
    styleUrl: './input-number.scss',
    host: {
        'data-bspk': 'input-number',
        '[attr.data-size]': 'size()',
        '[attr.data-invalid]': 'invalid() || null',
        '[attr.data-disabled]': 'disabled() || null',
        '[attr.data-centered]': 'centered() || undefined',
        '[attr.data-readonly]': 'readOnly() || undefined',
    },
    encapsulation: ViewEncapsulation.None,
})
export class UIInputNumber implements AsInputSignal<InputNumberProps> {
    public IconCancel = IconCancel;

    readonly inputEl = viewChild.required<ElementRef<HTMLInputElement>>('inputEl');

    readonly value = model<InputNumberProps['value']>();
    readonly name = input.required<InputNumberProps['name']>();

    readonly disabled = input<InputNumberProps['disabled']>(false);
    readonly invalid = input<InputNumberProps['invalid']>(false);
    readonly readOnly = input<InputNumberProps['readOnly']>(false);
    readonly required = input<InputNumberProps['required']>(false);
    readonly size = input<InputNumberProps['size']>('medium');
    readonly id = input<InputNumberProps['id']>(undefined);
    readonly ariaLabel = input<InputNumberProps['ariaLabel']>(undefined);
    readonly step = input<InputNumberProps['step']>(1);
    readonly max = input<InputNumberProps['max']>();

    readonly ariaLabelledBy = input<InputNumberProps['ariaLabelledBy']>(undefined);
    readonly ariaDescribedBy = input<InputNumberProps['ariaDescribedBy']>(undefined);
    readonly ariaErrorMessage = input<InputNumberProps['ariaErrorMessage']>(undefined);

    incrementHandler(kind: 'add' | 'remove') {
        if (this.readOnly() || this.disabled()) {
            return;
        }

        const newValue = this.value() ? Number(this.value()) : 0;
        const stepValue = this.step() || 1;

        if (kind === 'add') {
            this.value.set(newValue + stepValue);
        } else {
            this.value.set(newValue - stepValue);
        }
    }

    handleInput(event: Event) {
        this.value.set(Number((event.target as HTMLInputElement).value));
    }
}
