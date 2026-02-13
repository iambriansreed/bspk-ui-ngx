import { NgComponentOutlet } from '@angular/common';
import { Component, ViewEncapsulation, input } from '@angular/core';
import { BspkIcon } from '../../types/bspk-icon';
import { AsSignal } from '../../types/common';

export interface IconProps {
    /** The icon to display from the BSPK icon library. */
    icon: BspkIcon;
    /**
     * Optional width for the icon.
     *
     * @default '24'
     */
    width?: string;
}

/**
 * A component to display an icon from the BSPK icon library.
 *
 * @name Icon
 * @phase UXReview
 * @see https://bspk.anywhere.re/icons for available icons.
 */
@Component({
    selector: 'ui-icon',
    imports: [NgComponentOutlet],
    template: `@if (icon()) {
        <ng-container [ngComponentOutlet]="icon()" [ngComponentOutletInputs]="{ width: width() }"></ng-container>
    }`,
    styles: 'ui-icon { display: contents; }',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
})
export class UIIcon implements AsSignal<IconProps> {
    readonly icon = input.required<IconProps['icon']>();
    readonly width = input<IconProps['width']>('24');
}
