import { Component, computed, input, output, ViewEncapsulation } from '@angular/core';
import { AsSignal } from '../../types/common';
import { uniqueId } from '../../utils/random';
import { describedById, errorMessageId, FieldProps, labelledById, UIField } from '../field';
import { UITextarea } from '../textarea';

type TextareaFieldProps = Omit<FieldProps, 'controlId'>;

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
 *     <ui-textarea-field
 *     [value]="textareaValue()"
 *     (valueChange)="updateTextarea($event)"
 *     id="default-textarea"
 *     name="default-textarea"
 *     label="Textarea Label "/>
 *
 * @element
 *
 * @name TextareaField
 * @phase UXReview
 */
@Component({
    selector: 'ui-textarea-field',
    standalone: true,
    imports: [UIField, UITextarea],
    template: `
        <ui-field
            [errorMessage]="errorMessage()"
            [label]="label()"
            [helperText]="helperText()"
            [labelTrailing]="labelTrailing()"
            [controlId]="controlId()"
            [style]="style()"
            [required]="required()">
            <ui-textarea
                [ariaLabelledBy]="labelledById()"
                [ariaDescribedBy]="describedById()"
                [ariaErrorMessage]="errorMessageId()"
                (valueChange)="valueChange.emit($event)"
                [ariaLabel]="ariaLabel()"
                [disabled]="disabled()"
                [id]="controlId()"
                [invalid]="invalid()"
                [name]="name()"
                [placeholder]="placeholder()"
                [readOnly]="readOnly()"
                [value]="value()"
                [required]="required()"
                [size]="size()"
                [maxLength]="maxLength()"
                [minRows]="minRows()"
                [maxRows]="maxRows()" />
        </ui-field>
    `,
    host: {
        'data-bspk': 'textarea-field',
        '[id]': 'controlId()+"-field"',
    },
    styleUrl: '../field/field.scss',
    encapsulation: ViewEncapsulation.None,
})
export class UITextareaField extends UITextarea implements AsSignal<TextareaFieldProps> {
    readonly valueChange = output<string | undefined>();
    readonly errorMessage = input<TextareaFieldProps['errorMessage']>(undefined);
    readonly label = input.required<TextareaFieldProps['label']>();
    readonly helperText = input<TextareaFieldProps['helperText']>(undefined);
    readonly labelTrailing = input<TextareaFieldProps['labelTrailing']>(undefined);
    readonly style = input<TextareaFieldProps['style']>(undefined);

    readonly labelledById = computed(() => labelledById(this.controlId()));

    readonly describedById = computed(
        () => this.ariaDescribedBy() || (this.helperText() && describedById(this.controlId())) || undefined,
    );
    readonly errorMessageId = computed(
        () => this.ariaErrorMessage() || (this.errorMessage() && errorMessageId(this.controlId())) || undefined,
    );

    readonly controlId = computed(() => this.id() || uniqueId('input-field-'));
}
