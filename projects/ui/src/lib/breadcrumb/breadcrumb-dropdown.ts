import { CommonModule } from '@angular/common';
import {
    Component,
    ChangeDetectionStrategy,
    ViewEncapsulation,
    input,
    computed,
    inject,
    OnInit,
    viewChild,
    ElementRef,
    Renderer2,
    signal,
} from '@angular/core';

import { AsInputSignal } from '../../types/common';
import { ArrowNavigationUtility } from '../../utils/arrow-navigation';
import { FloatingUtility } from '../../utils/floating';
import { keydownHandler } from '../../utils/keydown-handler';
import { OutsideClickUtility } from '../../utils/outside-click';
import { scrollLimitStyle, ScrollLimitStyleProps } from '../../utils/scroll-limit-style';
import { UIButton } from '../button';
import { IconChevronRight } from '../icons/chevron-right';
import { IconMoreHoriz } from '../icons/more-horiz';
import { UIListItem } from '../list-item';
import { UIMenu } from '../menu';
import { BreadcrumbItem } from './utils';

export type BreadcrumbDropdownProps = ScrollLimitStyleProps & {
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
            [attr.aria-expanded]="!!open()"
            [attr.aria-haspopup]="'listbox'"
            [attr.aria-controls]="open() ? menuId() : null"
            (onClick)="toggleDropdown()"
            #reference
            (keydown)="handleKeydown($event)" />
        <ui-menu
            #floating
            [id]="menuId()"
            label="Expanded breadcrumb"
            owner="Breadcrumb"
            role="listbox"
            [ngStyle]="menuStyle()">
            @for (item of itemsWithIds(); track item.href) {
                <ui-list-item
                    as="a"
                    [tabIndex]="-1"
                    [id]="item.id"
                    [label]="item.label"
                    [href]="item.href"
                    [active]="arrowNavigation.activeElementId === item.id" />
            }
        </ui-menu>
        <icon-chevron-right aria-hidden="true" width="24" />
    </li> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, UIButton, UIListItem, UIMenu, IconChevronRight],
    encapsulation: ViewEncapsulation.None,
    host: {
        style: 'display: contents;',
    },
})
export class UIBreadcrumbDropdown implements AsInputSignal<BreadcrumbDropdownProps>, OnInit {
    render = inject(Renderer2);

    outsideClick = new OutsideClickUtility();
    floating = new FloatingUtility(this.render);
    arrowNavigation = new ArrowNavigationUtility();

    readonly menu = viewChild('floating', { read: ElementRef });
    readonly reference = viewChild('reference', { read: ElementRef });

    readonly open = signal<boolean>(false);

    readonly items = input.required<BreadcrumbItem[]>();
    readonly id = input.required<string>();
    readonly scrollLimit = input<number | undefined>();
    readonly iconChevronRight = IconChevronRight;
    readonly iconMoreHoriz = IconMoreHoriz;
    readonly menuId = computed(() => `${this.id()}-menu`);
    readonly itemsWithIds = computed(() => this.items().map((item, index) => ({ ...item, id: this.itemId(index) })));

    readonly menuStyle = computed(() => {
        return {
            ...scrollLimitStyle(this.scrollLimit(), this.items().length),
            width: 'fit-content',
            maxWidth: '300px',
            minWidth: '150px',
            display: this.open() ? 'block' : 'none',
        };
    });

    get itemId(): (index: number) => string {
        return (index: number) => `${this.id()}-item-${index}`;
    }

    openMenu(): void {
        this.open.set(true);
        this.arrowNavigation.setActiveElementId(this.itemsWithIds()[0]?.id || null);
        this.outsideClick.updateProps({ disabled: false });
        this.floating.compute();
    }

    closeMenu(): void {
        this.open.set(false);
        this.arrowNavigation.setActiveElementId(null);
        this.outsideClick.updateProps({ disabled: true });
    }

    ngOnInit(): void {
        this.outsideClick.init({
            elements: [this.menu()?.nativeElement, this.reference()?.nativeElement],
            disabled: !this.open(),
            handleTabs: true,
            callback: () => this.closeMenu(),
        });

        this.arrowNavigation.init({
            ids: this.itemsWithIds().map((i) => i.id),
            defaultActiveId: undefined,
        });

        this.floating.init({
            offsetOptions: 4,
            refWidth: false,
            reference: this.reference()?.nativeElement,
            floating: this.menu()?.nativeElement,
        });
    }

    toggleDropdown(): void {
        if (this.open()) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    handleKeydown(event: KeyboardEvent): void {
        this.arrowNavigation.handleKeydown(event);

        const SpaceEnter = () => {
            document.querySelector<HTMLElement>(`[id="${this.arrowNavigation.activeElementId}"]`)?.click();
        };

        keydownHandler({
            Escape: () => this.closeMenu(),
            Enter: SpaceEnter,
            Space: SpaceEnter,
        })(event);
    }
}
