import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIButton } from '../button/button';
import { UIInput } from '../input';
import { IconChevronLeft, IconChevronRight } from '../icons';
import { sendAriaLiveMessage } from '../../utils/sendAriaLiveMessage';

// After this point the manual input renders. With equal or fewer pages
// the individual page buttons render instead (matches React implementation).
const INPUT_TYPE_THRESHOLD = 7;

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
 * @phase UXReview
 */
@Component({
    selector: 'ui-pagination',
    standalone: true,
    imports: [CommonModule, UIButton, UIInput],
    templateUrl: './pagination.html',
    styleUrls: ['./pagination.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        'data-bspk': 'pagination',
        role: 'group',
    },
})
export class UIPagination implements OnChanges {
    /**
     * The number of pages to display in the pagination component.
     *
     * If there is only one page, the component will not render.
     *
     * @default 2
     */
    @Input() numPages = 2;
    /**
     * The current (1-based) page number.
     *
     * @default 1
     */
    @Input() value = 1;

    /** Called when the page changes. */
    @Output() onChange = new EventEmitter<number>();

    // Internal string representation for the input field when large page counts.
    inputValue = '1';

    readonly INPUT_TYPE_THRESHOLD = INPUT_TYPE_THRESHOLD;

    ChevronRight = IconChevronRight;
    ChevronLeft = IconChevronLeft;

    ngOnChanges(changes: SimpleChanges) {
        if (changes['value']) {
            this.inputValue = String(this.value);
        }
    }

    private clamp(page: number): number {
        if (page < 1) return 1;
        if (page > this.numPages) return this.numPages;
        return page;
    }

    emit(page: number) {
        const next = this.clamp(page);
        this.onChange.emit(next);
        sendAriaLiveMessage(`Page ${page} of ${this.numPages}`);
    }

    previousPage() {
        if (this.value > 1) this.emit(this.value - 1);
    }

    nextPage() {
        if (this.value < this.numPages) this.emit(this.value + 1);
    }

    submitManual(event?: Event) {
        if (event) event.preventDefault();
        const parsedValue = parseInt(this.inputValue || '', 10);
        if (isNaN(parsedValue)) {
            this.inputValue = String(this.value);
            return;
        }
        const next = this.clamp(parsedValue);
        this.emit(next);
        if (next !== parsedValue) this.inputValue = String(next);
    }

    inBounds(n: number): boolean {
        return n >= 1 && n <= this.numPages;
    }

    pages(): number[] {
        return Array.from({ length: this.numPages }, (_, i) => i + 1);
    }

    label(): string {
        return `Go to page ${this.value}`;
    }
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
