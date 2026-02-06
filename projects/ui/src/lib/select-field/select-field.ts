import { Component, computed, input, ViewEncapsulation } from '@angular/core';
import { AsSignal } from '../../types/common';
import { uniqueId } from '../../utils/random';
import { FieldProps, UIField, describedById, errorMessageId, labelledById } from '../field';
import { UISelect } from '../select';

export type SelectFieldProps = Omit<FieldProps, 'controlId' | 'label'>;

/**
 * A field wrapper for the UISelect component.
 *
 * This component takes properties from the FormField and UISelect components.
 *
 * @name UISelectField
 * @phase UXReview
 *
 * @generated
 */
@Component({
    selector: 'ui-select-field',
    standalone: true,
    imports: [UIField, UISelect],
    template: `
        <ui-field
            [errorMessage]="errorMessage()"
            [label]="label()"
            [helperText]="helperText()"
            [labelTrailing]="labelTrailing()"
            [controlId]="controlId()"
            [style]="style()"
            [required]="required()">
            <ui-select
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
                [items]="items()"
                [size]="size()" />
        </ui-field>
    `,
    host: {
        'data-bspk': 'select-field',
        '[id]': 'controlId()+"-field"',
    },
    styleUrl: '../field/field.scss',
    encapsulation: ViewEncapsulation.None,
})
export class UISelectField extends UISelect implements AsSignal<SelectFieldProps> {
    readonly errorMessage = input<SelectFieldProps['errorMessage']>(undefined);
    readonly label = input.required<FieldProps['label']>();
    readonly helperText = input<SelectFieldProps['helperText']>(undefined);
    readonly labelTrailing = input<SelectFieldProps['labelTrailing']>(undefined);
    readonly style = input<SelectFieldProps['style']>(undefined);

    readonly labelledById = computed(() => labelledById(this.controlId()));

    readonly describedById = computed(
        () => this.ariaDescribedBy() || (this.helperText() && describedById(this.controlId())) || undefined,
    );
    readonly errorMessageId = computed(
        () => this.ariaErrorMessage() || (this.errorMessage() && errorMessageId(this.controlId())) || undefined,
    );

    readonly controlId = computed(() => this.inputId() || uniqueId('UISelectField-'));
}
