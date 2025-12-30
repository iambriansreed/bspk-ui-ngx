import {
    Component,
    ViewEncapsulation,
    input,
    booleanAttribute,
    ElementRef,
    output,
    viewChild,
    effect,
} from '@angular/core';
import { uniqueId } from '../../utils/random';

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
        <span data-bspk="checkbox">
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
        </span>
    `,
    styleUrl: './checkbox.scss',
    encapsulation: ViewEncapsulation.None,
    host: {
        style: `display: contents;`,
    },
})
export class UICheckbox {
    /** Emits the new checked state (true or false) */
    checkedChange = output<boolean>();

    /** The [name](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name) of the control. */
    readonly name = input.required<string>();

    /** The value of the field control. */
    readonly value = input<string | undefined>(undefined);

    /** The aria-label for the element. */
    readonly ariaLabel = input<string | undefined>(undefined);

    /** The id of the element. If not provided one will be generated. */
    readonly id = input<string>(uniqueId('checkbox'));

    /** Marks the checkbox as checked. @default false */
    readonly checked = input(false, { transform: booleanAttribute });

    /** If the checkbox is indeterminate. @default false */
    readonly indeterminate = input(false, { transform: booleanAttribute });

    /** Determines if the element is disabled. @default false */
    readonly disabled = input(false, { transform: booleanAttribute });

    /** Indicates that the element is in an invalid state. @default false */
    readonly invalid = input(false, { transform: booleanAttribute });

    /** Determines if the element is required. @default false */
    readonly required = input(false, { transform: booleanAttribute });

    /** The `aria-describedby` attribute for the checkbox. */
    readonly ariaDescribedBy = input<string | undefined>(undefined);

    /** The `aria-errormessage` attribute for the checkbox. */
    readonly ariaErrorMessage = input<string | undefined>(undefined);

    private readonly inputEl = viewChild.required<ElementRef<HTMLInputElement>>('input');

    constructor() {
        effect(() => {
            // Update indeterminate property on the native input
            const nativeInput: HTMLInputElement | null = this.inputEl().nativeElement;
            if (nativeInput) nativeInput.indeterminate = this.indeterminate();
        });
    }

    onInputChange() {
        this.checkedChange.emit(this.inputEl().nativeElement.checked);
    }
}
