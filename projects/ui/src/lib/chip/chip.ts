import { Component, Output, EventEmitter, input, computed } from '@angular/core';
import { BspkIcon } from '../../types/bspk-icon';
import { AsSignal } from '../../types/common';
import { BadgeProps, UIBadge } from '../badge';
import { UIIcon } from '../icon';

export type BadgeItem = Pick<BadgeProps, 'count' | 'size' | 'surfaceBorder'>;

export interface ChipProps {
    /**
     * Is the chip disabled.
     *
     * @default false
     */
    disabled?: boolean;
    /**
     * Is the chip elevated or flat. If flat the drop shadow is removed.
     *
     * @default false
     */
    flat?: boolean;
    /**
     * The label of the chip.
     *
     * @example
     *     Hello I am Chip
     *
     * @required
     */
    label: string;
    /**
     * Visual indication of whether the chip is currently selected.
     *
     * @default false
     */
    selected?: boolean;
    /**
     * The leading icon of the chip.
     *
     * @type BspkIcon
     */
    leadingIcon?: BspkIcon;
    /**
     * The trailing icon of the chip.
     *
     * You can only have one of the trailing options, trailingIcon **or** trailingBadge. If both are present the
     * trailingIcon will be visible.
     *
     * @type BspkIcon
     */
    trailingIcon?: BspkIcon;
    /**
     * The trailing Badge for use in the ChipFilter.
     *
     * If a trailingIcon is provided the Badge will **not** be visible.
     */
    trailingBadge?: BadgeItem;
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
export class UIChip implements AsSignal<ChipProps> {
    /** The function to call when the chip is clicked. */
    @Output() onClick = new EventEmitter<Event>();

    readonly disabled = input<ChipProps['disabled']>(false);
    readonly flat = input<ChipProps['flat']>(false);
    readonly label = input.required<ChipProps['label']>();
    readonly selected = input<ChipProps['selected']>(false);
    readonly leadingIcon = input<ChipProps['leadingIcon']>();
    readonly trailingIcon = input<ChipProps['trailingIcon']>();
    readonly trailingBadge = input<ChipProps['trailingBadge']>();

    readonly trailingBadgeSize = computed(() => {
        const size = this.trailingBadge()!.size!;
        return size === 'small' || size === 'x-small' ? size : 'small';
    });

    handleOnClick(event: MouseEvent) {
        if (!this.disabled()) {
            this.onClick.emit(event);
        }
    }
}
