import { Component, computed, input, ViewEncapsulation } from '@angular/core';
import { AsSignal } from '../../types/common';
import { uniqueId } from '../../utils/random';
import { FieldProps, UIField, describedById, errorMessageId, labelledById } from '../field';
import { UIInputNumber } from '../input-number';

export type InputNumberFieldProps = Omit<FieldProps, 'controlId' | 'label'>;

/**
 * A field wrapper for the UIInputNumber component.
 *
 * This component takes properties from the FormField and UIInputNumber components.
 *
 * @name UIInputNumberField
 * @phase UXReview
 *
 * @generated
 */
@Component({
    selector: 'ui-input-number-field',
    standalone: true,
    imports: [UIField, UIInputNumber],
    template: `
        <ui-field
            [errorMessage]="errorMessage()"
            [label]="label()"
            [helperText]="helperText()"
            [labelTrailing]="labelTrailing()"
            [controlId]="controlId()"
            [style]="style()"
            [required]="required()">
            <ui-input-number
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
        'data-bspk': 'input-number-field',
        '[id]': 'controlId()+"-field"',
    },
    styleUrl: '../field/field.scss',
    encapsulation: ViewEncapsulation.None,
})
export class UIInputNumberField extends UIInputNumber implements AsSignal<InputNumberFieldProps> {
    readonly errorMessage = input<InputNumberFieldProps['errorMessage']>(undefined);
    readonly label = input.required<FieldProps['label']>();
    readonly helperText = input<InputNumberFieldProps['helperText']>(undefined);
    readonly labelTrailing = input<InputNumberFieldProps['labelTrailing']>(undefined);
    readonly style = input<InputNumberFieldProps['style']>(undefined);
    readonly labelledById = computed(() => labelledById(this.controlId()));

    readonly describedById = computed(
        () => this.ariaDescribedBy() || (this.helperText() && describedById(this.controlId())) || undefined,
    );
    readonly errorMessageId = computed(
        () => this.ariaErrorMessage() || (this.errorMessage() && errorMessageId(this.controlId())) || undefined,
    );

    readonly controlId = computed(() => this.inputId() || uniqueId('UIInputNumberField-'));
}
