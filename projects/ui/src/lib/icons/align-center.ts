import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-align-center',
    template: `<svg
        [style.width]="width"
        data-bspk-name="AlignCenter"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960"
    >
        <path
            d="M120-440q-17 0-28.5-11.5T80-480q0-17 11.5-28.5T120-520h720q17 0 28.5 11.5T880-480q0 17-11.5 28.5T840-440H120Zm200-120q-17 0-28.5-11.5T280-600v-40q0-17 11.5-28.5T320-680h320q17 0 28.5 11.5T680-640v40q0 17-11.5 28.5T640-560H320Zm0 280q-17 0-28.5-11.5T280-320v-40q0-17 11.5-28.5T320-400h320q17 0 28.5 11.5T680-360v40q0 17-11.5 28.5T640-280H320Z"
        />
    </svg>`,
    styles: ['icon-align-center { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconAlignCenter {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
