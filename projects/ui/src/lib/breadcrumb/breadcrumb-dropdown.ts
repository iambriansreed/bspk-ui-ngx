import { OverlayModule, ConnectedPosition } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, input, computed, signal } from '@angular/core';

import { UIButton } from '../button';
import { IconChevronRight } from '../icons/chevron-right';
import { IconMoreHoriz } from '../icons/more-horiz';
import { UIListItem } from '../list-item';
import { UIMenu } from '../menu';
import { BreadcrumbItem } from './breadcrumb';

/**
 * The BreadcrumbDropdown component is used to display a dropdown menu within a breadcrumb navigation.
 *
 * @name BreadcrumbDropdown
 * @parent Breadcrumb
 */
@Component({
    selector: 'ui-breadcrumb-dropdown',
    template: `<li>
        <ui-button
            cdkOverlayOrigin
            #trigger="cdkOverlayOrigin"
            [icon]="iconMoreHoriz"
            [label]="'Access to ' + items().length + ' pages'"
            [iconOnly]="true"
            variant="tertiary"
            size="small"
            [attr.aria-expanded]="open()"
            [attr.aria-haspopup]="'listbox'"
            [attr.aria-controls]="open() ? menuId() : null"
            (onClick)="toggleDropdown()" />

        <ng-template
            cdk-connected-overlay
            [cdkConnectedOverlayOrigin]="trigger"
            [cdkConnectedOverlayOpen]="open()"
            [cdkConnectedOverlayHasBackdrop]="true"
            [cdkConnectedOverlayBackdropClass]="'cdk-overlay-transparent-backdrop'"
            [cdkConnectedOverlayPositions]="positions"
            (backdropClick)="open.set(false)">
            <ui-menu
                [id]="menuId()"
                label="Expanded breadcrumb"
                owner="Breadcrumb"
                role="listbox"
                [ngStyle]="dropdownStyles()">
                @for (item of items(); track item.href) {
                    <ui-list-item [label]="item.label" [href]="item.href" />
                }
            </ui-menu>
        </ng-template>

        <icon-chevron-right aria-hidden="true" />
    </li> `,
    styles: `
        :host {
            display: contents;
        }

        li {
            display: flex;
            gap: var(--spacing-sizing-02);
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, UIButton, UIListItem, UIMenu, IconChevronRight, OverlayModule],
    encapsulation: ViewEncapsulation.None,
})
export class UIBreadcrumbDropdown {
    /**
     * The array of breadcrumb items to display in the dropdown.
     *
     * @required
     */
    readonly items = input.required<BreadcrumbItem[]>();

    /**
     * The unique identifier for the breadcrumb (used to generate menu ID).
     *
     * @required
     */
    readonly id = input.required<string>();

    /**
     * The maximum number of items to display before scrolling.
     *
     * @example
     *     5;
     */
    readonly scrollLimit = input<number | undefined>();

    readonly iconChevronRight = IconChevronRight;
    readonly iconMoreHoriz = IconMoreHoriz;

    readonly open = signal(false);
    readonly menuId = computed(() => `${this.id()}-menu`);

    readonly positions: ConnectedPosition[] = [
        {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
            offsetY: 4,
        },
        {
            originX: 'start',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'bottom',
            offsetY: -4,
        },
    ];

    readonly dropdownStyles = computed(() => {
        const scrollLimit = this.scrollLimit();
        const itemCount = this.items().length;

        let maxHeight = 'auto';

        if (scrollLimit && itemCount > scrollLimit) {
            // Assume ~40px per item height
            maxHeight = `${scrollLimit * 40}px`;
        }

        return {
            'max-height': maxHeight,
            'overflow-y': scrollLimit && itemCount > scrollLimit ? 'auto' : 'visible',
        };
    });

    toggleDropdown(): void {
        this.open.update((value) => !value);
    }
}
