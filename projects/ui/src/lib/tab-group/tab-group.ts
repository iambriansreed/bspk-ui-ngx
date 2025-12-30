import { Component, ViewEncapsulation, input } from '@angular/core';
import { UITabList } from '../tab-list/tab-list';

export type TabGroupSize = 'large' | 'medium' | 'small';

export interface TabGroupProps {}

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
        [attr.data-show-trail]="showTrail() || undefined"></ul>`,
    styleUrl: './tab-group.scss',
    encapsulation: ViewEncapsulation.None,
})
export class UITabGroup extends UITabList {
    /**
     * When width is 'hug' this determines if the trailing underline should be showing. When width is 'fill' this
     * property isn't applicable.
     *
     * @default false
     */
    readonly showTrail = input<boolean | undefined>();
}
