import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, OnChanges, SimpleChanges, ViewEncapsulation, input } from '@angular/core';
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
 * @example
 *     ```html
 *     <ui-pagination [value]="currentPage" [numPages]="10" (onChange)="currentPage = $event"></ui-pagination>
 *     ```;
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
                (onClick)="previousPage()"
                size="small"
                variant="tertiary"
                owner="pagination"></ui-button>

            @if (numPages() > INPUT_TYPE_THRESHOLD) {
                <ng-container>
                    <form data-input-form (submit)="submitManual($event)">
                        <ui-input
                            ariaLabel="Page number"
                            [type]="'number'"
                            [showClearButton]="false"
                            [value]="inputValue"
                            (valueChange)="inputValue = $event!"
                            (blur)="submitManual()"
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
                        [attr.aria-label]="'Page ' + page"
                        [label]="page.toString()"
                        (onClick)="emit(page)"
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
                (onClick)="nextPage()"
                size="small"
                variant="tertiary"
                owner="pagination"></ui-button>
        </ng-container>
    }`,
    styleUrls: ['./pagination.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        'data-bspk': 'pagination',
        role: 'group',
    },
})
export class UIPagination implements OnChanges, AsSignal<PaginationProps> {
    /** Called when the page changes. */
    @Output() onChange = new EventEmitter<number>();

    readonly numPages = input(2);
    readonly value = input(1);

    // Internal string representation for the input field when large page counts.
    inputValue = '1';

    readonly INPUT_TYPE_THRESHOLD = INPUT_TYPE_THRESHOLD;

    ChevronRight = IconChevronRight;
    ChevronLeft = IconChevronLeft;

    ngOnChanges(changes: SimpleChanges) {
        if (changes['value']) {
            this.inputValue = String(this.value());
        }
    }

    emit(page: number) {
        const next = this.clamp(page);
        this.onChange.emit(next);
        sendAriaLiveMessage(`Page ${page} of ${this.numPages()}`);
    }

    previousPage() {
        if (this.value() > 1) this.emit(this.value() - 1);
    }

    nextPage() {
        if (this.value() < this.numPages()) this.emit(this.value() + 1);
    }

    submitManual(event?: Event) {
        if (event) event.preventDefault();
        const parsedValue = parseInt(this.inputValue || '', 10);
        if (isNaN(parsedValue)) {
            this.inputValue = String(this.value());
            return;
        }
        const next = this.clamp(parsedValue);
        this.emit(next);
        if (next !== parsedValue) this.inputValue = String(next);
    }

    inBounds(n: number): boolean {
        return n >= 1 && n <= this.numPages();
    }

    pages(): number[] {
        return Array.from({ length: this.numPages() }, (_, i) => i + 1);
    }

    label(): string {
        return `Go to page ${this.value()}`;
    }

    private clamp(page: number): number {
        if (page < 1) return 1;
        if (page > this.numPages()) return this.numPages();
        return page;
    }
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
