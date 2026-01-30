import { CommonModule } from '@angular/common';
import {
    Component,
    ChangeDetectionStrategy,
    ViewEncapsulation,
    input,
    computed,
    signal,
    viewChild,
    AfterViewInit,
    OnDestroy,
} from '@angular/core';
import { AsSignal } from '../../types/common';
import { keydownHandler } from '../../utils/keydown-handler';
import { uniqueId } from '../../utils/random';
import { scrollLimitStyle, ScrollLimitStyleProps } from '../../utils/scroll-limit-style';
import { UIButton } from '../button';
import { UIFloatingDirective } from '../floating';
import { IconChevronRight } from '../icons/chevron-right';
import { IconMoreHoriz } from '../icons/more-horiz';
import { KeyNavigationUtility } from '../key-navigation';
import { UIListItem } from '../list-item';
import { UIMenu } from '../menu';
import { UIOutsideClickDirective } from '../outside-click';
import { BreadcrumbItem } from './utils';

export type BreadcrumbDropdownProps = ScrollLimitStyleProps & {
    items: BreadcrumbItem[];
    id?: string;
};

/**
 * The BreadcrumbDropdown component is used to display a dropdown menu within a breadcrumb navigation.
 *
 * @name BreadcrumbDropdown
 * @parent Breadcrumb
 */
@Component({
    selector: 'ui-breadcrumb-dropdown',
    imports: [
        CommonModule,
        UIButton,
        UIListItem,
        UIMenu,
        IconChevronRight,
        UIFloatingDirective,
        UIOutsideClickDirective,
    ],
    template: `
        <ui-button
            [icon]="iconMoreHoriz"
            [label]="'Access to ' + items().length + ' pages'"
            [iconOnly]="true"
            variant="tertiary"
            size="small"
            [ariaExpanded]="!!open() || null"
            [ariaHaspopup]="'listbox'"
            [ariaControls]="open() ? menuId() : null"
            (onClick)="toggleMenu()"
            #reference
            (keydown)="handleKeydown($event)"
            [id]="safeId() + '-reference'" />
        @if (open()) {
            <ui-menu
                [ui-outside-click]="{ callback: handleOutsideClick.bind(this) }"
                [ui-floating]="{ reference: referenceEl, offsetOptions: offset }"
                [id]="menuId()"
                label="Expanded breadcrumb"
                owner="Breadcrumb"
                [ariaRole]="'menu'"
                [ngStyle]="ngMenuStyle()">
                @for (item of menuItems(); track item.href) {
                    <ui-list-item
                        as="a"
                        [ariaRole]="'menuitem'"
                        [tabIndex]="-1"
                        [id]="item.id"
                        [label]="item.label"
                        [href]="item.href"
                        [active]="keyNavigation.activeElementId === item.id" />
                }
            </ui-menu>
        }
        <icon-chevron-right aria-hidden="true" width="24" />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        style: 'display: contents;',
    },
})
export class UIBreadcrumbDropdown implements AsSignal<BreadcrumbDropdownProps>, AfterViewInit, OnDestroy {
    readonly iconChevronRight = IconChevronRight;
    readonly iconMoreHoriz = IconMoreHoriz;

    keyNavigation = new KeyNavigationUtility();

    readonly reference = viewChild<UIButton>('reference');

    readonly id = input<BreadcrumbDropdownProps['id']>(uniqueId('dropdown'));
    readonly safeId = computed(() => this.id() || uniqueId('dropdown'));
    readonly menuId = computed(() => `${this.safeId()}-menu`);
    readonly scrollLimit = input<BreadcrumbDropdownProps['scrollLimit']>();
    readonly open = signal<boolean>(false);
    readonly items = input.required<BreadcrumbDropdownProps['items']>();
    readonly menuItems = computed(() =>
        this.items().map((item, index) => ({
            ...item,
            id: `${this.safeId()}-item-${index}`,
        })),
    );
    readonly ids = computed(() => this.menuItems().map((item) => item.id));

    readonly ngMenuStyle = computed(() => {
        return {
            ...scrollLimitStyle(this.scrollLimit(), this.items().length),
            width: 'fit-content',
            maxWidth: '300px',
            minWidth: '150px',
        };
    });

    get offset() {
        // Reads the CSS variable value at runtime, offsetOptions requires a number
        return parseInt(getComputedStyle(document.documentElement).getPropertyValue('--spacing-sizing-01'));
    }

    get referenceEl() {
        return this.reference()!.nativeElement as HTMLElement;
    }

    handleOutsideClick = (): void => {
        this.open.set(false);
    };

    handleKeydown(event: KeyboardEvent): void {
        if (!this.open()) {
            keydownHandler({
                ArrowDown: () => this.toggleMenu(true),
                'Ctrl+Option+Space': () => this.toggleMenu(true),
                Space: () => this.toggleMenu(true),
                Enter: () => this.toggleMenu(true),
            })(event);
            return;
        }

        const SpaceEnter = () => this.keyNavigation.activeElement?.click();

        // all key events run through keyNavigation utility when menu is open
        this.keyNavigation.handleKeydown(event, {
            'Ctrl+Option+Space': SpaceEnter,
            Space: SpaceEnter,
            Enter: SpaceEnter,
            Escape: () => {
                if (this.open()) this.toggleMenu(false);
            },
        });
    }

    ngAfterViewInit(): void {
        this.keyNavigation.init({ ids: this.ids() });
    }

    ngOnDestroy(): void {
        this.keyNavigation.destroy();
    }

    toggleMenu(force?: boolean) {
        if (force !== undefined) {
            this.open.set(force);
            return;
        }
        this.open.update((o) => !o);
    }
}
