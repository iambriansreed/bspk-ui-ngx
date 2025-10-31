import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-smartphone',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="Smartphone"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960"
    >
        <path
            d="M280-40q-33 0-56.5-23.5T200-120v-720q0-33 23.5-56.5T280-920h400q33 0 56.5 23.5T760-840v720q0 33-23.5 56.5T680-40H280Zm0-120v40h400v-40H280Zm0-80h400v-480H280v480Zm0-560h400v-40H280v40Zm0 0v-40 40Zm0 640v40-40Z"
        />
    </svg>`,
    styles: ['icon-smartphone { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconSmartphone {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
