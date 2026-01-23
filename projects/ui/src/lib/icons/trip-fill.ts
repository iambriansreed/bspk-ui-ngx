import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-trip-fill',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="TripFill"
        data-filled="true"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960">
        <path
            d="M720-120v-600h80q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120h-80ZM400-720h160v-80H400v80Zm-80 600v-680q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v680H320Zm-160 0q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h80v600h-80Z" />
    </svg>`,
    styles: ['icon-trip-fill { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconTripFill {
    @Input() width?: string;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
