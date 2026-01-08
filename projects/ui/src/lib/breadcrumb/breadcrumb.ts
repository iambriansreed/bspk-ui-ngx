import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, input, computed } from '@angular/core';

import { UIIcon } from '../icon';
import { IconChevronRight } from '../icons/chevron-right';
import { UILinkDirective } from '../link';
import { UITruncated } from '../truncated/truncated';
import { UITxtDirective } from '../txt';
import { UIBreadcrumbDropdown } from './breadcrumb-dropdown';

export interface BreadcrumbItem {
    /**
     * The label of the breadcrumb item.
     *
     * @example
     *     'Page 1';
     *
     * @required
     */
    label: string;
    /**
     * The href of the breadcrumb item.
     *
     * @example
     *     'https://bspk.anywhere.re';
     *
     * @required
     */
    href: string;
}

/**
 * Used to indicate the current page's location within a navigational hierarchy.
 *
 * @example
 *     ```html
 *     <ui-breadcrumb
 *         [items]="[
 *             { label: 'Brioche', href: '#brioche' },
 *             { label: 'Whole Wheat', href: '#whole-wheat' },
 *             { label: 'Sourdough', href: '#sourdough' },
 *             { label: 'Rye', href: '#rye' },
 *             { label: 'Multigrain', href: '#multigrain' },
 *             { label: 'Baguette', href: '#baguette' },
 *             { label: 'Focaccia', href: '#focaccia' },
 *             { label: 'Ciabatta', href: '#ciabatta' },
 *             { label: 'Pita', href: '#pita' },
 *             { label: 'Naan', href: '#naan' },
 *             { label: 'Flatbread', href: '#flatbread' }
 *         ]"
 *         [scrollLimit]="5">
 *     </ui-breadcrumb>
 *     ```;
 *
 * @name Breadcrumb
 * @phase Stable
 */
@Component({
    selector: 'ui-breadcrumb',
    template: `@if (shouldRender()) {
        <nav aria-label="Breadcrumb" [attr.data-bspk]="'breadcrumb'" [attr.id]="id()">
            <ol>
                <li>
                    <a ui-link [href]="firstItem().href">{{ firstItem().label }}</a>

                    <ui-icon [icon]="iconChevronRight" [attr.aria-hidden]="true" />
                </li>
                @if (items().length > 5) {
                    <ui-breadcrumb-dropdown [items]="middleItems()" [id]="id()" [scrollLimit]="scrollLimit()" />
                } @else {
                    @for (item of middleItems(); track item.href) {
                        <li>
                            <a [href]="item.href"
                                ><ui-truncated>{{ item.label }}</ui-truncated></a
                            >
                            <ui-icon [icon]="iconChevronRight" [attr.aria-hidden]="true" />
                        </li>
                    }
                }
                <li [attr.aria-current]="'page'" [ui-txt]="'body-base'">
                    {{ lastItem().label }}
                </li>
            </ol>
        </nav>
    }`,
    styleUrls: ['./breadcrumb.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, UIIcon, UITxtDirective, UIBreadcrumbDropdown, UITruncated, UILinkDirective],
    encapsulation: ViewEncapsulation.None,
})
export class UIBreadcrumb {
    /**
     * The array of breadcrumb items.
     *
     * If **less than 2** items are provided, the component will not render.
     *
     * @example
     *     [
     *         { label: 'Level 1', href: '#level-1' },
     *         { label: 'Level 2', href: '#level-2' },
     *         { label: 'Level 3', href: '#level-3' },
     *         { label: 'Level 4', href: '#level-4' },
     *         { label: 'Level 5', href: '#level-5' },
     *         { label: 'Level 6', href: '#level-6' },
     *         { label: 'Level 7', href: '#level-7' },
     *         { label: 'Level 8', href: '#level-8' },
     *         { label: 'Level 9', href: '#level-9' },
     *         { label: 'Level 10', href: '#level-10' },
     *     ];
     *
     * @required
     */
    readonly items = input.required<BreadcrumbItem[]>();

    /**
     * An optional unique identifier for the breadcrumb element.
     *
     * @example
     *     'example-breadcrumb';
     */
    readonly id = input<string>(`breadcrumb-${Math.random().toString(36).substring(2, 9)}`);

    /**
     * The maximum number of items to display before collapsing into a dropdown. Items between the first and last will
     * be collapsed if the total exceeds this limit.
     *
     * @example
     *     5;
     */
    readonly scrollLimit = input<number | undefined>();

    readonly iconChevronRight = IconChevronRight;

    /** Whether the component should render (checks if at least 2 items are provided) */
    readonly shouldRender = computed(() => this.items().length >= 2);

    /** The first breadcrumb item */
    readonly firstItem = computed(() => this.items()[0]);

    /** The last breadcrumb item */
    readonly lastItem = computed(() => this.items()[this.items().length - 1]);

    /** The middle items (between first and last) */
    readonly middleItems = computed(() =>
        this.items().length > 2 ? this.items().slice(1, this.items().length - 1) : [],
    );
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
