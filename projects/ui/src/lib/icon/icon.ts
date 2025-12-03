import { Component, ViewEncapsulation, inject, Input, ViewContainerRef, AfterViewInit } from '@angular/core';
import { BspkIcon } from '../../types/bspk-icon';

@Component({
    selector: 'ui-icon',
    template: '',
    styles: 'ui-icon { display: contents; }',
    encapsulation: ViewEncapsulation.None,
})
export class UIIcon implements AfterViewInit {
    /** @see https://bspk.anywhere.re/icons */
    @Input() icon!: BspkIcon;
    @Input() width?: string;

    viewContainerRef = inject(ViewContainerRef);

    ngAfterViewInit() {
        if (typeof this.icon !== 'function') return;

        const icon = this.viewContainerRef.createComponent(this.icon).instance;

        icon.width = this.width;
    }
}
