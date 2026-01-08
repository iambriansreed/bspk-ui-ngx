import { CommonModule } from '@angular/common';
import {
    Component,
    ChangeDetectionStrategy,
    ViewEncapsulation,
    input,
    computed,
    signal,
    Renderer2,
    inject,
    OnInit,
    viewChild,
    ElementRef,
} from '@angular/core';

import { AsInputSignal } from '../../types/common';
import { Floating } from '../../utils/floating';
import { scrollListItemsStyle, ScrollListItemsStyleProps } from '../../utils/scrollListItemsStyle';
import { UIButton } from '../button';
import { IconChevronRight } from '../icons/chevron-right';
import { IconMoreHoriz } from '../icons/more-horiz';
import { UIListItem } from '../list-item';
import { UIMenu } from '../menu';

export interface BreadcrumbItem {
    /**
     * The label of the breadcrumb item.
     *
     * @example
     *     Page 1
     *
     * @required
     */
    label: string;
    /**
     * The href of the breadcrumb item.
     *
     * @example
     *     https://bspk.anywhere.re
     *
     * @required
     */
    href: string;
}

export type BreadcrumbDropdownProps = ScrollListItemsStyleProps & {
    items: BreadcrumbItem[];
    id: string;
};

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
            [icon]="iconMoreHoriz"
            [label]="'Access to ' + items().length + ' pages'"
            [iconOnly]="true"
            variant="tertiary"
            size="small"
            [attr.aria-expanded]="open()"
            [attr.aria-haspopup]="'listbox'"
            [attr.aria-controls]="open() ? menuId() : null"
            (onClick)="toggleDropdown()"
            #reference />
        <ui-menu
            #floating
            [id]="menuId()"
            label="Expanded breadcrumb"
            owner="Breadcrumb"
            role="listbox"
            [ngStyle]="menuStyle()">
            @for (item of items(); track item.href) {
                <ui-list-item [label]="item.label" [href]="item.href" />
            }
        </ui-menu>
        <icon-chevron-right aria-hidden="true" />
    </li> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, UIButton, UIListItem, UIMenu, IconChevronRight],
    encapsulation: ViewEncapsulation.None,
    host: {
        style: 'display: contents;',
    },
})
export class UIBreadcrumbDropdown implements AsInputSignal<BreadcrumbDropdownProps>, OnInit {
    renderer = inject(Renderer2);
    floating = new Floating(this.renderer);

    scrollListItemsStyle = scrollListItemsStyle;

    readonly items = input.required<BreadcrumbItem[]>();
    readonly id = input.required<string>();
    readonly scrollLimit = input<number | undefined>();
    readonly iconChevronRight = IconChevronRight;
    readonly iconMoreHoriz = IconMoreHoriz;
    readonly open = signal(false);
    readonly menuId = computed(() => `${this.id()}-menu`);

    readonly menu = viewChild('floating', { read: ElementRef });
    readonly reference = viewChild('reference', { read: ElementRef });

    readonly menuStyle = computed(() => {
        return {
            ...this.scrollListItemsStyle(this.scrollLimit(), this.items().length),
            display: this.open() ? 'block' : 'none',
            width: 'fit-content',
            maxWidth: '300px',
            minWidth: '150px',
        };
    });

    ngOnInit(): void {
        console.log({
            reference: this.reference()?.nativeElement,
            floating: this.menu()?.nativeElement,
        });

        this.floating.setProps({
            offsetOptions: 4,
            refWidth: false,
            reference: this.reference()?.nativeElement,
            floating: this.menu()?.nativeElement,
        });
    }

    toggleDropdown(): void {
        const next = !this.open();

        this.open.set(next);

        if (next) this.floating.compute();
    }
}
