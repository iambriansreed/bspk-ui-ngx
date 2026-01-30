import { Component, Output, EventEmitter, ViewEncapsulation, input } from '@angular/core';
import { AsSignal, CommonProps } from '../../types/common';

export type SwitchProps = CommonProps<'ariaLabel' | 'disabled' | 'id' | 'name'> & {
    /**
     * Marks the control as checked.
     *
     * @default false
     */
    checked?: boolean;
    /** The value of the switch. */
    value: string;
};

/**
 * A control element that allows users to toggle between two states, typically representing on/off. This is the base
 * element and if used directly you must wrap it with a label.
 *
 * @name Switch
 * @phase Dev
 */
@Component({
    selector: 'ui-switch',
    standalone: true,
    imports: [],
    template: `
        <input
            type="checkbox"
            [attr.aria-label]="ariaLabel()"
            [checked]="checked()"
            [disabled]="disabled()"
            [attr.name]="name()"
            [attr.id]="id()"
            [attr.value]="value()"
            (change)="onInputChange($event)" />
        <span aria-hidden="true"></span>
    `,
    styleUrl: './switch.scss',
    encapsulation: ViewEncapsulation.None,
    host: {
        'data-bspk': 'switch',
    },
})
export class UISwitch implements AsSignal<SwitchProps> {
    @Output() checkedChange = new EventEmitter<boolean>();

    readonly value = input.required<SwitchProps['value']>();
    readonly checked = input<SwitchProps['checked']>();
    readonly ariaLabel = input<SwitchProps['ariaLabel']>(undefined);
    readonly name = input.required<SwitchProps['name']>();
    readonly id = input<SwitchProps['id']>(undefined);
    readonly disabled = input<SwitchProps['disabled']>();

    onInputChange(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        this.checkedChange.emit(inputElement.checked);
    }
}
