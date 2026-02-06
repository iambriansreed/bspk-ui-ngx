import { Component, ElementRef, input, model, output, viewChild, ViewEncapsulation } from '@angular/core';
import { AsSignal, CommonProps, FieldControlProps } from '../../types/common';
import { IconAdd, IconRemove } from '../icons';

function isNumber(value: unknown): number | undefined;
function isNumber(value: unknown, fallbackValue: number): number;
function isNumber(value: unknown, fallbackValue?: number): number | undefined {
    if (typeof value === 'number') return value;
    if (typeof value !== 'string') return fallbackValue;
    const num = parseFloat(value);
    return isNaN(num) ? fallbackValue : num;
}

export interface InputNumberProps extends FieldControlProps {
    owner?: CommonProps['owner'];
    size?: CommonProps['size'];

    /**
     * The alignment of the input box. Centered between the plus and minus buttons or to the left of the buttons.
     *
     * @default center
     */
    align?: 'center' | 'left';
    /** Defines the [maximum](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/max) value that is accepted. */
    max?: number;
    /**
     * Defines the [minimum](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/min) value that is accepted.
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
}

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
 *     ariaLabel="Input Number Label "/>
 *
 * @name InputNumber
 * @phase UXReview
 */
@Component({
    selector: 'ui-input-number',
    imports: [IconAdd, IconRemove],
    template: `
        <input
            data-main-input
            [attr.aria-labelledby]="ariaLabelledBy() || null"
            [attr.aria-describedby]="ariaDescribedBy() || null"
            [attr.ariaErrorMessage]="ariaErrorMessage() || null"
            [attr.aria-label]="ariaLabel() || null"
            [attr.aria-invalid]="invalid() || null"
            [attr.data-invalid]="invalid() || null"
            [disabled]="disabled()"
            [attr.id]="inputId() || null"
            [attr.name]="name() || null"
            [readOnly]="readOnly() || null"
            [required]="required() || null"
            [value]="value() || ''"
            (input)="handleInput($event)"
            [max]="max() || null"
            [min]="min() || null"
            [step]="step() || null"
            inputMode="numeric"
            (blur)="handleBlur($event)"
            type="number"
            [attr.data-stepper-input-element]="true"
            #inputEl />
        <div aria-hidden="true" data-divider></div>
        <button
            aria-label="Decrease value"
            (click)="decrementHandler()"
            [disabled]="disabled() || readOnly() || decrementDisabled"
            tabindex="-1">
            <icon-remove />
        </button>
        <button
            aria-label="Increase value"
            (click)="incrementHandler()"
            [disabled]="disabled() || readOnly() || incrementDisabled"
            tabindex="-1">
            <icon-add />
        </button>
    `,
    styleUrl: './input-number.scss',
    providers: [],
    host: {
        'data-bspk': 'input-number',
        '[attr.data-size]': 'size()',
        '[attr.data-invalid]': 'invalid() || null',
        '[attr.data-centered]': 'centered || null',
        '[attr.data-disabled]': 'disabled() || null',
        '[attr.data-readonly]': 'readOnly() || null',
        '[attr.data-stepper-input]': 'true',
    },
    encapsulation: ViewEncapsulation.None,
})
export class UIInputNumber implements AsSignal<InputNumberProps> {
    valueChange = output<string>();

    readonly inputEl = viewChild.required<ElementRef<HTMLInputElement>>('inputEl');
    readonly value = model<InputNumberProps['value']>('');
    readonly name = input.required<InputNumberProps['name']>();
    readonly disabled = input<InputNumberProps['disabled']>(false);
    readonly invalid = input<InputNumberProps['invalid']>(false);
    readonly readOnly = input<InputNumberProps['readOnly']>(false);
    readonly required = input<InputNumberProps['required']>(false);
    readonly size = input<InputNumberProps['size']>('medium');
    readonly inputId = input<InputNumberProps['inputId']>(undefined);
    readonly owner = input<InputNumberProps['owner']>(undefined);
    readonly ariaLabel = input<InputNumberProps['ariaLabel']>(undefined);
    readonly step = input<InputNumberProps['step']>(1);
    readonly min = input<InputNumberProps['min']>(undefined);
    readonly max = input<InputNumberProps['max']>(undefined);
    readonly align = input<InputNumberProps['align']>('center');
    readonly ariaLabelledBy = input<InputNumberProps['ariaLabelledBy']>(undefined);
    readonly ariaDescribedBy = input<InputNumberProps['ariaDescribedBy']>(undefined);
    readonly ariaErrorMessage = input<InputNumberProps['ariaErrorMessage']>(undefined);

    readonly iconAdd = IconAdd;
    readonly iconRemove = IconRemove;

    get centered() {
        return this.align() === 'center';
    }

    get decrementDisabled() {
        if (Number(this.value()) <= Number(this.min())) {
            return true;
        }
        return false;
    }

    get incrementDisabled() {
        if (Number(this.value()) >= Number(this.max())) {
            return true;
        }
        return false;
    }

    get existingValue(): number {
        if (this.value() === undefined && Number(this.min())) {
            this.value.set(this.min()!.toString());
        }
        return this.value() ? Number(this.value()) : 0;
    }

    decrementHandler() {
        const newValue = this.existingValue - (this.step() || 1);
        if (this.min() !== undefined && newValue < this.min()!) {
            return;
        }
        this.value.set(newValue.toString());
    }

    incrementHandler() {
        const newValue = this.existingValue + (this.step() || 1);
        if (this.max() !== undefined && newValue > this.max()!) {
            return;
        }
        this.value.set(newValue.toString());
    }

    handleBlur(event: Event) {
        const next = isNumber((event.target as HTMLInputElement).value, this.min() || 0);
        (event.target as HTMLInputElement).value = next?.toString() || '';
        this.value.set(next !== undefined ? next.toString() : '');
    }

    handleInput(event: Event) {
        const next = isNumber((event.target as HTMLInputElement).value, this.min() || 0);
        this.value.set(next !== undefined ? next.toString() : '');
    }
}
