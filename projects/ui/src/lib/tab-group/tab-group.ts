import { Component, ViewEncapsulation, input } from '@angular/core';
import { AsSignal } from '../../types/common';
import { TabListProps, TabOption, UITabList, UITabListUtility } from '../tab-list/tab-list';

export type TabGroupSize = 'large' | 'medium' | 'small';

export type TabGroupProps = Omit<TabListProps<TabOption>, 'iconsOnly'> & {
    /**
     * When width is 'hug' this determines if the trailing underline should be showing. When width is 'fill' this
     * property isn't applicable.
     *
     * @default false
     */
    showTrail?: boolean;
};

/**
 * Navigation tool that organizes content across different screens and views.
 *
 * @example
 *     <!-- Angular example -->
 *     <ui-tab-group
 *     [label]="'Example Tabs'"
 *     [options]="[
 *     { value: '1', label: 'Option 1' },
 *     { value: '2', label: 'Option 2' },
 *     { value: '3', label: 'Option 3' },
 *     ]"
 *     [value]="selected"
 *     (valueChange)="selected = $event">
 *     </ui-tab-group>
 *
 * @name TabGroup
 * @phase Dev
 */
@Component({
    selector: 'ui-tab-group',
    standalone: true,
    imports: [UITabList],
    template: `<ul
        ui-tab-list
        data-bspk="tab-group"
        [options]="options()"
        [value]="value()"
        (valueChange)="valueChange.emit($event)"
        [label]="label()"
        [size]="size()"
        [width]="width()"
        [iconsOnly]="iconsOnly()"
        [id]="id()"
        [attr.data-show-trail]="showTrail() || undefined"
        [attr.data-bspk]="'tab-group'"></ul>`,
    styleUrl: './tab-group.scss',
    encapsulation: ViewEncapsulation.None,
    host: {
        style: 'display: contents;',
    },
})
export class UITabGroup extends UITabListUtility implements AsSignal<TabGroupProps> {
    /**
     * When width is 'hug' this determines if the trailing underline should be showing. When width is 'fill' this
     * property isn't applicable.
     *
     * @default false
     */
    readonly showTrail = input<TabGroupProps['showTrail']>();
}
