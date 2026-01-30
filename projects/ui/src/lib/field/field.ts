import { Component, ViewEncapsulation, input } from '@angular/core';
import { AsSignal, CommonProps } from '../../types/common';
import { UIInlineAlert } from '../inline-alert/inline-alert';

export interface FieldProps extends CommonProps<'style'> {
    /** Displays an error message and marks the field as invalid. */
    errorMessage?: string;
    /**
     * The label of the field.
     *
     * @required
     */
    label: string;
    /**
     * This text provides additional context or instructions for the field.
     *
     * If an errorMessage is present, the helperText will not be displayed.
     */
    helperText?: string;
    /** The trailing element of the label. */
    labelTrailing?: string;
    /** Marks the field as required. */
    required?: boolean;
    /**
     * The id attribute of the form control rendered in children (e.g., Input, Select, Textarea). Used to associate the
     * label (htmlFor) with the control for accessibility. Must exactly match the control's id.
     *
     * @required
     */
    controlId: string;
}

/**
 * Wrapper component for form controls.
 *
 * Children should be one of the following: DatePicker, Input, InputNumber, InputPhone, Password, Select, Textarea,
 * RadioGroup, CheckboxGroup, or TimePicker.
 *
 * @example
 *     <ui-field
 *     controlId="example-control-id"
 *     helperText="This is an example description."
 *     label="Example label">
 *     <input
 *     aria-label="example aria-label"
 *     id="example-control-id"
 *     name="example-text" />
 *     </ui-field>
 *
 * @name Field
 * @phase Utility
 */
@Component({
    selector: 'ui-field',
    standalone: true,
    imports: [UIInlineAlert],
    template: `
        <label data-field-label [attr.htmlFor]="controlId()" [attr.id]="labelledById()">
            <span>{{ label() }}</span>
            @if (required()) {
                <span data-required>(Required)</span>
            }
            @if (labelTrailing()) {
                <span aria-hidden="true" data-trailing>{{ labelTrailing() }}</span>
            }
        </label>
        <ng-content />
        @if (errorMessage()) {
            <ui-inline-alert [id]="errorMessageId()" [label]="errorMessage()!" owner="field-error" variant="error" />
        } @else if (helperText()) {
            <p data-field-description [attr.id]="describedById()">{{ helperText() }}</p>
        }
    `,
    styleUrl: './field.scss',
    host: {
        'data-bspk-utility': 'field',
        role: 'group',
        '[style]': 'style() || null',
    },
    encapsulation: ViewEncapsulation.None,
})
export class UIField implements AsSignal<FieldProps> {
    readonly errorMessage = input<FieldProps['errorMessage']>();
    readonly label = input.required<FieldProps['label']>();
    readonly helperText = input<FieldProps['helperText']>();
    readonly labelTrailing = input<FieldProps['labelTrailing']>();
    readonly required = input<FieldProps['required']>();
    readonly controlId = input.required<FieldProps['controlId']>();
    readonly style = input<FieldProps['style']>();

    errorMessageId(): string {
        return errorMessageId(this.controlId());
    }

    describedById(): string {
        return describedById(this.controlId());
    }

    labelledById(): string {
        return labelledById(this.controlId());
    }
}

export function labelledById(controlId: string): string {
    return `${controlId}-label`;
}

export function errorMessageId(controlId: string): string {
    return `${controlId}-field-error`;
}

export function describedById(controlId: string): string {
    return `${controlId}-description`;
}
