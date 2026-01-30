import { Component, ViewEncapsulation, inject, ViewContainerRef, input, effect, ComponentRef } from '@angular/core';
import { BspkIcon } from '../../types/bspk-icon';
import { AsSignal } from '../../types/common';

export interface IconProps {
    /** The icon to display from the BSPK icon library. */
    icon: BspkIcon;
    /** Optional width for the icon. */
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
    template: '',
    styles: 'ui-icon { display: contents; }',
    encapsulation: ViewEncapsulation.None,
})
export class UIIcon implements AsSignal<IconProps> {
    readonly icon = input.required<IconProps['icon']>();
    readonly width = input<IconProps['width']>();

    viewContainerRef = inject(ViewContainerRef);

    componentRef?: ComponentRef<any>;
    currentIcon?: BspkIcon;

    constructor() {
        effect(() => {
            const nextIcon = this.icon();

            if (typeof nextIcon !== 'function') return;

            if (this.currentIcon !== nextIcon) {
                this.viewContainerRef.clear();
                this.componentRef = this.viewContainerRef.createComponent(nextIcon);
                this.currentIcon = nextIcon;
            }

            if (this.componentRef) this.componentRef.instance.width = this.width();
        });
    }
}
