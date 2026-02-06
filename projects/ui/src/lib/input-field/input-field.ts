import { Component, computed, input, ViewEncapsulation } from '@angular/core';
import { AsSignal } from '../../types/common';
import { uniqueId } from '../../utils/random';
import { FieldProps, UIField, describedById, errorMessageId, labelledById } from '../field';
import { UIInput } from '../input';

export interface InputFieldProps extends Omit<FieldProps, 'controlId' | 'label'> {}

/**
 * A field wrapper for the UIInput component.
 *
 * This component takes properties from the FormField and UIInput components.
 *
 * @name UIInputField
 * @phase UXReview
 *
 * @generated
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
                [disabled]="disabled()"
                [id]="controlId()"
                [invalid]="invalid()"
                [name]="name()"
                [readOnly]="readOnly()"
                [value]="value()"
                [required]="required()"
                [size]="size()" />
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

    readonly controlId = computed(() => this.inputId() || uniqueId('UIInputField-'));
}
