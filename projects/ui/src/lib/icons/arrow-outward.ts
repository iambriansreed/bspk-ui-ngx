import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-arrow-outward',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="ArrowOutward"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960">
        <path
            d="M640-624 284-268q-11 11-28 11t-28-11q-11-11-11-28t11-28l356-356H280q-17 0-28.5-11.5T240-720q0-17 11.5-28.5T280-760h400q17 0 28.5 11.5T720-720v400q0 17-11.5 28.5T680-280q-17 0-28.5-11.5T640-320v-304Z" />
    </svg>`,
    styles: ['icon-arrow-outward { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconArrowOutward {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
