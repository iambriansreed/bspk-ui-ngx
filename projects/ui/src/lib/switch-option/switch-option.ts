import { Component, computed, input } from '@angular/core';
import { AsSignal, CommonProps } from '../../types/common';
import { UIListItem } from '../list-item';
import { SwitchProps, UISwitch } from '../switch';

export type SwitchOptionProps = CommonProps<'style'> &
    SwitchProps & {
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
                [ariaLabel]="ariaLabel() || computedAriaLabel()"
                (checkedChange)="checkedChange.emit($event)">
            </ui-switch
        ></span>
    </ui-list-item>`,
    host: {
        'data-bspk': 'switch-option',
    },
})
export class UISwitchOption extends UISwitch implements AsSignal<SwitchOptionProps> {
    readonly label = input.required<SwitchOptionProps['label']>();
    readonly description = input<SwitchOptionProps['description']>(undefined);

    readonly computedAriaLabel = computed(() => {
        return this.ariaLabel() || (this.description() ? `${this.label()} - ${this.description()}` : this.label());
    });
}
