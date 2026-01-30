import { Component, Output, EventEmitter, ViewEncapsulation, input } from '@angular/core';
import { AsSignal, FieldControlProps } from '../../types/common';
import { uniqueId } from '../../utils/random';

export type RadioProps = Omit<FieldControlProps<string>, 'onChange' | 'readOnly'> & {
    /**
     * Marks the radio as checked.
     *
     * @default false
     */
    checked?: boolean;
};

/**
 * A round control that allows user to choose one option from a set. This is the base element and if used directly you
 * must wrap it with a label. This will more often be used in the RadioOption or RadioGroup component.
 *
 * <ui-radio name="example" [value]="'option1'" (checkedChange)="selected = $event ? 'option1' : selected"
 * [disabled]="false" [invalid]="false" [required]="true" aria-label="Option 1"
 *
 * > </ui-radio>
 *
 * @name Radio
 * @phase Utility
 */
@Component({
    selector: 'ui-radio',
    standalone: true,
    imports: [],
    template: `<input
            [attr.name]="name()"
            [attr.id]="id()"
            [attr.aria-label]="ariaLabel()"
            type="radio"
            [attr.value]="value()"
            [checked]="checked()"
            [attr.checked]="checked() ? '' : null"
            [required]="required()"
            [attr.data-invalid]="invalid() ? true : null"
            [disabled]="disabled()"
            (change)="onInputChange($event)" />
        <span aria-hidden="true"></span>`,
    styleUrl: './radio.scss',
    encapsulation: ViewEncapsulation.None,
    host: {
        'data-bspk': 'radio',
    },
})
export class UIRadio implements AsSignal<RadioProps> {
    @Output() checkedChange = new EventEmitter<boolean>();

    readonly name = input.required<RadioProps['name']>();
    readonly value = input.required<RadioProps['value']>();
    readonly ariaLabel = input<RadioProps['ariaLabel']>(undefined);
    readonly checked = input<RadioProps['checked']>(false);
    readonly disabled = input<RadioProps['disabled']>(false);
    readonly id = input<RadioProps['id']>(uniqueId('radio'));
    readonly invalid = input<RadioProps['invalid']>(false);
    readonly required = input<RadioProps['required']>(false);

    onInputChange(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        this.checkedChange.emit(inputElement.checked);
    }
}
