import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-arrow-insert',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="ArrowInsert"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960">
        <path
            d="M320-624v304q0 17-11.5 28.5T280-280q-17 0-28.5-11.5T240-320v-400q0-17 11.5-28.5T280-760h400q17 0 28.5 11.5T720-720q0 17-11.5 28.5T680-680H376l356 356q11 11 11 28t-11 28q-11 11-28 11t-28-11L320-624Z" />
    </svg>`,
    styles: ['icon-arrow-insert { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconArrowInsert {
    @Input() width?: string;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
