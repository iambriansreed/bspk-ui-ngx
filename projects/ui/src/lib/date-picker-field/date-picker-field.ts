import { Component, computed, input, ViewEncapsulation } from '@angular/core';
import { AsSignal } from '../../types/common';
import { uniqueId } from '../../utils/random';
import { DatePickerProps, UIDatePicker } from '../date-picker';
import { ControlFieldProps, UIField, describedById, errorMessageId, labelledById } from '../field';

export interface DatePickerFieldProps extends ControlFieldProps, DatePickerProps {}

/**
 * A field wrapper for the UIDatePicker component.
 *
 * This component takes properties from the Field and DatePicker components.
 *
 * @name DatePickerField
 * @phase UXReview
 *
 * @generated
 */
@Component({
    selector: 'ui-date-picker-field',
    standalone: true,
    imports: [UIField, UIDatePicker],
    template: `
        <ui-field
            [errorMessage]="errorMessage()"
            [label]="label()"
            [helperText]="helperText()"
            [labelTrailing]="labelTrailing()"
            [controlId]="controlId()"
            [style]="style()"
            [required]="required()">
            <ui-date-picker
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
        'data-bspk': 'date-picker-field',
        '[id]': 'controlId()+"-field"',
    },
    styleUrl: '../field/field.scss',
    encapsulation: ViewEncapsulation.None,
})
export class UIDatePickerField extends UIDatePicker implements AsSignal<DatePickerFieldProps> {
    readonly errorMessage = input<DatePickerFieldProps['errorMessage']>(undefined);
    readonly label = input.required<DatePickerFieldProps['label']>();
    readonly helperText = input<DatePickerFieldProps['helperText']>(undefined);
    readonly labelTrailing = input<DatePickerFieldProps['labelTrailing']>(undefined);
    readonly style = input<DatePickerFieldProps['style']>(undefined);
    readonly labelledById = computed(() => labelledById(this.controlId()));

    readonly describedById = computed(
        () => this.ariaDescribedBy() || (this.helperText() && describedById(this.controlId())) || undefined,
    );
    readonly errorMessageId = computed(
        () => this.ariaErrorMessage() || (this.errorMessage() && errorMessageId(this.controlId())) || undefined,
    );

    readonly controlId = computed(() => this.id() || uniqueId('UIDatePickerField-'));
}
