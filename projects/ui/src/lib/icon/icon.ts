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
            if (typeof nextIcon !== 'function' || this.currentIcon === nextIcon) return;

            this.viewContainerRef.clear();
            this.componentRef = this.viewContainerRef.createComponent(nextIcon);
            this.currentIcon = nextIcon;
        });

        effect(() => {
            if (this.componentRef) this.componentRef.instance.width = this.width();
        });
    }
}
