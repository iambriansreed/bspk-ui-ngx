import { Component, computed, input, ViewEncapsulation } from '@angular/core';
import { AsSignal } from '../../types/common';
import { uniqueId } from '../../utils/random';
import { ControlFieldProps, UIField, describedById, errorMessageId, labelledById } from '../field';
import { RadioGroupProps, UIRadioGroup } from '../radio-group';

export interface RadioGroupFieldProps extends ControlFieldProps, RadioGroupProps {}

/**
 * A field wrapper for the UIRadioGroup component.
 *
 * This component takes properties from the Field and RadioGroup components.
 *
 * @name RadioGroupField
 * @phase UXReview
 *
 * @generated
 */
@Component({
    selector: 'ui-radio-group-field',
    standalone: true,
    imports: [UIField, UIRadioGroup],
    template: `
        <ui-field
            [errorMessage]="errorMessage()"
            [label]="label()"
            [helperText]="helperText()"
            [labelTrailing]="labelTrailing()"
            [controlId]="controlId()"
            [style]="style()"
            [required]="required()">
            <ui-radio-group
                [ariaLabelledBy]="labelledById()"
                [ariaDescribedBy]="describedById()"
                [ariaErrorMessage]="errorMessageId()"
                (valueChange)="value.set($event)"
                [ariaLabel]="ariaLabel()"
                [disabled]="disabled()"
                [id]="controlId()"
                [invalid]="invalid()"
                [name]="name()"
                [readOnly]="readOnly()"
                [value]="value()"
                [required]="required()" />
        </ui-field>
    `,
    host: {
        'data-bspk': 'radio-group-field',
        '[id]': 'controlId()+"-field"',
    },
    styleUrl: '../field/field.scss',
    encapsulation: ViewEncapsulation.None,
})
export class UIRadioGroupField extends UIRadioGroup implements AsSignal<RadioGroupFieldProps> {
    readonly errorMessage = input<RadioGroupFieldProps['errorMessage']>(undefined);
    readonly label = input.required<RadioGroupFieldProps['label']>();
    readonly helperText = input<RadioGroupFieldProps['helperText']>(undefined);
    readonly labelTrailing = input<RadioGroupFieldProps['labelTrailing']>(undefined);
    readonly style = input<RadioGroupFieldProps['style']>(undefined);
    readonly labelledById = computed(() => labelledById(this.controlId()));

    readonly describedById = computed(
        () => this.ariaDescribedBy() || (this.helperText() && describedById(this.controlId())) || undefined,
    );
    readonly errorMessageId = computed(
        () => this.ariaErrorMessage() || (this.errorMessage() && errorMessageId(this.controlId())) || undefined,
    );

    readonly controlId = computed(() => this.id() || uniqueId('UIRadioGroupField-'));
}
