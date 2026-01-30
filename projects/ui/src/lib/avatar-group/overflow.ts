import { CommonModule } from '@angular/common';
import { Component, input, viewChild, ElementRef, ViewEncapsulation, model } from '@angular/core';
import { AsSignal } from '../../types/common';
import { UIAvatar, AvatarProps } from '../avatar/avatar';
import { UIFloatingDirective } from '../floating';
import { UIListItem } from '../list-item/list-item';
import { UIMenu } from '../menu/menu';

export interface AvatarGroupOverflowProps {
    /**
     * The unique identifier for the overflow menu.
     *
     * @required
     */
    menuId: string;
    /**
     * The reference element for the floating menu positioning.
     *
     * @required
     */
    menuReference: HTMLElement;
    /**
     * The list of avatar items to display in the overflow menu.
     *
     * Each item should include the properties defined in AvatarProps along with a unique `id` property.
     *
     * @required
     */
    items: (AvatarProps & { id: string })[];
    /**
     * The currently active element ID in the overflow menu.
     *
     * This is used to manage keyboard navigation within the menu.
     */
    activeElementId: string | undefined;
    /**
     * Whether the overflow menu is open.
     *
     * @default false
     */
    open: boolean;
    /**
     * The size of the avatars in the overflow menu.
     *
     * @default medium
     */
    size?: AvatarProps['size'];
}

/** A component to display overflow avatars in an avatar group. */
@Component({
    selector: 'ui-avatar-group-overflow',
    standalone: true,
    imports: [CommonModule, UIAvatar, UIListItem, UIMenu, UIFloatingDirective],
    template: `
        @if (open()) {
            <ng-container>
                <ui-menu
                    [ui-floating]="{ reference: menuReference(), offsetOptions: offset }"
                    [id]="menuId()"
                    [style.width]="'fit-content'"
                    [style.paddingRight]="'var(--spacing-sizing-04)'"
                    [style.--list-item-height]="'var(--spacing-sizing-12)'"
                    [style.maxHeight]="maxMenuHeight"
                    [ariaRole]="'menu'">
                    @for (item of items(); track item.id) {
                        <ui-list-item
                            [ariaRole]="'menuitem'"
                            [active]="activeElementId() === item.id"
                            [label]="item.name">
                            <span data-leading>
                                <ui-avatar
                                    [hideTooltip]="true"
                                    [size]="'small'"
                                    [id]="item.id"
                                    [name]="item.name"
                                    [image]="item.image"
                                    [color]="item.color"
                                    [showIcon]="item.showIcon"
                                    [initials]="item.initials">
                                </ui-avatar>
                            </span>
                        </ui-list-item>
                    }
                </ui-menu>
            </ng-container>
        }
        <ng-template #avatar let-item>
            <ui-avatar
                [hideTooltip]="true"
                [size]="'small'"
                [id]="item.id"
                [name]="item.name"
                [image]="item.image"
                [color]="item.color"
                [showIcon]="item.showIcon"
                [initials]="item.initials"></ui-avatar>
        </ng-template>
    `,
    encapsulation: ViewEncapsulation.None,
    host: {
        style: `display: contents;`,
    },
})
export class UIAvatarGroupOverflow implements AsSignal<AvatarGroupOverflowProps> {
    readonly overflowBtn = viewChild<ElementRef<HTMLButtonElement>>('overflowBtn');

    readonly size = input<AvatarGroupOverflowProps['size']>('medium');
    readonly open = model<AvatarGroupOverflowProps['open']>(false);
    readonly menuId = input.required<AvatarGroupOverflowProps['menuId']>();
    readonly activeElementId = model<AvatarGroupOverflowProps['activeElementId']>();
    readonly menuReference = input.required<AvatarGroupOverflowProps['menuReference']>();
    readonly items = input.required<AvatarGroupOverflowProps['items']>();

    get offset() {
        // Reads the CSS variable value at runtime, offsetOptions requires a number
        return parseInt(getComputedStyle(document.documentElement).getPropertyValue('--spacing-sizing-01'));
    }

    get maxMenuHeight() {
        return this.items().length > 5 ? 'calc(var(--spacing-sizing-12) * 5)' : '';
    }

    closeMenu() {
        this.open.set(false);
    }

    toggleMenu() {
        this.open.set(!this.open());
        const items = this.items();
        if (this.open() && items.length) {
            this.activeElementId.set(items[0].id!);
        } else {
            this.activeElementId.set(undefined);
        }
    }

    avatarTemplate(item: AvatarProps) {
        return {
            ...item,
            hideTooltip: true,
            size: 'small',
        };
    }
}
