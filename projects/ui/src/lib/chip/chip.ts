import { Component, Output, EventEmitter, input, computed } from '@angular/core';
import { BspkIcon } from '../../types/bspk-icon';
import { BadgeProps, UIBadge } from '../badge';
import { UIIcon } from '../icon';

export interface ChipProps {
    disabled?: boolean;
    flat?: boolean;
    label: string;
    selected?: boolean;
    leadingIcon?: BspkIcon;
    trailingIcon?: BspkIcon;
    trailingBadge?: BadgeProps;
    click?: (event: Event) => void;
}

/**
 * Dynamically generated options that are suggested to the user as responses or prompts.
 *
 * @example
 *     import { Chip } from '@bspk/ui/Chip';
 *
 *     <Chip label="Label" click={() => sendSnackbar('Chip clicked!')}>
 *     Example Chip
 *     </Chip>;
 *
 * @name Chip
 * @phase Dev
 */
@Component({
    selector: 'ui-chip',
    standalone: true,
    imports: [UIBadge, UIIcon],
    template: `<button
        data-bspk="chip"
        [attr.data-disabled]="disabled() || undefined"
        [attr.data-flat]="flat() || undefined"
        [attr.data-selected]="selected() || undefined"
        data-touch-target-parent
        [disabled]="disabled()"
        (click)="handleOnClick($event)">
        @if (leadingIcon()) {
            <span [attr.aria-hidden]="true" data-chip-icon>
                <ui-icon [icon]="leadingIcon()!"></ui-icon>
            </span>
        }

        <span>{{ label() }}</span>

        @if (trailingIcon()) {
            <span [attr.aria-hidden]="true" data-chip-icon>
                <ui-icon [icon]="trailingIcon()!"></ui-icon>
            </span>
        }

        @if (trailingBadge() && !trailingIcon()) {
            <ui-badge
                [count]="trailingBadge()!.count"
                [size]="trailingBadgeSize()"
                [surfaceBorder]="trailingBadge()!.surfaceBorder ?? false"></ui-badge>
        }
        <span data-touch-target></span>
    </button>`,
    styleUrls: ['./chip.scss'],
    host: {
        style: 'display: contents;',
    },
})
export class UIChip {
    /** The function to call when the chip is clicked. */
    @Output() onClick = new EventEmitter<Event>();

    readonly trailingBadgeSize = computed(() => {
        const size = this.trailingBadge()!.size!;
        return size === 'small' || size === 'x-small' ? size : 'small';
    });

    /**
     * Is the chip disabled.
     *
     * @default false
     */
    readonly disabled = input(false);

    /**
     * Is the chip elevated or flat. If flat the drop shadow is removed.
     *
     * @default false
     */
    readonly flat = input(false);

    /**
     * The label of the chip.
     *
     * @example
     *     Hello I am Chip
     *
     * @required
     */
    readonly label = input.required<string>();

    /**
     * Visual indication of whether the chip is currently selected.
     *
     * @default false
     */
    readonly selected = input(false);

    /**
     * The leading icon of the chip.
     *
     * @type BspkIcon
     */
    readonly leadingIcon = input<BspkIcon>();

    /**
     * The trailing icon of the chip.
     *
     * You can only have one of the trailing options, trailingIcon **or** trailingBadge. If both are present the
     * trailingIcon will be visible.
     *
     * @type BspkIcon
     */
    readonly trailingIcon = input<BspkIcon>();

    /**
     * The trailing Badge for use in the ChipFilter.
     *
     * If a trailingIcon is provided the Badge will **not** be visible.
     */
    readonly trailingBadge = input<BadgeProps>();

    handleOnClick(event: MouseEvent) {
        if (!this.disabled()) {
            this.onClick.emit(event);
        }
    }
}
