import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'icon-trending-down',
    template: `<svg
        [attr.width]="width"
        data-bspk-name="TrendingDown"
        data-type="material"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 -960 960 960">
        <path
            d="M744-320 536-526 433-423q-23 23-57 23t-57-23L108-636q-11-11-11.5-27.5T108-692q11-11 28-11t28 11l212 212 103-103q23-23 57-23t57 23l207 207v-64q0-17 11.5-28.5T840-480q17 0 28.5 11.5T880-440v160q0 17-11.5 28.5T840-240H680q-17 0-28.5-11.5T640-280q0-17 11.5-28.5T680-320h64Z" />
    </svg>`,
    styles: ['icon-trending-down { display: contents; }'],
    encapsulation: ViewEncapsulation.None,
})
export class IconTrendingDown {
    @Input() width?: string;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
