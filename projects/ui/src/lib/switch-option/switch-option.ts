import { Component, input } from '@angular/core';
import { UIListItem } from '../list-item';
import { UISwitch } from '../switch';

/**
 * A control that allows users to choose one or more items from a list or turn an feature on or off.
 *
 * @name SwitchOption
 * @phase Dev
 */
@Component({
    selector: 'ui-switch-option',
    imports: [UISwitch, UIListItem],
    template: `<ui-list-item
        [label]="label() || ''"
        [subText]="description()"
        [disabled]="disabled()"
        data-bspk="switch-option"
        [attr.aria-disabled]="disabled() ? true : null"
        as="label">
        <span data-leading>
            <ui-switch
                [id]="id()"
                [name]="name()"
                [value]="value()"
                [checked]="checked()"
                [disabled]="disabled()"
                [ariaLabel]="ariaLabel()"
                (checkedChange)="checkedChange.emit($event)">
            </ui-switch
        ></span>
    </ui-list-item>`,
    host: {
        'data-bspk': 'switch-option',
    },
})
export class UISwitchOption extends UISwitch {
    /** The label of the option. Also used as the aria-label of the control. */
    readonly label = input<string>();

    /** The description of the option. */
    readonly description = input<string | undefined>(undefined);

    /** The aria-label for the switch element. Combines label and description if both are present. */
    override readonly ariaLabel = input<string | undefined>(this.computedAriaLabel());

    computedAriaLabel(): string | undefined {
        return this.description() ? `${this.label()} - ${this.description()}` : this.label();
    }
}
