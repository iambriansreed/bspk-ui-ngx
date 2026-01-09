import { Component, ViewEncapsulation, input } from '@angular/core';
import { CommonProps, AsInputSignal } from '../../types/common';

export type MenuProps = CommonProps<'ariaLabel' | 'id' | 'owner' | 'role'> & {
    /**
     * The width of the menu.
     *
     * @type HTMLElement.style.width
     * @exampleType string
     */
    width?: HTMLElement['style']['width'];
};

/**
 * A container housing a simple list of options presented to the customer to select one option at a time.
 *
 * @example
 *     <ui-menu>
 *     <ui-list-item label="List Item"></ui-list-item>
 *     <ui-list-item label="List Item"></ui-list-item>
 *     <ui-list-item label="List Item"></ui-list-item>
 *     </ui-menu>
 *
 * @name Menu
 * @phase Dev
 */
@Component({
    selector: 'ui-menu',
    standalone: true,
    // Host-based rendering: base is a div, so attach all attributes to host
    template: `<ng-content></ng-content>`,
    styleUrl: './menu.scss',
    encapsulation: ViewEncapsulation.None,
    host: {
        '[attr.aria-label]': 'ariaLabel() || null',
        '[attr.data-bspk-owner]': 'owner() || null',
        'data-bspk-utility': 'menu',
        '[attr.id]': 'id() || null',
        '[attr.role]': 'role() || null',
        '[style.width]': 'width() || null',
        tabindex: '-1',
    },
})
export class UIMenu implements AsInputSignal<MenuProps> {
    readonly ariaLabel = input<MenuProps['ariaLabel']>(undefined);
    readonly width = input<MenuProps['width']>(undefined);
    readonly owner = input<MenuProps['owner']>(undefined);
    readonly id = input<MenuProps['id']>(undefined);
    readonly role = input<MenuProps['role']>(undefined);
}
