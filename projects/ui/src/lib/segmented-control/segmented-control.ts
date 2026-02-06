import { Component, ViewEncapsulation } from '@angular/core';
import { AsSignal } from '../../types/common';
import { TabOption, UITabList, UITabListUtility, TabListProps } from '../tab-list/tab-list';

//  /**
//      * The label of the tab. This is the text that will be displayed on the tab.
//      *
//      * @required
//      */
//     label: string;
//     /**
//      * Determines if the element is [disabled](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled).
//      *
//      * @default false
//      */
//     disabled?: boolean;
//     /**
//      * The value of the tab sent to valueChange when selected.
//      *
//      * If not provided, the label will be used as the value.
//      */
//     value: string;
//     /**
//      * The icon to display on the left side of the tab.
//      *
//      * @type BspkIcon
//      */
//     icon?: BspkIcon;
//     /**
//      * The icon to display on the left side of the tab when the tab is currently selected.
//      *
//      * @type BspkIcon
//      */
//     iconSelected?: BspkIcon;
//     /** The badge count to display on the tab */
//     badge?: number;
//     /** Optional id. If not provided, one is generated. */
//     id?: string;

export interface SegmentedControlOption {
    label: TabOption['label'];
    disabled?: TabOption['disabled'];
    value: TabOption['value'];
    icon?: TabOption['icon'];
    iconSelected?: TabOption['iconSelected'];
    id?: TabOption['id'];
}
export interface SegmentedControlProps extends TabListProps<SegmentedControlOption> {}

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
