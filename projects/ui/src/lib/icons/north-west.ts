import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-north-west',
    template: `<svg
        [style.width]="width"
        data-bspk-name="NorthWest"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960"
    >
        <path
            d="M280-624v224q0 17-11.5 28.5T240-360q-17 0-28.5-11.5T200-400v-320q0-17 11.5-28.5T240-760h320q17 0 28.5 11.5T600-720q0 17-11.5 28.5T560-680H336l436 436q11 11 11 28t-11 28q-11 11-28 11t-28-11L280-624Z"
        />
    </svg>`,
    styles: ['icon-north-west { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconNorthWest {
    @Input() width?: string = '24px';
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
