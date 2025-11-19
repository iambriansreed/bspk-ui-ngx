import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-man',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="Man"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960">
        <path
            d="M400-120v-240h-40q-17 0-28.5-11.5T320-400v-200q0-33 23.5-56.5T400-680h160q33 0 56.5 23.5T640-600v200q0 17-11.5 28.5T600-360h-40v240q0 17-11.5 28.5T520-80h-80q-17 0-28.5-11.5T400-120Zm80-600q-33 0-56.5-23.5T400-800q0-33 23.5-56.5T480-880q33 0 56.5 23.5T560-800q0 33-23.5 56.5T480-720Z" />
    </svg>`,
    styles: ['icon-man { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconMan {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
