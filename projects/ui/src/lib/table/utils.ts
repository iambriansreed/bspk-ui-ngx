import { Component, input, Type } from '@angular/core';
import { isValid } from 'date-fns';
import { AsSignal } from '../../types/common';

const parseDateTime = (val: TableCellValue) => {
    let dateValue = val;
    if (typeof val === 'string' || typeof val === 'number') dateValue = new Date(val).getTime();

    return dateValue instanceof Date && isValid(dateValue) ? dateValue.getTime() : 0;
};

export type BuiltInColumnSorters = 'boolean' | 'date' | 'number' | 'string';

export const BUILT_IN_COLUMN_SORTERS: Record<BuiltInColumnSorters, TableColumnSortingFn> = {
    string: (a: TableCellValue, b: TableCellValue) => `${a}`.localeCompare(`${b}`),
    number: (a: TableCellValue, b: TableCellValue) => {
        const aNum = typeof a === 'number' ? a : Number(a) || 0;
        const bNum = typeof b === 'number' ? b : Number(b) || 0;
        return aNum - bNum;
    },
    boolean: (a: TableCellValue, b: TableCellValue) => (a === b ? 0 : a ? 1 : -1),
    date: (a: TableCellValue, b: TableCellValue) => {
        return parseDateTime(a) - parseDateTime(b);
    },
} as const;

export type TableSize = 'large' | 'medium' | 'small' | 'x-large';

export type TableCellValue = unknown;

export interface TableRow {
    [key: string]: TableCellValue | TableCellValue[];
    id: string;
}

export type TableColumnSortingFn = (a: TableCellValue, b: TableCellValue) => number;

interface TableCellProps<R extends TableRow = TableRow> {
    /** The row data for the current cell. */
    row: R;
    /** The size of the table. */
    size: TableSize;
}

/**
 * Base class for table cell components.
 *
 * Use this class to create custom table cell components that can be used in table columns.
 *
 * @ignore
 */
@Component({
    standalone: true,
    template: ``,
})
export abstract class UITableCell<R extends TableRow = TableRow> implements AsSignal<TableCellProps<R>> {
    readonly row = input.required<TableCellProps<R>['row']>();
    readonly size = input.required<TableCellProps<R>['size']>();
}

export interface TableColumn<R extends TableRow = TableRow> {
    /**
     * The key of the column. This is used to access the data in the row.
     *
     * @type string
     */
    key: string;
    /**
     * The label of the column. This is used to display the column header.
     *
     * @type string
     */
    label: string;
    /**
     * The width of the column. This is used to set the width of the column.
     *
     * Used to set the value of
     * [grid-template-columns](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns)
     *
     * @default 1fr
     * @type string
     */
    width?: string;
    /**
     * The horizontal alignment of the column. This is used to set the text alignment of the column.
     *
     * @default left
     */
    align?: 'center' | 'left' | 'right';
    /**
     * The vertical alignment of the column. This is used to set the text alignment of the column.
     *
     * @default center
     */
    valign?: 'bottom' | 'center' | 'top';
    /**
     * The sorting function for the column.
     *
     * This can be a custom sorting function or one of the built-in sorting functions:
     *
     * `string`, `boolean`, `date`, or `number`.
     *
     * If unspecified, the column will not be sortable.
     */
    sort?: BuiltInColumnSorters | TableColumnSortingFn;
    /**
     * A formatter function for the cell values in the column.
     *
     * This function is called for each cell in the column and can be used to customize the display of the cell value.
     */
    formatter?: TableCellValueFormatter<R>;
    /**
     * A custom component to use for rendering the cell values in the column.
     *
     * This component will receive the following inputs:
     *
     * - `row`: The current row data.
     * - `size`: The table size.
     *
     * Use a component that extends `UITableCell<R>`.
     */
    component?: Type<UITableCell<R>>;
    /**
     * Whether to hide the header for this column.
     *
     * @default false
     */
    hideHeader?: boolean;
}

export type TableCellValueFormatter<R extends TableRow = TableRow> = (row: R, size: TableSize) => string | null;

export type SortOrder = 'asc' | 'desc';

export type SortState = { key: string; order: SortOrder }[];

export function formatCell(value: TableCellValue): string | null {
    if (Array.isArray(value)) return value.map(formatCell).join(', ');

    if (typeof value === 'object') {
        // eslint-disable-next-line no-console
        console.warn('Unexpected object value:', value);
        return null;
    }

    return `${value}`;
}
