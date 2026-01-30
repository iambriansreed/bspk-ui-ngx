import { Component, computed, input } from '@angular/core';
import { AsSignal, CommonProps } from '../../types/common';
import { CheckboxProps, UICheckbox } from '../checkbox/checkbox';
import { UIListItem } from '../list-item';

export type CheckboxOptionProps = CheckboxProps &
    CommonProps<'style'> & {
        /**
         * The label of the option. Also used as the aria-label of the control.
         *
         * @required
         */
        label: string;
        /**
         * The description of the option.
         *
         * @type multiline
         */
        description?: string;
    };

/**
 * A control that allows users to choose one or more items from a list or turn a feature on or off.
 *
 * If only a checkbox button is needed, consider using the Checkbox component directly.
 *
 * @name CheckboxOption
 * @phase UXReview
 */
@Component({
    selector: 'ui-checkbox-option',
    imports: [UICheckbox, UIListItem],
    standalone: true,
    template: `<ui-list-item
        [label]="label() || ''"
        [subText]="description()"
        [disabled]="disabled()"
        data-bspk="checkbox-option"
        [attr.aria-disabled]="disabled() ? true : null"
        as="label">
        <span data-leading>
            <ui-checkbox
                [id]="id()"
                [name]="name()"
                [value]="value()"
                [checked]="checked()"
                [indeterminate]="indeterminate()"
                [disabled]="disabled()"
                [required]="required()"
                [invalid]="invalid()"
                [ariaLabel]="ariaLabel() || computedAriaLabel()"
                (checkedChange)="checkedChange.emit($event)"
                #input>
            </ui-checkbox>
        </span>
    </ui-list-item>`,
    host: {
        'data-bspk': 'checkbox-option',
    },
})
export class UICheckboxOption extends UICheckbox implements AsSignal<CheckboxOptionProps> {
    readonly label = input.required<CheckboxOptionProps['label']>();
    readonly description = input<CheckboxOptionProps['description']>(undefined);

    readonly computedAriaLabel = computed(() => {
        return this.ariaLabel() ?? (this.description() ? `${this.label()} - ${this.description()}` : this.label());
    });
}
