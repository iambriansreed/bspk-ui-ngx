import { Component, ViewEncapsulation, input } from '@angular/core';
import { AsSignal } from '../../types/common';
import { UIChip, ChipProps } from '../chip/chip';

export type ChipGroupItemProps = ChipProps & {
    /** Optional click handler for the chip item. */
    click?: () => void;
};

export interface ChipGroupProps {
    /**
     * Controls the overflow behavior of the chip group. If set to `scroll`, the chip group will be scrollable
     * horizontally. If set to `wrap`, the chip group will wrap to multiple lines as needed.
     *
     * @default wrap
     */
    overflow?: 'scroll' | 'wrap';
    /** Only Chip components should be used as items. */
    items?: ChipGroupItemProps[];
}

/**
 * A component that manages the layout of a group of chips.
 *
 * @name ChipGroup
 * @phase UXReview
 */
@Component({
    selector: 'ui-chip-group',
    standalone: true,
    imports: [UIChip],
    template: `
        @for (item of items(); track item) {
            <ui-chip
                [label]="item.label"
                [disabled]="item.disabled ?? false"
                [flat]="item.flat ?? false"
                [selected]="item.selected ?? false"
                [leadingIcon]="item.leadingIcon"
                [trailingIcon]="item.trailingIcon"
                [trailingBadge]="item.trailingBadge"
                (onClick)="item.click?.()" />
        }
    `,
    styleUrl: './chip-group.scss',
    encapsulation: ViewEncapsulation.None,
    host: {
        'data-bspk': 'chip-group',
        '[attr.data-scroll]': "overflow() === 'scroll' ? true : null",
    },
})
export class UIChipGroup implements AsSignal<ChipGroupProps> {
    readonly overflow = input<ChipGroupProps['overflow']>('wrap');
    readonly items = input<ChipGroupProps['items']>();
}
