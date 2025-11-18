import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Icon } from '../icon';
import { Badge, BadgeProps } from '../badge';

export type ChipProps = {
    disabled?: boolean;
    flat?: boolean;
    label: string;
    selected?: boolean;
    leadingIcon?: string;
    trailingIcon?: string;
    trailingBadge?: BadgeProps;
    onClick?: (event: Event) => void;
};

@Component({
    selector: 'ui-chip',
    standalone: true,
    imports: [Badge, Icon],
    templateUrl: './chip.html',
    styleUrls: ['./chip.scss'],
})
export class Chip {
    /** Is the chip disabled. */
    @Input() disabled = false;

    /** Is the chip elevated or flat. If flat the drop shadow is removed. */
    @Input() flat = false;

    /** The label of the chip. */
    @Input() label!: string;

    /** Visual indication of whether the chip is currently selected. */
    @Input() selected = false;

    /** The leading icon of the chip. */
    @Input() leadingIcon?: string;

    /**
     * The trailing icon of the chip. You can only have one of the trailing options, trailingIcon **or** trailingBadge.
     * If both are present the trailingIcon will be visible.
     */
    @Input() trailingIcon?: string;

    /** The trailing Badge for use in the ChipFilter. If a trailingIcon is provided the Badge will **not** be visible. */
    @Input() trailingBadge?: BadgeProps;

    /** The function to call when the chip is clicked. */
    @Output() chipClick = new EventEmitter<Event>();

    onClick(event: Event) {
        if (!this.disabled) {
            this.chipClick.emit(event);
        }
    }
}
