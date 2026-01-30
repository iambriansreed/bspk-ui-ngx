import { CommonModule } from '@angular/common';
import { Component, computed, input, signal, ViewEncapsulation } from '@angular/core';
import { AsSignal } from '../../types/common';
import { uniqueId } from '../../utils/random';
import { AvatarProps, SizeVariant } from '../avatar';
import { UIAvatar } from '../avatar/avatar';
import { UIAvatarGroupOverflow } from './overflow';

export type AvatarItem = Pick<AvatarProps, 'color' | 'image' | 'initials' | 'name' | 'showIcon'>;

export interface AvatarGroupProps {
    /**
     * The avatars to display in the group.
     *
     * @example
     *     [
     *         { name: 'Fezzik', image: '/avatar-01.png' },
     *         { name: 'Inigo Montoya', initials: 'IM', color: 'blue' },
     *         { name: 'Miracle Max', initials: 'MM', color: 'green' },
     *         { name: 'Princess Buttercup', showIcon: true },
     *     ];
     *
     * @type Array<AvatarItem>
     * @required
     */
    items: AvatarItem[];
    /**
     * Size of the avatar group.
     *
     * @default small
     */
    size?: SizeVariant;
    /**
     * The maximum number of avatars to display before showing the overflow menu.
     *
     * This is used to limit the number of avatars displayed in the group.
     *
     * Recommended to set this to a value between 3 and 5 for optimal display.
     *
     * @default 5
     * @minimum 1
     * @maximum 5
     */
    max?: number;
    /**
     * The variant of the avatar group.
     *
     * @default stacked
     */
    variant?: 'spread' | 'stacked';
}

/**
 * The AvatarGroup component is used to display a group of avatars, with support for overflow handling and different
 * display variants.
 *
 * @example
 *     <AvatarGroup
 *     items={[
 *     { name: 'Fezzik', image: '/avatar-01.png' },
 *     { name: 'Inigo Montoya', initials: 'IM', color: 'blue' },
 *     { name: 'Miracle Max', initials: 'MM', color: 'green' },
 *     { name: 'Princess Buttercup', showIcon: true },
 *     { name: 'Westley', initials: 'W', color: 'purple' },
 *     { name: 'Vincent', initials: 'V', image: '/avatar-04.png' },
 *     ]}
 *     size="medium"
 *     max={3}
 *     variant="spread"
 *     />;
 *
 * @name AvatarGroup
 * @phase Dev
 */
@Component({
    selector: 'ui-avatar-group',
    standalone: true,
    imports: [CommonModule, UIAvatar, UIAvatarGroupOverflow],
    template: `
        <div data-wrap>
            @for (item of visibleItems; track item.id) {
                <ui-avatar
                    [name]="item.name"
                    [image]="item.image"
                    [initials]="item.initials"
                    [color]="item.color"
                    [showIcon]="item.showIcon"
                    [id]="item.id"
                    [size]="size()"
                    (click)="onAvatarClick()"></ui-avatar>
            }
            @if (overflowItems.length > 0) {
                <button
                    #overflowBtn
                    [attr.aria-activedescendant]="activeElementId() || null"
                    [attr.aria-controls]="open() ? menuId : null"
                    [attr.aria-expanded]="open()"
                    aria-haspopup="menu"
                    [attr.aria-label]="overflowButtonLabel"
                    data-bspk="avatar"
                    data-bspk-owner="avatar-overflow"
                    [attr.data-size]="size()"
                    (blur)="closeMenu()"
                    (click)="toggleMenu()"
                    (keydown)="handleKeydown($event)"
                    role="combobox">
                    <span data-overflow-count>+{{ overflowItems.length }}</span>
                </button>
                <ui-avatar-group-overflow
                    [open]="open()"
                    [activeElementId]="activeElementId()"
                    [menuId]="menuId"
                    [items]="overflowItems"
                    [size]="size() || 'small'"
                    [menuReference]="overflowBtn" />
            }
        </div>
    `,
    styleUrl: './avatar-group.scss',
    encapsulation: ViewEncapsulation.None,
    host: {
        'data-bspk': 'avatar-group',
        '[attr.data-max]': 'max()',
        '[attr.data-size]': 'size()',
        '[attr.data-variant]': 'variant()',
    },
})
export class UIAvatarGroup implements AsSignal<AvatarGroupProps> {
    readonly menuId = uniqueId('avatar-group-menu');

    readonly items = input<AvatarGroupProps['items']>([]);
    readonly size = input<AvatarGroupProps['size']>('small');
    readonly max = input<AvatarGroupProps['max']>(5);
    readonly variant = input<AvatarGroupProps['variant']>('stacked');

    readonly open = signal<boolean>(false);
    readonly activeElementId = signal<string | undefined>(undefined);

    readonly itemsWithIds = computed(() => {
        return this.items().map((item, idx) => ({
            ...item,
            id: uniqueId(`avatar-group-item-${idx}`),
        }));
    });

    readonly maxSafe = computed(() => {
        if (this.max()) return this.max()! > this.items().length ? this.items().length : this.max();
        return 5;
    });

    get visibleItems(): (AvatarItem & { id: string })[] {
        return this.itemsWithIds()
            .slice(0, this.maxSafe())
            .map((item, idx) => ({
                ...item,
                id: `${item.name?.replace(/\s+/g, '-').toLowerCase()}-${idx}`,
            }));
    }

    get overflowItems(): (AvatarItem & { id: string })[] {
        return this.itemsWithIds()
            .slice(this.maxSafe())
            .map((item, idx) => ({
                ...item,
                id: `${item.name?.replace(/\s+/g, '-').toLowerCase()}-overflow-${idx}`,
            }));
    }

    get overflowButtonLabel(): string {
        const count = this.overflowItems.length;
        return `Show ${count} more avatar${count > 1 ? 's' : ''}`;
    }

    handleKeydown(event: KeyboardEvent) {
        if (!this.open) return;
        const items = this.itemsWithIds();
        const idx = items.findIndex((i) => i.id === this.activeElementId());
        if (event.key === 'ArrowDown') {
            const nextIdx = (idx + 1) % items.length;
            this.activeElementId.set(items[nextIdx].id);
            event.preventDefault();
        } else if (event.key === 'ArrowUp') {
            const prevIdx = (idx - 1 + items.length) % items.length;
            this.activeElementId.set(items[prevIdx].id);
            event.preventDefault();
        } else if (event.key === 'Escape') {
            this.open.set(false);
            event.preventDefault();
        }
    }

    toggleMenu() {
        this.open.set(!this.open());
        const items = this.itemsWithIds();
        if (this.open() && items.length) {
            this.activeElementId.set(items[0].id);
        } else {
            this.activeElementId.set(undefined);
        }
    }

    closeMenu() {
        this.open.set(false);
    }

    onAvatarClick() {
        // Placeholder for avatar click handling
    }
}
