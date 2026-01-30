import { Component, ViewEncapsulation } from '@angular/core';
import { AsSignal } from '../../types/common';
import { TabOption, UITabList, UITabListUtility, TabListProps } from '../tab-list/tab-list';

export type SegmentedControlOption = Omit<TabOption, 'badge'>;
export type SegmentedControlProps = TabListProps<SegmentedControlOption>;

/**
 * Navigation tool that organizes content across different screens and views.
 *
 * @example
 *     <!-- Angular example -->
 *     <ui-segmented-control
 *     [label]="'Example Segments'"
 *     [options]="[
 *     { value: '1', label: 'Option 1' },
 *     { value: '2', label: 'Option 2' },
 *     { value: '3', label: 'Option 3' },
 *     ]"
 *     [value]="selected"
 *     (valueChange)="selected = $event">
 *     </ui-segmented-control>
 *
 * @name SegmentedControl
 * @phase Dev
 */
@Component({
    selector: 'ui-segmented-control',
    standalone: true,
    imports: [UITabList],
    template: `<ul
        ui-tab-list
        data-bspk="segmented-control"
        [options]="options()"
        [value]="value()"
        (valueChange)="valueChange.emit($event)"
        [label]="label()"
        [size]="size()"
        [width]="width()"
        [iconsOnly]="iconsOnly()"
        [id]="id()"></ul>`,
    styleUrl: './segmented-control.scss',
    encapsulation: ViewEncapsulation.None,
    host: {
        style: 'display: contents;',
    },
})
export class UISegmentedControl extends UITabListUtility implements AsSignal<SegmentedControlProps> {}
