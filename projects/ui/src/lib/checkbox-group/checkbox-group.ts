import { Component, ViewEncapsulation, input, Output, EventEmitter } from '@angular/core';
import { AsSignal, FieldControlProps } from '../../types/common';
import { CheckboxOptionProps, UICheckboxOption } from '../checkbox-option';

export type CheckboxGroupOption = Omit<CheckboxOptionProps, 'name' | 'onChange'>;

export type CheckboxGroupProps = Omit<FieldControlProps<string[]>, 'readOnly'> & {
    /**
     * The options for the checkboxes.
     *
     * @example
     *     [
     *         { label: 'Option 1', value: 'option1' },
     *         { label: 'Option 2', value: 'option2' },
     *         { label: 'Option 3', value: 'option3' },
     *     ];
     *
     * @type Array<CheckboxGroupOption>
     * @required
     */
    options: CheckboxGroupOption[];
    /**
     * Whether to show a select all checkbox at the top of the list.
     *
     * @default false
     */
    selectAll?: boolean;
    /** The props for the select all checkbox. */
    selectAllProps?: Pick<CheckboxOptionProps, 'ariaLabel' | 'description' | 'label'>;
};

/**
 * A group of checkboxes that allows users to choose one or more items from a list or turn an feature on or off.
 *
 * For a more complete example with field usage, see the CheckboxGroupField component.
 *
 * @name CheckboxGroup
 * @phase Stable
 */
@Component({
    selector: 'ui-checkbox-group',
    standalone: true,
    imports: [UICheckboxOption],
    encapsulation: ViewEncapsulation.None,
    template: `
        <div role="group">
            @if (selectAll()) {
                <ui-checkbox-option
                    name="select-all"
                    [label]="selectAllProps()?.label ?? selectAllLabel"
                    [ariaLabel]="selectAllProps()?.ariaLabel ?? selectAllLabel"
                    [description]="selectAllProps()?.description"
                    [checked]="allChecked()"
                    [indeterminate]="someChecked() && !allChecked()"
                    [disabled]="disabled()"
                    [invalid]="invalid()"
                    [value]="'all'"
                    (checkedChange)="onSelectAllChange($event)">
                </ui-checkbox-option>
            }
            @for (option of options(); track option.value) {
                <ui-checkbox-option
                    name="checkbox-group-option-{{ option.value }}"
                    [label]="option.label"
                    [value]="option.value"
                    [checked]="isChecked(option.value)"
                    [description]="option.description"
                    [disabled]="disabled() || option.disabled"
                    [invalid]="invalid()"
                    (checkedChange)="onOptionChange(option.value, $event)">
                </ui-checkbox-option>
            }
        </div>
    `,
})
export class UICheckboxGroup implements AsSignal<CheckboxGroupProps> {
    @Output() valueChange = new EventEmitter<string[]>();

    readonly name = input.required<CheckboxGroupProps['name']>();
    readonly options = input<CheckboxGroupProps['options']>([]);
    readonly value = input<CheckboxGroupProps['value']>([]);
    readonly selectAll = input<CheckboxGroupProps['selectAll']>(false);
    readonly selectAllProps = input<CheckboxGroupProps['selectAllProps']>(undefined);
    readonly disabled = input<CheckboxGroupProps['disabled']>(false);
    readonly invalid = input<CheckboxGroupProps['invalid']>(false);

    selectAllLabel = 'All';

    isChecked(optionValue: string): boolean {
        const value = this.value();
        return Array.isArray(value) ? value.includes(optionValue) : false;
    }
    availableOptions() {
        return this.options().filter((o) => !o.disabled);
    }
    allChecked() {
        const opts = this.availableOptions();
        const val = this.value();
        return opts.length > 0 && Array.isArray(val) && opts.every((o) => val.includes(o.value));
    }
    someChecked() {
        const opts = this.availableOptions();
        const val = this.value();
        return Array.isArray(val) && opts.some((o) => val.includes(o.value));
    }
    onSelectAllChange(checked: boolean) {
        const opts = this.availableOptions();
        this.valueChange.emit(checked ? opts.map((o) => o.value) : []);
    }
    onOptionChange(optionValue: string, checked: boolean) {
        const value = this.value();
        const current: string[] = Array.isArray(value) ? value : [];
        if (checked) {
            this.valueChange.emit([...current, optionValue]);
        } else {
            this.valueChange.emit(current.filter((v) => v !== optionValue));
        }
    }
}
