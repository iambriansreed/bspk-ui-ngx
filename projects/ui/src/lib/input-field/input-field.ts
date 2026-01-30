import { Component, computed, input, output, ViewEncapsulation } from '@angular/core';
import { AsSignal } from '../../types/common';
import { uniqueId } from '../../utils/random';
import { FieldProps, UIField, describedById, errorMessageId, labelledById } from '../field';
import { UIInput } from '../input';

export type InputFieldProps = Omit<FieldProps, 'controlId' | 'label'>;

/**
 * An input that allows users to enter text, numbers or symbols in a singular line. This is a utility element and is not
 * intended to be used directly but rather through the Input, and other components.
 *
 * @example
 *     <ui-input-field
 *     [value]="inputValue()"
 *     (valueChange)="updateInput($event)"
 *     id="default-input"
 *     name="default-input"
 *     label="Input Label "/>
 *
 * @name InputField
 * @phase UXReview
 */
@Component({
    selector: 'ui-input-field',
    standalone: true,
    imports: [UIField, UIInput],
    template: `
        <ui-field
            [errorMessage]="errorMessage()"
            [label]="label()"
            [helperText]="helperText()"
            [labelTrailing]="labelTrailing()"
            [controlId]="controlId()"
            [style]="style()"
            [required]="required()">
            <ui-input
                [ariaLabelledBy]="labelledById()"
                [ariaDescribedBy]="describedById()"
                [ariaErrorMessage]="errorMessageId()"
                (valueChange)="valueChange.emit($event)"
                [ariaLabel]="ariaLabel()"
                [autoComplete]="autoComplete()"
                [disabled]="disabled()"
                [id]="controlId()"
                [invalid]="invalid()"
                [leading]="leading()"
                [name]="name()"
                [owner]="'input-field'"
                [placeholder]="placeholder()"
                [placeholder]="placeholder()"
                [readOnly]="readOnly()"
                [value]="value()"
                [required]="required()"
                [showClearButton]="showClearButton()"
                [size]="size()"
                [trailing]="trailing()"
                [type]="type()" />
        </ui-field>
    `,
    host: {
        'data-bspk': 'input-field',
        '[id]': 'controlId()+"-field"',
    },
    styleUrl: '../field/field.scss',
    encapsulation: ViewEncapsulation.None,
})
export class UIInputField extends UIInput implements AsSignal<InputFieldProps> {
    readonly valueChange = output<string | undefined>();

    readonly errorMessage = input<InputFieldProps['errorMessage']>(undefined);
    readonly label = input.required<FieldProps['label']>();
    readonly helperText = input<InputFieldProps['helperText']>(undefined);
    readonly labelTrailing = input<InputFieldProps['labelTrailing']>(undefined);
    readonly style = input<InputFieldProps['style']>(undefined);

    readonly labelledById = computed(() => labelledById(this.controlId()));

    readonly describedById = computed(
        () => this.ariaDescribedBy() || (this.helperText() && describedById(this.controlId())) || undefined,
    );
    readonly errorMessageId = computed(
        () => this.ariaErrorMessage() || (this.errorMessage() && errorMessageId(this.controlId())) || undefined,
    );

    readonly controlId = computed(() => this.id() || uniqueId('input-field-'));
}
