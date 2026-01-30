import { Component, ViewEncapsulation, computed, input, model } from '@angular/core';
import { CommonProps, FieldControlProps, AsSignal } from '../../types/common';

export type TextareaProps = CommonProps<'size'> &
    FieldControlProps & {
        /** The placeholder of the field. */
        placeholder?: string;
        /**
         * The maximum number of characters that the field will accept.
         *
         * @minimum 1
         */
        maxLength?: number;
        /**
         * The minimum number of rows that the textarea will show.
         *
         * @default 3
         * @minimum 3
         * @maximum 10
         */
        minRows?: number;
        /**
         * The maximum number of rows that the textarea will show.
         *
         * When set the textarea will automatically adjust its height to fit the content up to this limit.
         *
         * @default 10
         * @minimum 3
         * @maximum 10
         */
        maxRows?: number;
    };

/**
 * A component that allows users to input large amounts of text that could span multiple lines.
 *
 * This component gives you a textarea HTML element that automatically adjusts its height to match the length of the
 * content within maximum and minimum rows. A character counter when a maxLength is set to show the number of characters
 * remaining below the limit.
 *
 * For a more complete example with field usage, see the TextareaField component.
 *
 * @example
 *     <ui-textarea
 *     [value]="textareaValue()"
 *     (valueChange)="updateTextarea($event)"
 *     id="default-textarea"
 *     name="default-textarea"
 *     ariaLabel="Textarea Label "/>
 *
 * @element
 *
 * @name Textarea
 * @phase UXReview
 */
@Component({
    selector: 'ui-textarea',
    standalone: true,
    template: `
        <textarea
            #el
            data-main-input
            [attr.aria-labelledby]="ariaLabelledBy() || null"
            [attr.aria-describedby]="ariaDescribedBy() || null"
            [attr.ariaErrorMessage]="ariaErrorMessage() || null"
            [attr.aria-label]="ariaLabel() || null"
            [attr.aria-invalid]="invalid() || null"
            [disabled]="disabled()"
            [id]="id()"
            [attr.name]="name() || null"
            [attr.placeholder]="placeholder() || null"
            [attr.maxLength]="maxLength() ?? null"
            [readOnly]="readOnly() || null"
            [required]="required() || null"
            [value]="value() ?? ''"
            (blur)="handleBlur($event)"
            (input)="handleInput($event)"
            wrap="hard"></textarea>
        <div aria-hidden="true" data-replicated-value>
            {{ value() }}
        </div>
    `,
    styleUrl: './textarea.scss',
    host: {
        'data-bspk': 'textarea',
        '[attr.data-disabled]': 'disabled() || null',
        '[attr.data-invalid]': 'invalid() || null',
        '[attr.data-readonly]': 'readOnly() || null',
        '[attr.data-size]': 'size() || "medium"',
        '[style.--min-rows]': 'minRowsValid()',
        '[style.--max-rows]': 'maxRowsValid()',
    },
    encapsulation: ViewEncapsulation.None,
})
export class UITextarea implements AsSignal<TextareaProps> {
    readonly name = input.required<TextareaProps['name']>();
    readonly value = model<string | undefined>('');

    readonly ariaLabel = input<TextareaProps['ariaLabel']>(undefined);
    readonly disabled = input<TextareaProps['disabled']>(false);
    readonly id = input<TextareaProps['id']>(undefined);
    readonly invalid = input<TextareaProps['invalid']>(false);
    readonly maxLength = input<TextareaProps['maxLength']>(undefined);
    readonly maxRows = input<TextareaProps['maxRows']>(10);
    readonly minRows = input<TextareaProps['minRows']>(3);
    readonly placeholder = input<TextareaProps['placeholder']>(undefined);
    readonly readOnly = input<TextareaProps['readOnly']>(false);
    readonly required = input<TextareaProps['required']>(false);
    readonly size = input<TextareaProps['size']>('medium');
    readonly ariaLabelledBy = input<TextareaProps['ariaLabelledBy']>(undefined);
    readonly ariaDescribedBy = input<TextareaProps['ariaDescribedBy']>(undefined);
    readonly ariaErrorMessage = input<TextareaProps['ariaErrorMessage']>(undefined);

    readonly minRowsValid = computed(() => Math.min(10, Math.max(3, this.minRows() || 3)));
    readonly maxRowsValid = computed(() => Math.min(10, Math.max(3, this.maxRows() || 10)));

    handleBlur(event: FocusEvent) {
        const target = event.target as HTMLTextAreaElement;
        target.scrollTop = 0;
    }

    handleInput(event: Event) {
        this.value.set((event.target as HTMLTextAreaElement).value);
    }
}
