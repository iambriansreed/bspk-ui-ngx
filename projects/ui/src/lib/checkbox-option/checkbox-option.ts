import { Component, input } from '@angular/core';
import { UICheckbox } from '../checkbox/checkbox';
import { UIListItem } from '../list-item';

/**
 * A control that allows users to choose one or more items from a list or turn a feature on or off.
 *
 * If only a checkbox button is needed, consider using the Checkbox component directly.
 *
 * @name CheckboxOption
 * @phase Utility
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
                [ariaLabel]="ariaLabel()"
                (checkedChange)="checkedChange.emit($event)"
                #input>
            </ui-checkbox>
        </span>
    </ui-list-item>`,
    host: {
        'data-bspk': 'checkbox-option',
    },
})
export class UICheckboxOption extends UICheckbox {
    /** The label of the option. Also used as the aria-label of the control. */
    readonly label = input<string>();

    /** The description of the option. */
    readonly description = input<string | undefined>(undefined);

    /** The aria-label for the radio element. Combines label and description if both are present. */
    override readonly ariaLabel = input<string | undefined>(this.computedAriaLabel());

    computedAriaLabel(): string | undefined {
        return this.description() ? `${this.label()} - ${this.description()}` : this.label();
    }
}
