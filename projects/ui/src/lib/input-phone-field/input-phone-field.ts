import { Component, computed, input, ViewEncapsulation } from '@angular/core';
import { AsSignal } from '../../types/common';
import { uniqueId } from '../../utils/random';
import { ControlFieldProps, UIField, describedById, errorMessageId, labelledById } from '../field';
import { InputPhoneProps, UIInputPhone } from '../input-phone';

export interface InputPhoneFieldProps extends ControlFieldProps, InputPhoneProps {}

/**
 * A field wrapper for the UIInputPhone component.
 *
 * This component takes properties from the Field and InputPhone components.
 *
 * @name InputPhoneField
 * @phase UXReview
 *
 * @generated
 */
@Component({
    selector: 'ui-input-phone-field',
    standalone: true,
    imports: [UIField, UIInputPhone],
    template: `
        <ui-field
            [errorMessage]="errorMessage()"
            [label]="label()"
            [helperText]="helperText()"
            [labelTrailing]="labelTrailing()"
            [controlId]="controlId()"
            [style]="style()"
            [required]="required()">
            <ui-input-phone
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
        'data-bspk': 'input-phone-field',
        '[id]': 'controlId()+"-field"',
    },
    styleUrl: '../field/field.scss',
    encapsulation: ViewEncapsulation.None,
})
export class UIInputPhoneField extends UIInputPhone implements AsSignal<InputPhoneFieldProps> {
    readonly errorMessage = input<InputPhoneFieldProps['errorMessage']>(undefined);
    readonly label = input.required<InputPhoneFieldProps['label']>();
    readonly helperText = input<InputPhoneFieldProps['helperText']>(undefined);
    readonly labelTrailing = input<InputPhoneFieldProps['labelTrailing']>(undefined);
    readonly style = input<InputPhoneFieldProps['style']>(undefined);
    readonly labelledById = computed(() => labelledById(this.controlId()));

    readonly describedById = computed(
        () => this.ariaDescribedBy() || (this.helperText() && describedById(this.controlId())) || undefined,
    );
    readonly errorMessageId = computed(
        () => this.ariaErrorMessage() || (this.errorMessage() && errorMessageId(this.controlId())) || undefined,
    );

    readonly controlId = computed(() => this.id() || uniqueId('UIInputPhoneField-'));
}
