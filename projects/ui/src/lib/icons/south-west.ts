import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-south-west',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="SouthWest"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960">
        <path
            d="M240-200q-17 0-28.5-11.5T200-240v-320q0-17 11.5-28.5T240-600q17 0 28.5 11.5T280-560v224l436-436q11-11 28-11t28 11q11 11 11 28t-11 28L336-280h224q17 0 28.5 11.5T600-240q0 17-11.5 28.5T560-200H240Z" />
    </svg>`,
    styles: ['icon-south-west { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconSouthWest {
    @Input() width?: string;
}

/** Copyright 2026 Anywhere Real Estate - CC BY 4.0 */
