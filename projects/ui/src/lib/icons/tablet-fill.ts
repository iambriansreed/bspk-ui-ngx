import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-tablet-fill',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="TabletFill"
        data-filled="true"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960"
    >
        <path
            d="M120-160q-33 0-56.5-23.5T40-240v-480q0-33 23.5-56.5T120-800h720q33 0 56.5 23.5T920-720v480q0 33-23.5 56.5T840-160H120Zm120-80h480v-480H240v480Z"
        />
    </svg>`,
    styles: ['icon-tablet-fill { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconTabletFill {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
