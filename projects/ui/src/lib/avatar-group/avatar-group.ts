import { CommonModule } from '@angular/common';
import { Component, input, signal, ViewEncapsulation } from '@angular/core';
import { uniqueId } from '../../utils/random';
import { UIAvatar, UIAvatarProps, SizeVariant } from '../avatar/avatar';
import { UIAvatarGroupOverflow } from './overflow';

export type AvatarItem = Pick<UIAvatarProps, 'color' | 'image' | 'initials' | 'name' | 'showIcon' | 'size'>;

@Component({
    selector: 'ui-avatar-group',
    standalone: true,
    imports: [CommonModule, UIAvatar, UIAvatarGroupOverflow],
    template: `
        <div
            data-bspk="avatar-group"
            [attr.data-max]="max()"
            [attr.data-size]="size()"
            [attr.data-variant]="variant()"
            [ngStyle]="style">
            <div data-wrap>
                @for (item of visibleItems; track item.id) {
                    <ui-avatar
                        [name]="item.name"
                        [image]="item.image"
                        [initials]="item.initials"
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
                        [menuId]="menuId()!"
                        [items]="overflowItems"
                        [size]="size()"
                        [menuReference]="overflowBtn" />
                }
            </div>
        </div>
    `,
    styleUrl: './avatar-group.scss',
    encapsulation: ViewEncapsulation.None,
    host: {
        style: `display: contents;`,
    },
})
export class UIAvatarGroup {
    readonly items = input<any[]>([]);
    readonly size = input<SizeVariant>('small');
    readonly max = input<number>(5);
    readonly variant = input<'spread' | 'stacked'>('stacked');
    readonly style = input<Record<string, string> | null>(null);
    readonly open = signal<boolean>(false);
    readonly activeElementId = signal<string | null>(null);
    readonly menuId = input<string>(uniqueId('avatar-group-menu'));

    get visibleItems(): (AvatarItem & { id: string })[] {
        // Use .value() for signals created by input()
        const items = this.items();
        const max = this.max();
        return items.slice(0, max).map((item, idx) => ({
            ...item,
            id: `${item.name?.replace(/\s+/g, '-').toLowerCase()}-${idx}`,
        }));
    }

    get overflowItems(): (AvatarItem & { id: string })[] {
        const items = this.items();
        const max = this.max();
        return items.slice(max).map((item, idx) => ({
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
        const items = this.items();
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
        const items = this.items();
        if (this.open() && items.length) {
            this.activeElementId.set(items[0].id);
        } else {
            this.activeElementId.set(null);
        }
    }

    closeMenu() {
        this.open.set(false);
    }

    onAvatarClick() {
        // Placeholder for avatar click handling
    }
}
