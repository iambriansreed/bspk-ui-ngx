import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { UIPagination } from '../pagination';
import { UIIcon } from '../icon';
import { sendAriaLiveMessage } from '../../utils/sendAriaLiveMessage';
import { IconArrowDownward, IconArrowUpward } from '../icons';
import { BspkIcon } from '../../types/bspk-icon';

/**
 * A component that displays data in a tabular format with support for sorting and pagination.
 *
 * @example
 *     <ui-table
 *     [data]="[{ id: 'ca', name: 'California', capital: 'Sacramento' }, { id: 'tx', name: 'Texas', capital: 'Austin' }, { id: 'fl', name: 'Florida', capital:'Tallahassee' }]"
 *     [columns]="[{ key: 'state', label: 'State', width: '160px', sort: 'string' },{ key: 'capital', label: 'Capital', width: '140px' }]"
 *     [pageSize]="5"
 *     size="medium"
 *     title="Sample State Capital Table">
 *     </ui-table>
 *
 * @name Table
 * @phase UXReview
 */

export type TableSize = 'large' | 'medium' | 'small' | 'x-large';

export type TableCellValue = unknown;

export interface TableRow {
    [key: string]: TableCellValue | TableCellValue[];
    id: string;
}

export type BuiltInColumnSorters = 'boolean' | 'date' | 'number' | 'string';
export type TableColumnSortingFn = (a: TableCellValue, b: TableCellValue) => number;

export interface TableColumn<R extends TableRow> {
    key: string;
    label: string;
    width?: string;
    align?: 'center' | 'left' | 'right';
    valign?: 'bottom' | 'center' | 'top';
    sort?: BuiltInColumnSorters | TableColumnSortingFn;
    formatter?: (row: R, size: TableSize) => unknown;
}

type SortOrder = 'asc' | 'desc';
type SortState = { key: string; order: SortOrder }[];

function parseDateTime(val: TableCellValue): number {
    let dateValue: any = val;
    if (typeof val === 'string' || typeof val === 'number') dateValue = new Date(val);
    return dateValue instanceof Date && !isNaN(dateValue.getTime()) ? dateValue.getTime() : 0;
}

const BUILT_IN_COLUMN_SORTERS: Record<BuiltInColumnSorters, TableColumnSortingFn> = {
    string: (a, b) => `${a}`.localeCompare(`${b}`),
    number: (a, b) => {
        const aNum = typeof a === 'number' ? a : Number(a) || 0;
        const bNum = typeof b === 'number' ? b : Number(b) || 0;
        return aNum - bNum;
    },
    boolean: (a, b) => (a === b ? 0 : a ? 1 : -1),
    date: (a, b) => parseDateTime(a) - parseDateTime(b),
};

@Component({
    selector: 'ui-table',
    standalone: true,
    imports: [CommonModule, UIPagination, UIIcon],
    templateUrl: './table.html',
    styleUrls: ['./table.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        'data-bspk': 'table',
    },
})
export class UITable<R extends TableRow> {
    /**
     * The data of the table.
     *
     * Array<TableRow>
     */
    @Input() data: R[] = [];
    /**
     * The column definitions of the table.
     *
     * @type Array<TableColumn>
     */
    @Input() columns: (TableColumn<R> | boolean)[] = [];
    /** The title of the table. */
    @Input() title?: string;
    /**
     * The size of the table.
     *
     * @default medium
     */
    @Input() size: TableSize = 'medium';
    /**
     * The number of rows per page.
     *
     * If the number of rows exceeds the page size, pagination controls will be displayed.
     *
     * @default 10
     */
    @Input() pageSize = 10;

    pageIndex = 0;
    sorting: SortState = [];

    get hasPagination(): boolean {
        return (this.data?.length || 0) > this.pageSize;
    }

    get normalizedColumns(): TableColumn<R>[] {
        return (this.columns || []).filter((c): c is TableColumn<R> => typeof c === 'object' && c !== null);
    }

    get totalColumns(): number {
        return this.normalizedColumns.length;
    }

    get totalPages(): number {
        const len = this.data?.length || 0;
        return Math.ceil(len / this.pageSize) || 1;
    }

    get rows(): R[] {
        const cols = this.normalizedColumns;
        const result = [...(this.data || [])];

        if (this.sorting.length) {
            result.sort((a, b) => {
                for (const { key, order } of this.sorting) {
                    const aValue = (a as any)[key];
                    const bValue = (b as any)[key];
                    const colSort = cols.find((c) => c.key === key)?.sort;
                    if (!colSort) continue;
                    const sortFn = typeof colSort === 'function' ? colSort : BUILT_IN_COLUMN_SORTERS[colSort];
                    const next = sortFn(aValue, bValue);
                    if (next !== 0) return next * (order === 'asc' ? 1 : -1);
                }
                return 0;
            });
        }

        const start = this.pageIndex * this.pageSize;
        const end = start + this.pageSize;
        return result.slice(start, end);
    }

    toggleSorting(key: string) {
        const exists = this.sorting.find((sort) => sort.key === key);
        const order: SortOrder | undefined = getNextOrder(exists?.order);

        // update to nextOrder
        if (order && exists) this.sorting = this.sorting.map((sort) => (sort.key === key ? { ...sort, order } : sort));

        // add nextOrder
        if (order && !exists) this.sorting = [...this.sorting, { key, order }];

        // remove sorting
        if (!order && exists) this.sorting = this.sorting.filter((sort) => sort.key !== key);

        const columnLabel = this.normalizedColumns.find((col) => col.key === key)?.label || key;
        sendAriaLiveMessage(`${order ? `Sorted ${order}ending` : 'Removed sorting'} by ${columnLabel}`);
    }

    trackRow(index: number, row: R) {
        return row.id;
    }

    setPageIndex(idx: number) {
        this.pageIndex = idx;
    }

    startRow(): number {
        const total = this.data.length;
        return total === 0 ? 0 : this.pageIndex * this.pageSize + 1;
    }

    endRow(): number {
        const end = this.pageIndex * this.pageSize + this.pageSize;
        return Math.min(end, this.data.length);
    }

    formatCell(value: unknown): string | null {
        if (value == null) return null;
        if (Array.isArray(value)) return value.map((v) => this.formatCell(v) ?? '').join(', ');
        if (typeof value === 'object') {
            console.warn('Unexpected object value:', value);
            return null;
        }
        return String(value);
    }

    gridTemplateColumns(): string {
        return this.normalizedColumns.map((c) => 'minmax(min-content,' + (c.width || '1fr') + ')').join(' ');
    }

    ariaSortForColumn(columnKey: string) {
        return this.sorting.find((s) => s.key === columnKey)?.order === 'asc'
            ? 'ascending'
            : this.sorting.find((s) => s.key === columnKey)?.order === 'desc'
              ? 'descending'
              : 'none';
    }

    sortIcon(columnKey: string): BspkIcon | null {
        const sortState = this.sorting.find((s) => s.key === columnKey);
        return sortState ? (sortState.order === 'asc' ? IconArrowUpward : IconArrowDownward) : null;
    }
}

function getNextOrder(currentOrder: SortOrder | undefined): SortOrder | undefined {
    if (!currentOrder) return 'asc';
    if (currentOrder === 'asc') return 'desc';
    return undefined;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
