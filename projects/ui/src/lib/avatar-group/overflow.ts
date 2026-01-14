import { CommonModule } from '@angular/common';
import { Component, input, viewChild, ElementRef, ViewEncapsulation, model } from '@angular/core';

// Assume these are your Angular equivalents:
import { UIAvatar, UIAvatarProps } from '../avatar/avatar';
import { UIFloatingDirective } from '../floating';
import { UIListItem } from '../list-item/list-item';
import { UIMenu } from '../menu/menu';

@Component({
    selector: 'ui-avatar-group-overflow',
    standalone: true,
    imports: [CommonModule, UIAvatar, UIListItem, UIMenu, UIFloatingDirective],
    template: `
        @if (open()) {
            <ng-container>
                <ui-menu
                    [ui-floating]="{ reference: menuReference() }"
                    [id]="menuId()"
                    [style.width]="'fit-content'"
                    [style.paddingRight]="'var(--spacing-sizing-04)'"
                    [style.--list-item-height]="'var(--spacing-sizing-12)'"
                    [style.maxHeight]="maxMenuHeight"
                    role="menu">
                    @for (item of items(); track item.id) {
                        <ui-list-item [active]="activeElementId() === item.id" [label]="item.name">
                            <span data-leading>
                                <ui-avatar
                                    [hideTooltip]="true"
                                    [size]="'small'"
                                    [id]="item.id"
                                    [name]="item.name"
                                    [image]="item.image"
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
                [initials]="item.initials"></ui-avatar>
        </ng-template>
    `,
    encapsulation: ViewEncapsulation.None,
    host: {
        style: `display: contents;`,
    },
})
export class UIAvatarGroupOverflow {
    readonly overflowBtn = viewChild<ElementRef<HTMLButtonElement>>('overflowBtn');
    readonly size = input<string>('medium');
    readonly items = input.required<UIAvatarProps[]>();
    readonly open = model<boolean>(false);
    readonly menuId = input.required<string>();
    readonly activeElementId = model<string | null>(null);
    readonly menuReference = input.required<HTMLElement>();

    get maxMenuHeight() {
        return this.items.length > 5 ? 'calc(var(--spacing-sizing-12) * 5)' : '';
    }

    closeMenu() {
        this.open.set(false);
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

    avatarTemplate(item: UIAvatarProps) {
        return {
            ...item,
            hideTooltip: true,
            size: 'small',
        };
    }
}
