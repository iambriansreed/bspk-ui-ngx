import { Component, computed, input, ViewEncapsulation } from '@angular/core';
import { AsSignal } from '../../types/common';
import { uniqueId } from '../../utils/random';
import { ControlFieldProps, UIField, describedById, errorMessageId, labelledById } from '../field';
import { TextareaProps, UITextarea } from '../textarea';

export interface TextareaFieldProps extends ControlFieldProps, TextareaProps {}

/**
 * A field wrapper for the UITextarea component.
 *
 * This component takes properties from the Field and Textarea components.
 *
 * @name TextareaField
 * @phase UXReview
 *
 * @generated
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
                (valueChange)="value.set($event)"
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
        'data-bspk': 'textarea-field',
        '[id]': 'controlId()+"-field"',
    },
    styleUrl: '../field/field.scss',
    encapsulation: ViewEncapsulation.None,
})
export class UITextareaField extends UITextarea implements AsSignal<TextareaFieldProps> {
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

    readonly controlId = computed(() => this.id() || uniqueId('UITextareaField-'));
}
