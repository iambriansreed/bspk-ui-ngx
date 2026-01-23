import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, input, computed } from '@angular/core';

import { AsInputSignal, CommonProps } from '../../types/common';
import { uniqueId } from '../../utils/random';
import { ScrollLimitStyleProps } from '../../utils/scroll-limit-style';
import { IconChevronRight } from '../icons/chevron-right';
import { UILinkDirective } from '../link';
import { UITxtDirective } from '../txt';
import { UIBreadcrumbDropdown } from './breadcrumb-dropdown';
import { BreadcrumbItem } from './utils';

export type BreadcrumbProps = CommonProps<'id'> &
    ScrollLimitStyleProps & {
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
         * @type Array<BreadcrumbItem>
         * @required
         */
        items: BreadcrumbItem[];
    };

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
 * @phase Dev
 */
@Component({
    selector: 'ui-breadcrumb',
    template: `@if (shouldRender()) {
        <nav aria-label="Breadcrumb" [attr.data-bspk]="'breadcrumb'" [attr.id]="id()">
            <ol>
                <li>
                    <a ui-link [href]="firstItem().href">{{ firstItem().label }}</a>
                    <icon-chevron-right aria-hidden="true" width="24" />
                </li>
                @if (items().length > 5) {
                    <li>
                        <ui-breadcrumb-dropdown [items]="middleItems()" [id]="id()!" [scrollLimit]="scrollLimit()" />
                    </li>
                } @else {
                    @for (item of middleItems(); track item.href) {
                        <li>
                            <a ui-link [href]="item.href">{{ item.label }}</a>
                            <icon-chevron-right aria-hidden="true" width="24" />
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
    imports: [CommonModule, UITxtDirective, UIBreadcrumbDropdown, IconChevronRight, UILinkDirective],
    encapsulation: ViewEncapsulation.None,
})
export class UIBreadcrumb implements AsInputSignal<BreadcrumbProps> {
    readonly items = input.required<BreadcrumbProps['items']>();
    readonly id = input<BreadcrumbProps['id']>(uniqueId('breadcrumb-'));
    readonly scrollLimit = input<BreadcrumbProps['scrollLimit']>();

    readonly shouldRender = computed(() => this.items().length >= 2);
    readonly firstItem = computed(() => this.items()[0]);
    readonly lastItem = computed(() => this.items()[this.items().length - 1]);
    readonly middleItems = computed(() =>
        this.items().length > 2 ? this.items().slice(1, this.items().length - 1) : [],
    );
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
