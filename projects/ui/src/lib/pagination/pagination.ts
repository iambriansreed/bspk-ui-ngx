import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, computed, input, model, signal } from '@angular/core';
import { AsSignal } from '../../types/common';
import { sendAriaLiveMessage } from '../../utils/send-aria-live-message';
import { UIButton } from '../button/button';
import { IconChevronLeft, IconChevronRight } from '../icons';
import { UIInput } from '../input';

// After this point the manual input renders. With equal or fewer pages the individual page buttons render instead.
const INPUT_TYPE_THRESHOLD = 7;

export interface PaginationProps {
    /**
     * The number of pages to display in the pagination component.
     *
     * If there is only one page, the component will not render.
     *
     * @default 2
     */
    numPages: number;
    /**
     * The current page number.
     *
     * @default 1
     */
    value: number;
}

/**
 * A navigation component that allows customers to move between a range of listed content within a page into smaller
 * multiple micro pages.
 *
 * ```html
 * <ui-pagination [(value)]="page" [numPages]="10"></ui-pagination>
 * ```
 *
 * @name Pagination
 * @phase Dev
 */
@Component({
    selector: 'ui-pagination',
    standalone: true,
    imports: [CommonModule, UIButton, UIInput],
    template: `@if (numPages() > 1) {
        <ng-container>
            <ui-button
                [disabled]="!inBounds(value() - 1)"
                [icon]="ChevronLeft"
                [iconOnly]="true"
                [label]="value() === 1 ? 'First page' : 'Previous page (' + (value() - 1) + ')'"
                (onClick)="updateValue(value() - 1)"
                size="small"
                variant="tertiary"
                owner="pagination"></ui-button>

            @if (numPages() > INPUT_TYPE_THRESHOLD) {
                <ng-container>
                    <form data-input-form (submit)="updateValue(inputValue(), $event)">
                        <ui-input
                            ariaLabel="Page number"
                            [type]="'number'"
                            [showClearButton]="false"
                            [value]="inputValue() || '1'"
                            (valueChange)="this.inputValue.set($event!)"
                            (blur)="updateValue(inputValue())"
                            name="page-number" />
                        <span>of {{ numPages() }}</span>
                    </form>
                </ng-container>
            } @else {
                <ng-container *ngTemplateOutlet="pageButtons"></ng-container>
            }

            <ng-template #pageButtons>
                @for (page of pages(); track $index) {
                    <ui-button
                        [ariaLabel]="'Page ' + page"
                        [label]="page.toString()"
                        (onClick)="updateValue(page)"
                        size="small"
                        [variant]="value() === page ? 'primary' : 'tertiary'"
                        owner="pagination"></ui-button>
                }
            </ng-template>

            <ui-button
                [disabled]="!inBounds(value() + 1)"
                [icon]="ChevronRight"
                [iconOnly]="true"
                [label]="value() === numPages() ? 'Last page' : 'Next page (' + (value() + 1) + ')'"
                (onClick)="updateValue(value() + 1)"
                size="small"
                variant="tertiary"
                owner="pagination"></ui-button>
        </ng-container>
    }`,
    styleUrl: './pagination.scss',
    encapsulation: ViewEncapsulation.None,
    host: {
        'data-bspk': 'pagination',
        role: 'group',
    },
})
export class UIPagination implements AsSignal<PaginationProps> {
    readonly numPages = input<PaginationProps['numPages']>(2);
    readonly value = model<PaginationProps['value']>(1);

    readonly inputValue = signal<string>(this.value().toString());

    readonly INPUT_TYPE_THRESHOLD = INPUT_TYPE_THRESHOLD;

    ChevronRight = IconChevronRight;
    ChevronLeft = IconChevronLeft;

    readonly pages = computed<number[]>(() => Array.from({ length: this.numPages() }, (_, i) => i + 1));

    readonly label = computed<string>(() => `Go to page ${this.value()}`);

    updateValue(value: number | string, event?: Event) {
        if (event) event.preventDefault();
        const next = this.clamp(Number(value));
        this.value.set(next);
        sendAriaLiveMessage(`Page ${next} of ${this.numPages()}`);
        this.inputValue.set(next.toString());
    }

    inBounds(n: number): boolean {
        return n >= 1 && n <= this.numPages();
    }

    private clamp(page: number): number {
        if (page < 1) return 1;
        if (page > this.numPages()) return this.numPages();
        return page;
    }
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
