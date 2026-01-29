import { Component, ViewEncapsulation, inject, ViewContainerRef, input, effect, ComponentRef } from '@angular/core';
import { BspkIcon } from '../../types/bspk-icon';

@Component({
    selector: 'ui-icon',
    template: '',
    styles: 'ui-icon { display: contents; }',
    encapsulation: ViewEncapsulation.None,
})
export class UIIcon {
    /** @see https://bspk.anywhere.re/icons */
    readonly icon = input.required<BspkIcon>();
    readonly width = input<string>();
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
