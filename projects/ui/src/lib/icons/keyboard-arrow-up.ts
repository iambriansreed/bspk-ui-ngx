import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-keyboard-arrow-up',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="KeyboardArrowUp"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960">
        <path
            d="M480-528 324-372q-11 11-28 11t-28-11q-11-11-11-28t11-28l184-184q12-12 28-12t28 12l184 184q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-528Z" />
    </svg>`,
    styles: ['icon-keyboard-arrow-up { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconKeyboardArrowUp {
    @Input() width?: string;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
