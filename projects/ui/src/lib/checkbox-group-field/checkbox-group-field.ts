import { Component, computed, input, ViewEncapsulation } from '@angular/core';
import { AsSignal } from '../../types/common';
import { uniqueId } from '../../utils/random';
import { UICheckboxGroup } from '../checkbox-group';
import { FieldProps, UIField, describedById, errorMessageId, labelledById } from '../field';

export type CheckboxGroupFieldProps = Omit<FieldProps, 'controlId' | 'label'>;

/**
 * A field wrapper for the UICheckboxGroup component.
 *
 * This component takes properties from the FormField and UICheckboxGroup components.
 *
 * @name UICheckboxGroupField
 * @phase UXReview
 *
 * @generated
 */
@Component({
    selector: 'ui-checkbox-group-field',
    standalone: true,
    imports: [UIField, UICheckboxGroup],
    template: `
        <ui-field
            [errorMessage]="errorMessage()"
            [label]="label()"
            [helperText]="helperText()"
            [labelTrailing]="labelTrailing()"
            [controlId]="controlId()"
            [style]="style()"
            [required]="required()">
            <ui-checkbox-group
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
                [required]="required()" />
        </ui-field>
    `,
    host: {
        'data-bspk': 'checkbox-group-field',
        '[id]': 'controlId()+"-field"',
    },
    styleUrl: '../field/field.scss',
    encapsulation: ViewEncapsulation.None,
})
export class UICheckboxGroupField extends UICheckboxGroup implements AsSignal<CheckboxGroupFieldProps> {
    readonly errorMessage = input<CheckboxGroupFieldProps['errorMessage']>(undefined);
    readonly label = input.required<FieldProps['label']>();
    readonly helperText = input<CheckboxGroupFieldProps['helperText']>(undefined);
    readonly labelTrailing = input<CheckboxGroupFieldProps['labelTrailing']>(undefined);
    readonly style = input<CheckboxGroupFieldProps['style']>(undefined);
    readonly labelledById = computed(() => labelledById(this.controlId()));

    readonly describedById = computed(
        () => this.ariaDescribedBy() || (this.helperText() && describedById(this.controlId())) || undefined,
    );
    readonly errorMessageId = computed(
        () => this.ariaErrorMessage() || (this.errorMessage() && errorMessageId(this.controlId())) || undefined,
    );

    readonly controlId = computed(() => this.id() || uniqueId('UICheckboxGroupField-'));
}
